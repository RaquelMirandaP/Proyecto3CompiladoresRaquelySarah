var parserGeneratedVisitor = require('generated/miniPythonParserVisitor');
var globales = require('../classes/almacenVarGlobales');
var metodo = require('../classes/metodoContainer');
var almacen = require('../classes/almacenMetodo');
var pila = require('../classes/stack');

function VisitorInterprete (){
    this.listaVisitor = [];

    parserGeneratedVisitor.miniPythonParserVisitor.call(this);
    return this;
}
VisitorInterprete.prototype = Object.create(parserGeneratedVisitor.miniPythonParserVisitor.prototype);
VisitorInterprete.prototype.constructor = VisitorInterprete;

var almacenGlobales = new globales();
var almacenMetodos = new almacen();
var stack = new pila();
var local = false;
//var localCallExpression = false;
//var MethodExpressionCurrent = null;
var metodoActual = null;
//en cada def creo una instancia del metodo nuevo, y la guardo en metodoactual para poder usarla en los demas visit

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
    VisitorInterprete.prototype.visit(ctx.assignStatement());
    return null;
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
    //this.local = true;
    met = new metodo();
    met.token = ctx.ID().getSymbol();
    //console.log("TOKEN", met.token);
    VisitorInterprete.prototype.visit(ctx.argList());
    //VisitorInterprete.prototype.visit(ctx.sequence());
    met.puntero = ctx.sequence();
    //console.log("PUNTERO", met.puntero);
    this.metodoActual = met;
    //console.log("METODO ACTUAL", this.metodoActual);
    almacenMetodos.almacen.push(this.metodoActual);
    //almacenGlobales.imprimir();
    almacenMetodos.imprimir();
    //this.local = false;
    this.metodoActual = null;
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_AST.
VisitorInterprete.prototype.visitArgList_AST = function(ctx) {
    cont = ctx.ID().length;
    //console.log("Voy a insertar parámetros");
    for(var i = 0; i < cont; i++){
        metodoActual.insertarParametros(ctx.ID(i).getSymbol());
    }
    return null;

};

// Visit a parse tree produced by miniPythonParser#argList_Epsylon_AST.
VisitorInterprete.prototype.visitArgList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#ifStatement_AST.
VisitorInterprete.prototype.visitIfStatement_AST = function(ctx) {
   
    let expression = VisitorInterprete.prototype.visit(ctx.expression());

    let validate = VisitorInterprete.prototype.validateExp(expression[0],expression[1],expression[2]);
    if(validate.length > 3 || validate === null){
        //console.log("Expresion inválida ");
    }
    else{
        if(validate){
            VisitorInterprete.prototype.visit(ctx.sequence(0));
            VisitorInterprete.prototype.visit(ctx.sequence(1));
        }
    }
    return null;
};


// Visit a parse tree produced by miniPythonParser#whileStatement_AST.
VisitorInterprete.prototype.visitWhileStatement_AST = function(ctx) {
   
    let condition = VisitorInterprete.prototype.visit(ctx.expression());
    let validate = VisitorInterprete.prototype.validateExp(condition[0],condition[1],condition[2]);
    if(validate.length > 3){
        //console.log("Expresión del while inválida")
    }
    //Esto es  un while
    while(validate){
        validate = VisitorInterprete.prototype.validateExp(condition[0],condition[1],condition[2]);
        VisitorInterprete.prototype.visit(ctx.sequence());
    }

   
    return null;
};
VisitorInterprete.prototype.validateExp = function (firstPart, oper, secondPart) {
    if(typeof firstPart === 'object' || typeof secondPart === 'object'){
        return null;
    }
    if(typeof firstPart === 'string' && oper !== '=='){
        //First part busca en la tabla, si lo encuentra toma el valor, y sigue, si no
        //retorna null
    }
  switch(oper){
      case '>':
          if(firstPart > secondPart){
              return true;
          }
          else{
              return false;
          }
      case '<':
          if(firstPart < secondPart){
              return true;
          }
          else{
              return false;
          }
      case '<=':
          if(firstPart <= secondPart){
              return true;
          }
          else{
              return false;
          }
      case '>=':
          if(firstPart >= secondPart){
              return true;
          }
          else{
              return false;
          }
      case '==':
          if(firstPart === secondPart){
              return true;
          }
          else{
              return false;
          }
  }

};

// Visit a parse tree produced by miniPythonParser#forStatement_AST.
VisitorInterprete.prototype.visitForStatement_AST = function(ctx) {
    //VisitorInterprete.prototype.visit(ctx.expression());
    VisitorInterprete.prototype.visit(ctx.expressionList());
    VisitorInterprete.prototype.visit(ctx.sequence());
  
   if(local){
        
   }
    
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
VisitorInterprete.prototype.visitAssignStatement_AST = function(ctx) {                         //HERE
    var asignacion = VisitorInterprete.prototype.visit(ctx.expression());          
    var symbol = ctx.ID().getSymbol(); 
    //console.log(symbol.text);
    //console.log(symbol);
    if(asignacion !== null){
        if (local === false){
            //ver si debo actualizarla
            var variable = almacenGlobales.buscar(symbol.text);
            if(variable !== null){
                variable.type =  typeof(asignacion);
                variable.valor = asignacion;
            }else{
                almacenGlobales.insertar(symbol, typeof(asignacion), asignacion);
                //console.log(" RAQUEL inserté en almacen de globales, simbolo " + symbol.text+ " tipo "
                //+ typeof(asignacion) + " valor "+asignacion);
            }
        }
        if(local === true){
            //busqueda local, si existe actualice, sino, busque global
            variable = metodoActual.buscarVar(symbol.text);
            if(variable !== null){
                variable.type =  typeof(asignacion);
                variable.valor = asignacion;
            }else{
                //busqueda global //existe global, actualice //si no existe, inserte local
                variable = almacenGlobales.buscar(symbol.text);
                if(variable !== null){
                    variable.type =  typeof(asignacion);
                    variable.valor = asignacion;
                }else{
                    metodoActual.insertarVar(symbol, typeof(asignacion), asignacion);
                    //console.log("statement RAQUEL inserté en" + metodoActual.text + " simbolo " + symbol.text + " tipo "
                   // + typeof(asignacion) + " valor "+asignacion);
                }
                
            }
            
        }
    }
       

    return null;
};

//metodo para asignarle valor y tipo a los parametros de un metodo
VisitorInterprete.prototype.asignarValorAParametros = function(ctx){
    var lista = VisitorInterprete.prototype.visit(ctx.expressionList());
        for(var i = 0; i < this.metodoActual.variables.length; i++){
            for(var j = 0; j < lista.length; j++){
                this.metodoActual.variables[i].type = typeof(lista[j]);
                this.metodoActual.variables[j].valor = lista[j];
                //console.log("asigné valor");
        }
    }
};

// Visit a parse tree produced by miniPythonParser#functionCallStatement_AST.
VisitorInterprete.prototype.visitFunctionCallStatement_AST = function(ctx) {                        //esto sirve???
    //console.log(" LLAMADAS A METODOS RAQUEL ESTUVO AQUI ")
    var nombreMetodo = ctx.ID().getSymbol();
    var metodo = almacenMetodos.buscar(nombreMetodo.text);
    if(metodo!==null){
        this.local = true;
        this.metodoActual = metodo;
        stack.insertar(this.metodoActual);
        VisitorInterprete.prototype.asignarValorAParametros(ctx);
        VisitorInterprete.prototype.visit(metodo.puntero);
        //no se si hace falta algo aqui, luego de que se ejecuta
        stack.eliminar(this);
        if(stack.length>0){
            this.metodoActual = stack[length-1];
        }else{
            this.local=false;
        }
        
        
    }                                                         
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
    let exp = VisitorInterprete.prototype.visit(ctx.additionExpression());
    //console.log("Expresión cuarta devolución ", exp);
    secondExp = VisitorInterprete.prototype.visit(ctx.comparison());
    //console.log("Second expression en expression  ", secondExp);
    if(secondExp.length !== 0) {
        secondExp.unshift(exp);
        //console.log("Expression del whilee ", secondExp);
        return secondExp;
    }
    //console.log("Expresion final", exp);
    return exp;
   
};


// Visit a parse tree produced by miniPythonParser#comparision_AST.
VisitorInterprete.prototype.visitComparision_AST = function(ctx) {
    let lista = [];
    for(var i = 0; i < ctx.additionExpression().length; i++){
        let operador = VisitorInterprete.prototype.visit(ctx.logicOperator(i));
        lista.push(operador);
        var exp2 = VisitorInterprete.prototype.visit(ctx.additionExpression(i)); //En esta parte también hay dudas
        lista.push(exp2);
    }
    //console.log("Adentro del operator ", lista);
    return lista;
};


// Visit a parse tree produced by miniPythonParser#comparison_Epsylon_AST.
VisitorInterprete.prototype.visitComparison_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#additionExpression_AST.
VisitorInterprete.prototype.visitAdditionExpression_AST = function(ctx) {
    let exp = VisitorInterprete.prototype.visit(ctx.multiplicationExpression());
    if(exp != null){
        //console.log("visitAdditionExpression_AST el número en la tercera llamada"+ exp.text);
    }
    let expressionList = VisitorInterprete.prototype.visit(ctx.additionFactor());
    //console.log("En addition expression ","De mul exp", exp, "de addition factor", expressionList);
    while (expressionList.length !== 0){
        let i = 0;
        exp = VisitorInterprete.prototype.operarNumeros(exp,expressionList[i],expressionList[i+1]);
        expressionList.splice(0,1);
        expressionList.splice(0,1);
    }
    //console.log("Expression tercera devolución ", exp);
    return exp;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_multExpression_AST.
VisitorInterprete.prototype.visitAdditionFactor_multExpression_AST = function(ctx) {
    let expression;
    let operator;
    let listaAddition = [];
    for(var i = 0; i < ctx.multiplicationExpression().length; i++){
        operator = VisitorInterprete.prototype.visit(ctx.additionOperator(i));
        expression = VisitorInterprete.prototype.visit(ctx.multiplicationExpression(i));
        listaAddition.push(operator);
        listaAddition.push(expression);
    }
    //console.log("Adition factor ", listaAddition);
    return listaAddition;
};


// Visit a parse tree produced by miniPythonParser#additionFactor_Epsylon_AST.
VisitorInterprete.prototype.visitAdditionFactor_Epsylon_AST = function(ctx) {

    return null;
};

// Visit a parse tree produced by miniPythonParser#multiplicationExpression_AST.
VisitorInterprete.prototype.visitMultiplicationExpression_AST = function(ctx) {
    let exp =VisitorInterprete.prototype.visit(ctx.elementExpression());
    if(exp != null){
        //console.log("visitMultiplicationExpression_AST el número en la segunda llamada"+ exp.text);
    }
    let expressionList = VisitorInterprete.prototype.visit(ctx.multiplicationFactor());
    //console.log("Exp list en mult exp",expressionList);
    while (expressionList.length !== 0){
        let i = 0;
        //console.log("Va a operar", exp,", ",expressionList[i],",",expressionList[i+1]);
        exp = VisitorInterprete.prototype.operarNumeros(exp,expressionList[i],expressionList[i+1]);
        //console.log("Se supone que operó ", exp);
        expressionList.splice(0,1);
        expressionList.splice(0,1);
    }
    //console.log("Expression segunda devolución ", exp);
    //expressionList.unshift(exp);
    return  exp;
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_ElementExpression_AST.
VisitorInterprete.prototype.visitMultiplicationFactor_ElementExpression_AST = function(ctx) {
    let expression;
    let operator;
    let listaMult = [];
    //console.log("Context mult factor", ctx);
    for(var i = 0; i < ctx.elementExpression().length; i++){
        expression = VisitorInterprete.prototype.visit(ctx.elementExpression(i));
        operator = VisitorInterprete.prototype.visit(ctx.multOperator(i));
        listaMult.push(operator);
        listaMult.push(expression);
    }
    //console.log("List multiplication en mult factor",listaMult);
    return listaMult;
};
VisitorInterprete.prototype.operarNumeros = function (par1, oper, par2){
    if(typeof par1 === 'number' && typeof par2 === 'number'){
        //console.log("No entré");
        switch (oper){
            case "+":
                return par1 + par2;
            case "-":
                return par1 - par2;
            case "*":
                return par1 * par2;
            case "/":
                let result = par1 / par2;
                return result;
        }
    }
    if(typeof par1 === 'string' && typeof par2 === 'string') {
        switch (oper) {
            case "+":
                let res1 = par1.substring(0, par1.length - 1);
                let res2 = par2.substring(1);
                return res1.concat(res2);
            case "-":
                return null;
            case "*":
                return null;
            case "/":
                return null;
        }
    }
    if(typeof par1 === 'object' && typeof par2 === 'object') {
            switch (oper) {
                case "+":
                    //console.log("LISTAS PEGADAS", par1.concat(par2));
                    return par1.concat(par2);
                case "-":
                    return null;
                case "*":
                    return null;
                case "/":
                    return null;
            }
        }
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_Epsylon_AST.
VisitorInterprete.prototype.visitMultiplicationFactor_Epsylon_AST = function(ctx) {

    return null;
};


// Visit a parse tree produced by miniPythonParser#elementExpression_AST.
VisitorInterprete.prototype.visitElementExpression_AST = function(ctx) {
    let exp = VisitorInterprete.prototype.visit(ctx.primitiveExpression());
    if(exp != null){
        //console.log("visitElementExpression_AST el número"+ exp.text);
    }
    //console.log("Expression primera devolución ", exp);
    VisitorInterprete.prototype.visit(ctx.elementAccess());
    return exp;
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
VisitorInterprete.prototype.visitFunctionCallExpression_AST = function(ctx) {                           //HERE
    //console.log(" ASIGNACIONES COMO METODOS RAQUEL ESTUVO AQUI ");
    nombreMetodo = ctx.ID().getSymbol(); 
    var metodo = almacenMetodos.buscar(nombreMetodo.text);
    if(metodo!==null){
        this.local = true;
        this.metodoActual=metodo;
        stack.insertar(this.metodoActual);
        VisitorInterprete.prototype.asignarValorAParametros(ctx);
        VisitorInterprete.prototype.visit(metodo.puntero);
        //ocupo que me retorne el valor que da el sequence para asignarlo en la variable o operarlo x= 4+funct()
        //yo retorno ese valor.
        stack.eliminar(this);
        if(stack.length>0){
            this.metodoActual = stack[length-1];
        }else{
            this.local=false;
        }
    }                                                      
    
    
    return null;
};


// Visit a parse tree produced by miniPythonParser#expressionList_AST.
VisitorInterprete.prototype.visitExpressionList_AST = function(ctx) {
    let exp = VisitorInterprete.prototype.visit(ctx.expression());
    //var params = VisitorInterprete.prototype.visit(ctx.moreExpressions());
    let moreExpressions = VisitorInterprete.prototype.visit(ctx.moreExpressions());
    //console.log("more params ", moreExpressions);
    moreExpressions.unshift(exp);
    //console.log("EXPRESION LIST ", moreExpressions);
    //return params;
    return moreExpressions;
};


// Visit a parse tree produced by miniPythonParser#expressionList_Epsylon_AST.
VisitorInterprete.prototype.visitExpressionList_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Expression_AST.
VisitorInterprete.prototype.visitMoreExpressions_Expression_AST = function(ctx) {
    let moreExp = [];
    let expression;
    for(i = 0; i < ctx.expression().length; i++){
        expression = VisitorInterprete.prototype.visit(ctx.expression(i));
        moreExp.push(expression);
    }
    //console.log("More expressions ", moreExp);
    return moreExp;
};


// Visit a parse tree produced by miniPythonParser#moreExpressions_Epsylon_AST.
VisitorInterprete.prototype.visitMoreExpressions_Epsylon_AST = function(ctx) {
    return null;
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Integer_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_Integer_AST = function(ctx) {
    return parseInt(ctx.INTEGER().getText(),10);
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_String_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_String_AST = function(ctx) {
    return ctx.STRING().getText();
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_ID_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_ID_AST = function(ctx) {
    return ctx.ID().getText();                                                                                
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_Expression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_Expression_AST = function(ctx) {
    return VisitorInterprete.prototype.visit(ctx.expression());
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_listExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_listExpression_AST = function(ctx) {
    let primitiveList = VisitorInterprete.prototype.visit(ctx.listExpression());
    //console.log("List expression primitive", primitiveList);
    return primitiveList;
};

VisitorInterprete.prototype.visitPrimitiveExpression_len_Expression_AST = function(ctx) {
    let dataForLen = VisitorInterprete.prototype.visit(ctx.expression());
    let len;
    if(typeof dataForLen === 'object' || typeof dataForLen === 'string'){
        len = dataForLen.length;
    }
    else {
        return null;
    }

    return len;
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_functionCallExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_functionCallExpression_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.functionCallExpression());
    return null;
};


// Visit a parse tree produced by miniPythonParser#listExpression_AST.
VisitorInterprete.prototype.visitListExpression_AST = function(ctx) {
    let listExp = VisitorInterprete.prototype.visit(ctx.expressionList());
    //console.log("List expression ", listExp);
    return listExp;
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