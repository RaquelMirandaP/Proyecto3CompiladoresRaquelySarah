// Generated from C:/Users/Sarah/Documents/Proyecto3CompiladoresRaquelySarah/MiniPython\miniPythonParser.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by miniPythonParser.

function miniPythonParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

miniPythonParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
miniPythonParserVisitor.prototype.constructor = miniPythonParserVisitor;

// Visit a parse tree produced by miniPythonParser#Program_AST.
miniPythonParserVisitor.prototype.visitProgram_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_DefStatement_AST.
miniPythonParserVisitor.prototype.visitStatement_DefStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_IfStatement_AST.
miniPythonParserVisitor.prototype.visitStatement_IfStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_returnStatement_AST.
miniPythonParserVisitor.prototype.visitStatement_returnStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_printStatement_AST.
miniPythonParserVisitor.prototype.visitStatement_printStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_whileStament_AST.
miniPythonParserVisitor.prototype.visitStatement_whileStament_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_forStatement_AST.
miniPythonParserVisitor.prototype.visitStatement_forStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_asignStatemen_AST.
miniPythonParserVisitor.prototype.visitStatement_asignStatemen_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_functionCallStatemt_AST.
miniPythonParserVisitor.prototype.visitStatement_functionCallStatemt_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#defStatement_AST.
miniPythonParserVisitor.prototype.visitDefStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#argList_AST.
miniPythonParserVisitor.prototype.visitArgList_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#argList_Epsylon_AST.
miniPythonParserVisitor.prototype.visitArgList_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#ifStatement_AST.
miniPythonParserVisitor.prototype.visitIfStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#whileStatement_AST.
miniPythonParserVisitor.prototype.visitWhileStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#forStatement_AST.
miniPythonParserVisitor.prototype.visitForStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#returnStatement_AST.
miniPythonParserVisitor.prototype.visitReturnStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#printStatement_AST.
miniPythonParserVisitor.prototype.visitPrintStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#assignStatement_AST.
miniPythonParserVisitor.prototype.visitAssignStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#functionCallStatement_AST.
miniPythonParserVisitor.prototype.visitFunctionCallStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#fceEnding.
miniPythonParserVisitor.prototype.visitFceEnding = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#expressionStatement_AST.
miniPythonParserVisitor.prototype.visitExpressionStatement_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#sequence_AST.
miniPythonParserVisitor.prototype.visitSequence_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#moreStatements_AST.
miniPythonParserVisitor.prototype.visitMoreStatements_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#expression_AST.
miniPythonParserVisitor.prototype.visitExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#comparision_AST.
miniPythonParserVisitor.prototype.visitComparision_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#comparison_Epsylon_AST.
miniPythonParserVisitor.prototype.visitComparison_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#additionExpression_AST.
miniPythonParserVisitor.prototype.visitAdditionExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#additionFactor_multExpression_AST.
miniPythonParserVisitor.prototype.visitAdditionFactor_multExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#additionFactor_Epsylon_AST.
miniPythonParserVisitor.prototype.visitAdditionFactor_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#multiplicationExpression_AST.
miniPythonParserVisitor.prototype.visitMultiplicationExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_ElementExpression_AST.
miniPythonParserVisitor.prototype.visitMultiplicationFactor_ElementExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_Epsylon_AST.
miniPythonParserVisitor.prototype.visitMultiplicationFactor_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#elementExpression_AST.
miniPythonParserVisitor.prototype.visitElementExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#elementAccess_Expression_AST.
miniPythonParserVisitor.prototype.visitElementAccess_Expression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#elementAccess_Epsylon_AST.
miniPythonParserVisitor.prototype.visitElementAccess_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#functionCallExpression_AST.
miniPythonParserVisitor.prototype.visitFunctionCallExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#expressionList_AST.
miniPythonParserVisitor.prototype.visitExpressionList_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#expressionList_Epsylon_AST.
miniPythonParserVisitor.prototype.visitExpressionList_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Expression_AST.
miniPythonParserVisitor.prototype.visitMoreExpressions_Expression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Epsylon_AST.
miniPythonParserVisitor.prototype.visitMoreExpressions_Epsylon_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Integer_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_Integer_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_String_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_String_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_ID_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_ID_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Expression_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_Expression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_listExpression_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_listExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_len_Expression_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_len_Expression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_functionCallExpression_AST.
miniPythonParserVisitor.prototype.visitPrimitiveExpression_functionCallExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#listExpression_AST.
miniPythonParserVisitor.prototype.visitListExpression_AST = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#multOperator.
miniPythonParserVisitor.prototype.visitMultOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#additionOperator.
miniPythonParserVisitor.prototype.visitAdditionOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#logicOperator.
miniPythonParserVisitor.prototype.visitLogicOperator = function(ctx) {
  return this.visitChildren(ctx);
};



exports.miniPythonParserVisitor = miniPythonParserVisitor;