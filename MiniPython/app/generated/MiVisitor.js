var parserGeneratedVisitor = require('generated/miniPythonParserVisitor');
var MiTablaId = require('../classes/MiTabla');
var ListaErrores = require('../classes/ListaErrores');
var MiTablaMet = require('../classes/MiTablaMetodos');
function MiVisitor (){
    this.listaVisitor = [];

    parserGeneratedVisitor.miniPythonParserVisitor.call(this);
    return this;
}
MiVisitor.prototype = Object.create(parserGeneratedVisitor.miniPythonParserVisitor.prototype);
MiVisitor.prototype.constructor = MiVisitor;
var tablaIndent = new MiTablaId();
var miTableMetodos = new MiTablaMet();
var comeFromFor = false;
var comeFromAMethod = false;
//console.log("Va a reiniciar la Lista Errores");
var listaError = new ListaErrores();
MiVisitor.prototype.visitProgram_AST = function(ctx) {
    listaError.clearList();
    //console.log("Lista Errores al entrar a program",listaError.getListaErrores());
    tablaIndent.openScope();
    //console.log("In en visit program");
    //console.log(ctx);
    //console.log(ctx.statement());
    MiVisitor.prototype.visit(ctx.statement(0));
    for(var i = 1; i < ctx.statement().length; i++){
        MiVisitor.prototype.visit(ctx.statement(i));
    }
    this.listaVisitor = listaError.getListaErrores();
    tablaIndent.imprimir();
    tablaIndent.closeScope();
    return null;
};

MiVisitor.prototype.visitStatement_DefStatement_AST = function(ctx) {
    //console.log("Hola, llegué a def statement, ujuu");

    MiVisitor.prototype.visit(ctx.defStatement());

    return null;
};

MiVisitor.prototype.visitStatement_IfStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.ifStatement());
    return null;
};
MiVisitor.prototype.visitStatement_returnStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.returnStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_printStatement_AST.
MiVisitor.prototype.visitStatement_printStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.printStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_whileStament_AST.
MiVisitor.prototype.visitStatement_whileStament_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.whileStatement());
    return null
};

// Visit a parse tree produced by miniPythonParser#statement_forStatement_AST.
MiVisitor.prototype.visitStatement_forStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.forStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#statement_asignStatemen_AST.
MiVisitor.prototype.visitStatement_asignStatemen_AST = function(ctx) {
    return this.visitChildren(ctx);
};


// Visit a parse tree produced by miniPythonParser#statement_functionStatemt_AST.
MiVisitor.prototype.visitStatement_functionCallStatemt_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.functionCallStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#statement_expressionStatement_AST.
MiVisitor.prototype.visitStatement_expressionStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expressionStatement());
    return null
};


// Visit a parse tree produced by miniPythonParser#defStatement_AST.
MiVisitor.prototype.visitDefStatement_AST = function(ctx) {
    tablaIndent.openScope();
    var cont = MiVisitor.prototype.visit(ctx.argList());
    //console.log("'soy el contador de params "+cont);
    var nombreMet = ctx.ID().getSymbol();
    miTableMetodos.insertar(nombreMet, cont);
    miTableMetodos.imprimir();
    MiVisitor.prototype.visit(ctx.sequence());
    tablaIndent.imprimir();
    tablaIndent.closeScope();
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_AST.
MiVisitor.prototype.visitArgList_AST = function(ctx) {
    //console.log("Estoy en el  argList y este es mi lenght",ctx.ID().length);
    cont = ctx.ID().length;
    //console.log("Voy a insertar parámetros");
    for(var i = 0; i < cont; i++){
        //console.log("Insertando");
        tablaIndent.insertar(ctx.ID(i).getSymbol(),-1);
    }
    return cont;
};

// Visit a parse tree produced by miniPythonParser#argList_Epsylon_AST.
MiVisitor.prototype.visitArgList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#ifStatement_AST.
MiVisitor.prototype.visitIfStatement_AST = function(ctx) {
    tablaIndent.openScope();
    MiVisitor.prototype.visit(ctx.expression());
    MiVisitor.prototype.visit(ctx.sequence(0));
    //console.log("Imprimir desde el if");
    tablaIndent.imprimir();
    tablaIndent.closeScope();
    //console.log("Impresión después de close scope del if");
    tablaIndent.imprimir();
    tablaIndent.openScope();
    MiVisitor.prototype.visit(ctx.sequence(1));
    //console.log("Imprimir desde el else");
    tablaIndent.imprimir();
    tablaIndent.closeScope();
    return null;
};


// Visit a parse tree produced by miniPythonParser#whileStatement_AST.
MiVisitor.prototype.visitWhileStatement_AST = function(ctx) {
    tablaIndent.openScope();
    MiVisitor.prototype.visit(ctx.expression());
    MiVisitor.prototype.visit(ctx.sequence());
    tablaIndent.closeScope();
    return null;
};


// Visit a parse tree produced by miniPythonParser#forStatement_AST.
MiVisitor.prototype.visitForStatement_AST = function(ctx) {
    tablaIndent.openScope();
    this.comeFromFor = true;
    MiVisitor.prototype.visit(ctx.expression());
    MiVisitor.prototype.visit(ctx.expressionList());
    MiVisitor.prototype.visit(ctx.sequence());
    tablaIndent.imprimir();
    tablaIndent.closeScope();
    return null;
};

// Visit a parse tree produced by miniPythonParser#returnStatement_AST.
MiVisitor.prototype.visitReturnStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expression());
    return null;
};

// Visit a parse tree produced by miniPythonParser#printStatement_AST.
MiVisitor.prototype.visitPrintStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#assignStatement_AST.
MiVisitor.prototype.visitAssignStatement_AST = function(ctx) {
    //Aquí debería ingresar en la tabla de identificadores
    //

    tablaIndent.insertar(ctx.ID().getSymbol(),-1);

    MiVisitor.prototype.visit(ctx.expression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#functionCallStatement_AST.
MiVisitor.prototype.visitFunctionCallStatement_AST = function(ctx) {                                                        //HERE
    //console.log("Hola llegué aquí");
    comeFromAMethod = true;
    var nombreMetodo = MiVisitor.prototype.visit(ctx.primitiveExpression());
    var params = MiVisitor.prototype.visit(ctx.expressionList());
    //console.log("Soy context de expression list",ctx);
    //console.log("soy la cantidad de parms que viene desde expression y more expressions",params);
    //console.log(nombreMetodo.text);
    if(!miTableMetodos.buscar(nombreMetodo.text)){
        //error no existe un metodo con ese nombre              //pasa que no lo encontro entonces no sirve
        var errorNombreMetodo = "Error no existe un metodo llamado '" +  nombreMetodo.text + "' en "+nombreMetodo.line + ":" + nombreMetodo.column ;
        listaError.agregarError(errorNombreMetodo);
    }else{
        var numParams = miTableMetodos.buscar(nombreMetodo.text).param;   //puedo cambiar esto por nombreMetodo.param?? //de hecho esto sirve asi? nombremetodo.gettext()??
        if(numParams!==params){
            // error la cantidad de parametros del metodo no coincide
            var errorCantParams = "Error la cantidad de parametros del metodo '"+ nombreMetodo.text+ "' no coincide"  + " en "+nombreMetodo.line + ":" + nombreMetodo.column ;
            listaError.agregarError(errorCantParams);
        }
    }
    comeFromAMethod = false;
    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionStatement_AST.
MiVisitor.prototype.visitExpressionStatement_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expressionList());
    return null;
};


// Visit a parse tree produced by miniPythonParser#sequence_AST.
MiVisitor.prototype.visitSequence_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.moreStatements());
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreStatements_AST.
MiVisitor.prototype.visitMoreStatements_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.statement(0));
    for(var i = 1; i < ctx.statement().length; i++){
        MiVisitor.prototype.visit(ctx.statement(i));
    }
    return null;
};

// Visit a parse tree produced by miniPythonParser#expression_AST.
MiVisitor.prototype.visitExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.additionExpression());
    MiVisitor.prototype.visit(ctx.comparison());
    return null;
};


// Visit a parse tree produced by miniPythonParser#comparision_AST.
MiVisitor.prototype.visitComparision_AST = function(ctx) {
    for(var i = 0; i < ctx.additionExpression().length; i++){
        MiVisitor.prototype.visit(ctx.additionExpression(i)); //En esta parte también hay dudas
    }
    return null;
};


// Visit a parse tree produced by miniPythonParser#comparison_Epsylon_AST.
MiVisitor.prototype.visitComparison_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionExpression_AST.
MiVisitor.prototype.visitAdditionExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.multiplicationExpression());
    MiVisitor.prototype.visit(ctx.additionFactor());
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_multExpression_AST.
MiVisitor.prototype.visitAdditionFactor_multExpression_AST = function(ctx) {
    for(var i = 0; i < ctx.multiplicationExpression().length; i++){
        MiVisitor.prototype.visit(ctx.multiplicationExpression(i)); //En esta parte también hay dudas
    }
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_Epsylon_AST.
MiVisitor.prototype.visitAdditionFactor_Epsylon_AST = function(ctx) {

    return null;
};

// Visit a parse tree produced by miniPythonParser#multiplicationExpression_AST.
MiVisitor.prototype.visitMultiplicationExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.elementExpression());
    MiVisitor.prototype.visit(ctx.multiplicationFactor());
    return null;
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_ElementExpression_AST.
MiVisitor.prototype.visitMultiplicationFactor_ElementExpression_AST = function(ctx) {
    for(var i = 0; i < ctx.elementExpression().length; i++){
        MiVisitor.prototype.visit(ctx.elementExpression(i)); //En esta parte también hay dudas
    }
    //Hay que ver esta regla, porque el problema aquí podría ser que según la regla, element expression puede o no venir
    //Entonces quizá no haya siempre pos 0
    return null;
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_Epsylon_AST.
MiVisitor.prototype.visitMultiplicationFactor_Epsylon_AST = function(ctx) {

    return null;
};


// Visit a parse tree produced by miniPythonParser#elementExpression_AST.
MiVisitor.prototype.visitElementExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.primitiveExpression());
    MiVisitor.prototype.visit(ctx.elementAccess());
    return null;
};


// Visit a parse tree produced by miniPythonParser#elementAccess_Expression_AST.
MiVisitor.prototype.visitElementAccess_Expression_AST = function(ctx) {
    for(var i = 0; i < ctx.expression().length; i++){
        MiVisitor.prototype.visit(ctx.expression(i)); //En esta parte también hay dudas
    }
    //Hay que ver esta regla, porque el problema aquí podría ser que según la regla, element expression puede o no venir
    //Entonces quizá no haya siempre pos 0
    return null;
};

// Visit a parse tree produced by miniPythonParser#elementAccess_Epsylon_AST.
MiVisitor.prototype.visitElementAccess_Epsylon_AST = function(ctx) {
    return null;
};

// Visit a parse tree produced by miniPythonParser#functionCallExpression_AST.
MiVisitor.prototype.visitFunctionCallExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expressionList());

    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionList_AST.
MiVisitor.prototype.visitExpressionList_AST = function(ctx) {

    MiVisitor.prototype.visit(ctx.expression());
    var params = MiVisitor.prototype.visit(ctx.moreExpressions());
    return params;
};


// Visit a parse tree produced by miniPythonParser#expressionList_Epsylon_AST.
MiVisitor.prototype.visitExpressionList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Expression_AST.
MiVisitor.prototype.visitMoreExpressions_Expression_AST = function(ctx) {
    var contParametros =1;
    for(i = 0; i < ctx.expression().length; i++){
        MiVisitor.prototype.visit(ctx.expression(i)); //En esta parte también hay dudas
        //console.log("Soy una i del more expressions", i);
        contParametros ++;
    }
    //Hay que ver esta regla, porque el problema aquí podría ser que según la regla, element expression puede o no venir
    //Entonces quizá no haya siempre pos 0
    return contParametros;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Epsylon_AST.
MiVisitor.prototype.visitMoreExpressions_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Integer_AST.
MiVisitor.prototype.visitPrimitiveExpression_Integer_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_String_AST.
MiVisitor.prototype.visitPrimitiveExpression_String_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_ID_AST.
MiVisitor.prototype.visitPrimitiveExpression_ID_AST = function(ctx) {
    var metodo = ctx.ID().getSymbol();                                                                                 //HERE
    if(this.comeFromFor){
        tablaIndent.insertar(ctx.ID().getSymbol(), -1);
        this.comeFromFor = false;
    }
    else if(!comeFromAMethod){
        var existToken = tablaIndent.buscar(ctx.ID().getText());
        if(existToken == null){
                var texto = " no existe " + " en "+metodo.line +":" + metodo.column;
                var idText = "'"+ctx.ID().getText()+"'";
                var errorIdent =  idText.concat(texto);
                listaError.agregarError(errorIdent);
                //console.log();
                listaError.imprimirErrores();

        }else {
            //console.log("All good, el token ak7")
        }
    }
    //var metodo = ctx.ID().getSymbol();
    //console.log("Raquel esta probando el retorno del token para el metodo que no existe");
    //console.log(metodo.text);
    return metodo;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Expression_AST.
MiVisitor.prototype.visitPrimitiveExpression_Expression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expression());
    //console.log("En efecto, entré a expression, expression");
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_listExpression_AST.
MiVisitor.prototype.visitPrimitiveExpression_listExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.listExpression());
    return null;
};

MiVisitor.prototype.visitPrimitiveExpression_len_Expression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expression());
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_functionCallExpression_AST.
MiVisitor.prototype.visitPrimitiveExpression_functionCallExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.functionCallExpression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#listExpression_AST.
MiVisitor.prototype.visitListExpression_AST = function(ctx) {
    MiVisitor.prototype.visit(ctx.expressionList());
    return null;
};

module.exports = MiVisitor;