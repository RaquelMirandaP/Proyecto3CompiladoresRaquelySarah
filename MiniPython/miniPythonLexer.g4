lexer grammar miniPythonLexer;
tokens { INDENT, DEDENT}
@lexer::members {

  var CommonToken = require('antlr4/Token').CommonToken;
  var miniPythonParser = require('./miniPythonParser').miniPythonParser;
  var old_lexer = miniPythonLexer;
  miniPythonLexer = function() {
    old_lexer.apply(this, arguments);
    this.reset.call(this);
  }

  miniPythonLexer.prototype = Object.create(old_lexer.prototype);
  miniPythonLexer.prototype.constructor = miniPythonLexer;


  miniPythonLexer.prototype.reset = function() {
    // A queue where extra tokens are pushed on (see the NEWLINE lexer rule).
    this.token_queue = [];
    // The stack that keeps track of the indentation level.
    this.indents = [];
    // The amount of opened braces, brackets and parenthesis.
    this.opened = 0;
    antlr4.Lexer.prototype.reset.call(this);
  };

  miniPythonLexer.prototype.emitToken = function(token) {
    this._token = token;
    this.token_queue.push(token);
  };

  /**
   * Return the next token from the character stream and records this last
   * token in case it resides on the default channel. This recorded token
   * is used to determine when the lexer could possibly match a regex
   * literal.
   *
   */
  miniPythonLexer.prototype.nextToken = function() {
    // Check if the end-of-file is ahead and there are still some DEDENTS expected.
    if (this._input.LA(1) === miniPythonParser.EOF && this.indents.length) {
      // Remove any trailing EOF tokens from our buffer.
      this.token_queue = this.token_queue.filter(function(val) {
        return val.type !== miniPythonParser.EOF;
      });

      // First emit an extra line break that serves as the end of the statement.
      this.emitToken(this.commonToken(miniPythonParser.NEWLINE, "\n"));

      // Now emit as much DEDENT tokens as needed.
      while (this.indents.length) {
        this.emitToken(this.createDedent());
        this.indents.pop();
      }

      // Put the EOF back on the token stream.
      this.emitToken(this.commonToken(miniPythonParser.EOF, "<EOF>"));
    }

    var next = antlr4.Lexer.prototype.nextToken.call(this);
    return this.token_queue.length ? this.token_queue.shift() : next;
  };

  miniPythonLexer.prototype.createDedent = function() {
    return this.commonToken(miniPythonParser.DEDENT, "");
  }

  miniPythonLexer.prototype.commonToken = function(type, text) {
    var stop = this.getCharIndex() - 1;
    var start = text.length ? stop - text.length + 1 : stop;
    return new CommonToken(this._tokenFactorySourcePair, type, antlr4.Lexer.DEFAULT_TOKEN_CHANNEL, start, stop);
  }

  // Calculates the indentation of the provided spaces, taking the
  // following rules into account:
  //
  // "Tabs are replaced (from left to right) by one to eight spaces
  //  such that the total number of characters up to and including
  //  the replacement is a multiple of eight [...]"
  //
  //  -- https://docs.python.org/3.1/reference/lexical_analysis.html#indentation
  miniPythonLexer.prototype.getIndentationCount = function(whitespace) {
    var count = 0;
    for (var i = 0; i < whitespace.length; i++) {
      if (whitespace[i] === '\t') {
        count += 8 - count % 8;
      } else {
        count++;
      }
    }
    return count;
  }

  miniPythonLexer.prototype.atStartOfInput = function() {
    return this.getCharIndex() === 0;
  }
}
DEF     : 'def';
LEN     : 'len';
IF      : 'if';
FOR      : 'for';
IN      : 'in';
ELSE    : 'else';
WHILE   : 'while';
RETURN  : 'return';
//NEWLINE : ('\r'? '\n' (' ' | '\t')* );

PRINT   : 'print';
INT : 'int';
NEWLINE
    :
    ( {this.atStartOfInput()}?   SPACES
       | ( '\r'? '\n' | '\r' ) SPACES?
       ) {
         var newLine = this.text.replace(/[^\r\n]+/g, '');
         var spaces = this.text.replace(/[\r\n]+/g, '');
         var next = this._input.LA(1);
         if (this.opened > 0 || next === 13 /* '\r' */ || next === 10 /* '\n' */ || next === 35 /* '#' */) {
           // If we're inside a list or on a blank line, ignore all indents,
           // dedents and line breaks.
           this.skip();
         } else {
           this.emitToken(this.commonToken(miniPythonParser.NEWLINE, newLine));
           var indent = this.getIndentationCount(spaces);
           var previous = this.indents.length ? this.indents[this.indents.length - 1] : 0;
           if (indent === previous) {
             // skip indents of the same size as the present indent-size
             this.skip();
           } else if (indent > previous) {
             this.indents.push(indent);
             this.emitToken(this.commonToken(miniPythonParser.INDENT, spaces));
           } else {
             // Possibly emit more than 1 DEDENT token.
             while (this.indents.length && this.indents[this.indents.length - 1] > indent) {
               this.emitToken(this.createDedent());
               this.indents.pop();
             }
           }
         }
       };


IGUAL     : '=';
COMA      : ',';
COMP      : '==';
PIZQ      : '(';
PDER      : ')';
SUMA      : '+';
RESTA     : '-';
MUL       : '*';
DIV       : '/';
MAYOR     : '>';
MENOR     : '<';
DOSPUNTOS : ':';
PCABRIR   : '[';
PCCERRAR  : ']';
MENORIGUAL : '<=';
MAYORIGUAL : '>=';
GUIONBAJO : '_';


fragment LETTER : 'a'..'z' | 'A'..'Z';
fragment NUMBER : '0'..'9';
fragment SPACES
    : [ \t]+
    ;

ID : LETTER(LETTER|NUMBER|GUIONBAJO)*;
INTEGER: NUMBER NUMBER*;
STRING : '"' ('""'|~'"')* '"' ;

//elementos omitidos

COMENTARIOCORTO: '#'~[\r\n]* -> skip;
COMENTARIOMULTILINEA: '/*'.*?'*/' -> skip;

WS : SPACES -> skip ;