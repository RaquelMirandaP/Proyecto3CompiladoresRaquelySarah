parser grammar miniPythonParser;


options
{
    tokenVocab = miniPythonLexer;
}

program : NEWLINE* statement(statement)* EOF                                            #Program_AST;
statement : defStatement                                                                #statement_DefStatement_AST
            | ifStatement                                                               #statement_IfStatement_AST
            | returnStatement                                                           #statement_returnStatement_AST
            | printStatement                                                            #statement_printStatement_AST
            | whileStatement                                                            #statement_whileStament_AST
            | forStatement                                                              #statement_forStatement_AST
            | assignStatement                                                           #statement_asignStatemen_AST
            | functionCallStatement                                                     #statement_functionCallStatemt_AST
            | expressionStatement                                                       #statement_expressionStatement_AST;
defStatement : DEF ID PIZQ argList PDER DOSPUNTOS sequence                              #defStatement_AST;
argList : ID(COMA ID)*                                                                  #argList_AST
                    |                                                                   #argList_Epsylon_AST;
ifStatement : IF expression DOSPUNTOS sequence ELSE DOSPUNTOS sequence                  #ifStatement_AST;
whileStatement : WHILE expression DOSPUNTOS sequence                                    #whileStatement_AST;
forStatement : FOR ID IN expressionList DOSPUNTOS sequence                              #forStatement_AST;
returnStatement : RETURN expression NEWLINE                                             #returnStatement_AST;
printStatement : PRINT PIZQ expression PDER NEWLINE                                     #printStatement_AST;
assignStatement : ID IGUAL expression NEWLINE                                           #assignStatement_AST;
functionCallStatement : ID PIZQ expressionList PDER fceEnding                           #functionCallStatement_AST;
fceEnding                : NEWLINE
                           |
                         ;
expressionStatement : expressionList NEWLINE                                            #expressionStatement_AST;
sequence : NEWLINE INDENT moreStatements DEDENT                                         #sequence_AST;
moreStatements : statement(statement)*                                                  #moreStatements_AST;
expression : additionExpression comparison                                              #expression_AST;
comparison : ((logicOperator)additionExpression)*                                       #comparision_AST
              |                                                                         #comparison_Epsylon_AST;
additionExpression : multiplicationExpression additionFactor                            #additionExpression_AST;
additionFactor : ((additionOperator) multiplicationExpression)*                         #additionFactor_multExpression_AST
                  |                                                                     #additionFactor_Epsylon_AST;
multiplicationExpression : elementExpression multiplicationFactor                       #multiplicationExpression_AST;
multiplicationFactor : (multOperator elementExpression)*                                #multiplicationFactor_ElementExpression_AST
                       |                                                                #multiplicationFactor_Epsylon_AST;
elementExpression : primitiveExpression elementAccess                                   #elementExpression_AST;
elementAccess : (PCABRIR expression PCCERRAR)*                                          #elementAccess_Expression_AST
                |                                                                       #elementAccess_Epsylon_AST ;
functionCallExpression : ID PIZQ expressionList PDER                                    #functionCallExpression_AST;
expressionList : expression moreExpressions                                             #expressionList_AST
                |                                                                       #expressionList_Epsylon_AST;
moreExpressions : (COMA expression)*                                                    #moreExpressions_Expression_AST
                  |                                                                     #moreExpressions_Epsylon_AST;
primitiveExpression :  INTEGER                                                          #primitiveExpression_Integer_AST
                      | STRING                                                          #primitiveExpression_String_AST
                      | ID                                                              #primitiveExpression_ID_AST
                      | PIZQ expression PDER                                            #primitiveExpression_Expression_AST
                      | listExpression                                                  #primitiveExpression_listExpression_AST
                      | LEN PIZQ expression PDER                                        #primitiveExpression_len_Expression_AST
                      | functionCallExpression                                          #primitiveExpression_functionCallExpression_AST;
listExpression : PCABRIR expressionList PCCERRAR                                        #listExpression_AST;
multOperator:  MUL|DIV                                                                  #multOperator_AST;
additionOperator: SUMA|RESTA                                                            #additionOperator_AST;
logicOperator: MENOR|MAYOR|MENORIGUAL|MAYORIGUAL|COMP                                   #logicOperator_AST;