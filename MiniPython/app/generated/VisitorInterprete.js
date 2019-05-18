var parserGeneratedVisitor = require('generated/miniPythonParserVisitor');

function VisitorInterprete (){
    this.listaVisitor = [];

    parserGeneratedVisitor.miniPythonParserVisitor.call(this);
    return this;
}
VisitorInterprete.prototype = Object.create(parserGeneratedVisitor.miniPythonParserVisitor.prototype);
VisitorInterprete.prototype.constructor = VisitorInterprete;


VisitorInterprete.prototype.visitProgram_AST = function(ctx) {
    
 
    VisitorInterprete.prototype.visit(ctx.statement(0));
    for(var i = 1; i < ctx.statement().length; i++){
        VisitorInterprete.prototype.visit(ctx.statement(i));
    }

   
    return null;
};

VisitorInterprete.prototype.visitStatement_DefStatement_AST = function(ctx) {
    

    VisitorInterprete.prototype.visit(ctx.defStatement());

    return null;
};

VisitorInterprete.prototype.visitStatement_IfStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.ifStatement());
    return null;
};
VisitorInterprete.prototype.visitStatement_returnStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.returnStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_printStatement_AST.
VisitorInterprete.prototype.visitStatement_printStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.printStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_whileStament_AST.
VisitorInterprete.prototype.visitStatement_whileStament_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.whileStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_forStatement_AST.
VisitorInterprete.prototype.visitStatement_forStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.forStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#statement_asignStatemen_AST.
VisitorInterprete.prototype.visitStatement_asignStatemen_AST = function(ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_functionStatemt_AST.
VisitorInterprete.prototype.visitStatement_functionCallStatemt_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.functionCallStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#statement_expressionStatement_AST.
VisitorInterprete.prototype.visitStatement_expressionStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expressionStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#defStatement_AST.
VisitorInterprete.prototype.visitDefStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.argList());
    VisitorInterprete.prototype.visit(ctx.sequence());
 
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_AST.
VisitorInterprete.prototype.visitArgList_AST = function(ctx) {
   
   
    
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_Epsylon_AST.
VisitorInterprete.prototype.visitArgList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#ifStatement_AST.
VisitorInterprete.prototype.visitIfStatement_AST = function(ctx) {
   
    VisitorInterprete.prototype.visit(ctx.expression());
    VisitorInterprete.prototype.visit(ctx.sequence(0));
    VisitorInterprete.prototype.visit(ctx.sequence(1));
   
    return null;
};


// Visit a parse tree produced by miniPythonParser#whileStatement_AST.
VisitorInterprete.prototype.visitWhileStatement_AST = function(ctx) {
   
    VisitorInterprete.prototype.visit(ctx.expression());
    VisitorInterprete.prototype.visit(ctx.sequence());
   
    return null;
};


// Visit a parse tree produced by miniPythonParser#forStatement_AST.
VisitorInterprete.prototype.visitForStatement_AST = function(ctx) {
   
    VisitorInterprete.prototype.visit(ctx.expression());
    VisitorInterprete.prototype.visit(ctx.expressionList());
    VisitorInterprete.prototype.visit(ctx.sequence());
  
    return null;
};

// Visit a parse tree produced by miniPythonParser#returnStatement_AST.
VisitorInterprete.prototype.visitReturnStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expression());
    return null;
};

// Visit a parse tree produced by miniPythonParser#printStatement_AST.
VisitorInterprete.prototype.visitPrintStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#assignStatement_AST.
VisitorInterprete.prototype.visitAssignStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#functionCallStatement_AST.
VisitorInterprete.prototype.visitFunctionCallStatement_AST = function(ctx) {                                                        //HERE
    VisitorInterprete.prototype.visit(ctx.primitiveExpression());
    VisitorInterprete.prototype.visit(ctx.expressionList());
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionStatement_AST.
VisitorInterprete.prototype.visitExpressionStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expressionList());
    return null;
};


// Visit a parse tree produced by miniPythonParser#sequence_AST.
VisitorInterprete.prototype.visitSequence_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.moreStatements());
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreStatements_AST.
VisitorInterprete.prototype.visitMoreStatements_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.statement(0));
    for(var i = 1; i < ctx.statement().length; i++){
        VisitorInterprete.prototype.visit(ctx.statement(i));
    }
    return null;
};

// Visit a parse tree produced by miniPythonParser#expression_AST.
VisitorInterprete.prototype.visitExpression_AST = function(ctx) {                                                  
    VisitorInterprete.prototype.visit(ctx.additionExpression());
    VisitorInterprete.prototype.visit(ctx.comparison());
    
    return null;
   
};


// Visit a parse tree produced by miniPythonParser#comparision_AST.
VisitorInterprete.prototype.visitComparision_AST = function(ctx) {

    for(var i = 0; i < ctx.additionExpression().length; i++){
        VisitorInterprete.prototype.visit(ctx.logicOperator(i));
        VisitorInterprete.prototype.visit(ctx.additionExpression(i)); 
      
    }
 
    return null;
};


// Visit a parse tree produced by miniPythonParser#comparison_Epsylon_AST.
VisitorInterprete.prototype.visitComparison_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionExpression_AST.
VisitorInterprete.prototype.visitAdditionExpression_AST = function(ctx) {
    
    VisitorInterprete.prototype.visit(ctx.multiplicationExpression());
    VisitorInterprete.prototype.visit(ctx.additionFactor());
   
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_multExpression_AST.
VisitorInterprete.prototype.visitAdditionFactor_multExpression_AST = function(ctx) {
    
    for(var i = 0; i < ctx.multiplicationExpression().length; i++){
        VisitorInterprete.prototype.visit(ctx.additionOperator(i));
        VisitorInterprete.prototype.visit(ctx.multiplicationExpression(i));
      
    }
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_Epsylon_AST.
VisitorInterprete.prototype.visitAdditionFactor_Epsylon_AST = function(ctx) {

    return null;
};

// Visit a parse tree produced by miniPythonParser#multiplicationExpression_AST.
VisitorInterprete.prototype.visitMultiplicationExpression_AST = function(ctx) {
    
    VisitorInterprete.prototype.visit(ctx.elementExpression());
    VisitorInterprete.prototype.visit(ctx.multiplicationFactor());
    

    return  null ;

};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_ElementExpression_AST.
VisitorInterprete.prototype.visitMultiplicationFactor_ElementExpression_AST = function(ctx) {
   
    for(var i = 0; i < ctx.elementExpression().length; i++){
        VisitorInterprete.prototype.visit(ctx.elementExpression(i));
        VisitorInterprete.prototype.visit(ctx.multOperator(i));
    }
    return null;
};



// Visit a parse tree produced by miniPythonParser#multiplicationFactor_Epsylon_AST.
VisitorInterprete.prototype.visitMultiplicationFactor_Epsylon_AST = function(ctx) {

    return null;
};


// Visit a parse tree produced by miniPythonParser#elementExpression_AST.
VisitorInterprete.prototype.visitElementExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.primitiveExpression());
   
    VisitorInterprete.prototype.visit(ctx.elementAccess());
    return null;
};


// Visit a parse tree produced by miniPythonParser#elementAccess_Expression_AST.
VisitorInterprete.prototype.visitElementAccess_Expression_AST = function(ctx) {
    for(var i = 0; i < ctx.expression().length; i++){
        VisitorInterprete.prototype.visit(ctx.expression(i));
    }
    
    return null;
};

// Visit a parse tree produced by miniPythonParser#elementAccess_Epsylon_AST.
VisitorInterprete.prototype.visitElementAccess_Epsylon_AST = function(ctx) {
    return null;
};

// Visit a parse tree produced by miniPythonParser#functionCallExpression_AST.
VisitorInterprete.prototype.visitFunctionCallExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expressionList());

    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionList_AST.
VisitorInterprete.prototype.visitExpressionList_AST = function(ctx) {

    VisitorInterprete.prototype.visit(ctx.expression());

    VisitorInterprete.prototype.visit(ctx.moreExpressions());
   
   
    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionList_Epsylon_AST.
VisitorInterprete.prototype.visitExpressionList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Expression_AST.
VisitorInterprete.prototype.visitMoreExpressions_Expression_AST = function(ctx) {

    for(i = 0; i < ctx.expression().length; i++){
        VisitorInterprete.prototype.visit(ctx.expression(i));
       
    }
   
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Epsylon_AST.
VisitorInterprete.prototype.visitMoreExpressions_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Integer_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_Integer_AST = function(ctx) {
    parseInt(ctx.INTEGER().getText(),10);
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_String_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_String_AST = function(ctx) {
    ctx.STRING().getSymbol();
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_ID_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_ID_AST = function(ctx) {
    ctx.ID().getSymbol();                                                                                 //HERE
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Expression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_Expression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expression());

    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_listExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_listExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.listExpression());
    return null;
};

VisitorInterprete.prototype.visitPrimitiveExpression_len_Expression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expression());
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_functionCallExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_functionCallExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.functionCallExpression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#listExpression_AST.
VisitorInterprete.prototype.visitListExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expressionList());
    return null;
};

VisitorInterprete.prototype.visitMultOperator = function(ctx) {
 
    return ctx.getText();
};

// Visit a parse tree produced by miniPythonParser#additionOperator.
VisitorInterprete.prototype.visitAdditionOperator = function(ctx) {
    return ctx.getText();
};


// Visit a parse tree produced by miniPythonParser#logicOperator.
VisitorInterprete.prototype.visitLogicOperator = function(ctx) {
    
    return ctx.getText();
};

module.exports = VisitorInterprete;