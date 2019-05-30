var parserGeneratedVisitor = require('generated/miniPythonParserVisitor');
var globales = require('../classes/almacenVarGlobales');
var metodo = require('../classes/metodoContainer');
var almacen = require('../classes/almacenMetodo');
var pila = require('../classes/stack');
var ListaErrores = require('../classes/ListaErrores');
var ListaPrint = require('../classes/ListaPrint');
function VisitorInterprete (){
    //this.listaVisitor = [];

    parserGeneratedVisitor.miniPythonParserVisitor.call(this);
    return this;
}
VisitorInterprete.prototype = Object.create(parserGeneratedVisitor.miniPythonParserVisitor.prototype);
VisitorInterprete.prototype.constructor = VisitorInterprete;

var almacenGlobales = new globales();
var almacenMetodos = new almacen();
var stack = new pila();
var local = false;
var stat = false;
var llamada = false;
let printSt = false;
let comeFromString = false;
var listaPrint = new ListaPrint();
//var localCallExpression = false;
//var MethodExpressionCurrent = null;
var metodoActual = null;
//var operadoEnPrint = false;
var listaError = new ListaErrores();

VisitorInterprete.prototype.visitProgram_AST = function(ctx) {
    stack.clearList();
    almacenMetodos.clearList();
    almacenGlobales.clearList();
    this.metodoActual = null;
    local = false;
    llamada = false;
    stat = false;
    listaError.clearList();
    listaPrint.clearList();
    VisitorInterprete.prototype.visit(ctx.statement(0));
    for(var i = 1; i < ctx.statement().length; i++){
        VisitorInterprete.prototype.visit(ctx.statement(i));
    }
    console.log("IMPRIMIR GLOBALES");
    almacenGlobales.imprimir();
    console.log("IMPRIMIR LOCALES");
    almacenMetodos.imprimir();
   
    return null;
};


VisitorInterprete.prototype.visitStatement_DefStatement_AST = function(ctx) {
    

    VisitorInterprete.prototype.visit(ctx.defStatement());

    return null;
};

VisitorInterprete.prototype.visitStatement_IfStatement_AST = function(ctx) {
    return VisitorInterprete.prototype.visit(ctx.ifStatement());
};
VisitorInterprete.prototype.visitStatement_returnStatement_AST = function(ctx) {
    let returnSt = VisitorInterprete.prototype.visit(ctx.returnStatement());
    return returnSt;
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
    this.local = true;
    met = new metodo();
    met.token = ctx.ID().getSymbol();
    this.metodoActual = met;
    VisitorInterprete.prototype.visit(ctx.argList());
    this.metodoActual.puntero = ctx.sequence();
    almacenMetodos.almacen.push(this.metodoActual);
    almacenMetodos.imprimir();
    this.local = false;
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_AST.
VisitorInterprete.prototype.visitArgList_AST = function(ctx) {
    cont = ctx.ID().length;
    for(var i = 0; i < cont; i++){
        this.metodoActual.insertarParametros(ctx.ID(i).getSymbol());
        
    }
    return null;
};

// Visit a parse tree produced by miniPythonParser#argList_Epsylon_AST.
VisitorInterprete.prototype.visitArgList_Epsylon_AST = function(ctx) {
    return null;
};
// Visit a parse tree produced by miniPythonParser#ifStatement_AST.
VisitorInterprete.prototype.visitIfStatement_AST = function(ctx) {
    stat = true;
    let expression = VisitorInterprete.prototype.visit(ctx.expression());
    let validate = VisitorInterprete.prototype.validateExp(expression[0],expression[1],expression[2]);
    if(expression.length > 3 || expression === null){
        var error = "Condicional if inválido ";
        document.getElementById("messages").value += (error);
        throw ( console.error(error));
    }
    else{
        if(validate){
            VisitorInterprete.prototype.visit(ctx.sequence(0));
        }else{
            VisitorInterprete.prototype.visit(ctx.sequence(1));
        }
    }
    return expression;
};


// Visit a parse tree produced by miniPythonParser#whileStatement_AST.
VisitorInterprete.prototype.visitWhileStatement_AST = function(ctx) {
    stat = true;
    let condition = VisitorInterprete.prototype.visit(ctx.expression());
    let validate = VisitorInterprete.prototype.validateExp(condition[0],condition[1],condition[2]);
    if(condition.length > 3){
        var error = "Condicional while inválido ";
        document.getElementById("messages").value += (error);
        throw ( console.error(error));
    }
    //Esto es  un while
    let iter = 0;
    if(typeof condition !== 'object'){

        while(true){
            if(iter === 5000){
                var error = "stack overflow";
                document.getElementById("messages").value += (error);
                throw ( console.error(error));
            }
            VisitorInterprete.prototype.visit(ctx.sequence());
            iter++;
        }
    }else{
        while(validate){
            if(iter === 5000){
                var error = "stack overflow";
                document.getElementById("messages").value += (error);
                throw ( console.error(error));
            }
            iter ++;
            VisitorInterprete.prototype.visit(ctx.sequence());
            validate = VisitorInterprete.prototype.validateExp(condition[0],condition[1],condition[2]);
        }
    }
    return null;
};
VisitorInterprete.prototype.validateExp = function (firstPart, oper, secondPart) {
    let auxFirstPart = firstPart;
    let auxSecondPart = secondPart;

    if(typeof firstPart === 'object' || typeof secondPart === 'object'){
        return null;
    }
    //console.log("validateExp", firstPart);
    if(comeFromString && oper === '==' && typeof firstPart === 'string' && typeof secondPart === 'string'){
        if(firstPart === secondPart){
            comeFromString = false;
            return true;
        }
        else{
            comeFromString = false;
            return false;
        }
    }
    if(typeof firstPart === 'string'){
        if(this.metodoActual == null){
            firstPart = almacenGlobales.buscarValor(auxFirstPart);
        }
        else {
            firstPart = this.metodoActual.buscarValor(auxFirstPart);
            //console.log("FIRST PART", firstPart);
            if(firstPart == null){
                firstPart = almacenGlobales.buscarValor(auxFirstPart);
                if(firstPart == null){
                    //console.log("No existe esa variable");
                    return null;
                }
            }
        }
        //console.log("first part value", firstPart);
    }
    if(typeof secondPart === 'string'){
        if(this.metodoActual == null){
            secondPart = almacenGlobales.buscarValor(auxSecondPart);
        }else{
            secondPart = this.metodoActual.buscarValor(auxSecondPart);
            if(secondPart == null){
                secondPart = almacenGlobales.buscarValor(auxSecondPart);
                if(secondPart == null){
                    console.log("No existe esa variable");
                    return null
                }
            }
        }
        //console.log("second part value", secondPart);
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
    stat = true;
    let variable;
    let index = 0;
    let i = ctx.ID().getSymbol();
    let list = VisitorInterprete.prototype.visit(ctx.expressionList());
    let realList = list[0];
    console.log("Lista", realList);
    let realListAux = realList;
    if (typeof realList === 'number'){
        var error = "No se puede recorrer un número con un for "+ i.line+":"+i.column;
        document.getElementById("messages").value += (error);
        throw ( console.error(error));
    }
    if(typeof realList === 'string'){
            //console.log("Buscando local", list[0]);
            if(this.metodoActual == null){
                realList = almacenGlobales.buscarValor(list[0]);
                if(realList === null){
                    realList = realListAux;
                }
            }
            else{
                realList = this.metodoActual.buscarValor(list[0]);
                if(realList === null){
                    //console.log("Buscando global", list[0]);
                    realList = almacenGlobales.buscarValor(list[0]);
                }
                if(realList === null) {
                    realList = realListAux;
                }
            }
    }
    console.log("REAL LIST", realList);

    while(index < realList.length){
        console.log("REal List impression",realList[index]);
        if(!this.local){
            almacenGlobales.insertar(i,typeof realList[index],realList[index]);
        }
        else{
            this.metodoActual.insertarVar(i, typeof(realList[index]), realList[index]);
        }
        stat = false;
        VisitorInterprete.prototype.visit(ctx.sequence());
        index++;
    }
   if(this.local){
        
   }
    stat = false;
    return null;
};

// Visit a parse tree produced by miniPythonParser#returnStatement_AST.
VisitorInterprete.prototype.visitReturnStatement_AST = function(ctx) {
    return VisitorInterprete.prototype.visit(ctx.expression());
};

// Visit a parse tree produced by miniPythonParser#printStatement_AST.
VisitorInterprete.prototype.visitPrintStatement_AST = function(ctx) {
    printSt = true;
    let printExpression = VisitorInterprete.prototype.visit(ctx.expression());
    console.log("PRINT EXPRESSION", printExpression);
    listaPrint.agregarMensaje(printExpression);
    console.log("La expression en print",printExpression); //Hay que agregarlo a una lista para que imprima en msg
    printSt =false;
    //operadoEnPrint = false;
    return null;
};


// Visit a parse tree produced by miniPythonParser#assignStatement_AST.
VisitorInterprete.prototype.visitAssignStatement_AST = function(ctx) {                         //HERE
    var asignacion = VisitorInterprete.prototype.visit(ctx.expression());          
    var symbol = ctx.ID().getSymbol();
    if(asignacion !== null){
        if (!this.local){

                if(almacenGlobales.insertar(symbol, typeof(asignacion), asignacion)) {
                    console.log("inserté o actualicé la variable global ", symbol.text );
                }
        }
        if(this.local){
                //console.log("ASIGNACION");
                //console.log(symbol.text);
                //console.log(this.metodoActual);
                 if(!this.metodoActual.buscarAsignar(symbol.text)) { 
                     if(!almacenGlobales.buscarAsignar(symbol.text)){
                         this.metodoActual.insertarVar(symbol, typeof(asignacion), asignacion);
                         //console.log("inserté la variable local ", symbol.text );
                     }else{
                         almacenGlobales.insertar(symbol, typeof(asignacion), asignacion);
                         //console.log("actualicé la variable global ", symbol.text );
                     }
                 }else{
                     this.metodoActual.insertarVar(symbol, typeof(asignacion), asignacion)
                     //console.log("actualicé la variable local ", symbol.text );
                 }
            }
            
        }
        else{
        var error = "Error en la asignación de la variable "+symbol.text+" en "+ symbol.line+":"+symbol.column;
        document.getElementById("messages").value += (error);
        throw ( console.error(error));
    }
    almacenMetodos.imprimir();
    return null;
};
//metodo para asignarle valor y tipo a los parametros de un metodo
VisitorInterprete.prototype.asignarValorAParametros = function(ctx){
    llamada = true;
    var lista = VisitorInterprete.prototype.visit(ctx.expressionList());
    if(this.metodoActual.variables.length>0 && lista !== null){
        for(var i = 0; i < this.metodoActual.variables.length; i++){
            let temp = this.metodoActual.buscarVar(this.metodoActual.variables[i].token.text);
            //console.log(this.metodoActual.variables[i]);
            for(var j = 0; j < lista.length; j++){
                temp.type = typeof(lista[j]);
                temp.valor =  lista[j];
            }

        }
    }
    console.log("estoy validando que se actualice el valor de los parametros");
    console.log(this.metodoActual.variables);
    llamada = false;
};
// Visit a parse tree produced by miniPythonParser#functionCallStatement_AST.
VisitorInterprete.prototype.visitFunctionCallStatement_AST = function(ctx) {                        //esto sirve???
    var nombreMetodo = ctx.ID().getSymbol();
    var metodo = almacenMetodos.buscar(nombreMetodo.text);
    if(metodo!==null){
        this.local = true;
        this.metodoActual = metodo;
        console.log(this.metodoActual)
        stack.stack.push(this.metodoActual);
        VisitorInterprete.prototype.asignarValorAParametros(ctx);
        VisitorInterprete.prototype.visit(this.metodoActual.puntero);
        stack.imprimir();
        if(stack.stack.length>0){
            var tam = stack.stack.length
            this.metodoActual = stack.stack[tam-2];
        }else{
            this.local=false;
        }
        stack.stack.pop();
        stack.imprimir();
        
    }
    console.log("IMPRIMIR GLOBALES");
    almacenGlobales.imprimir();
    console.log("IMPRIMIR LOCALES");
    almacenMetodos.imprimir();
    return null;
};



// Visit a parse tree produced by miniPythonParser#expressionStatement_AST.
VisitorInterprete.prototype.visitExpressionStatement_AST = function(ctx) {
    VisitorInterprete.prototype.visit(ctx.expressionList());
    return null;
};


// Visit a parse tree produced by miniPythonParser#sequence_AST.
VisitorInterprete.prototype.visitSequence_AST = function(ctx) {
    let seeIfReturn = VisitorInterprete.prototype.visit(ctx.moreStatements());
    //console.log("ESTOY DESDE ALGÚN SEQUENCE, QUIZÁ RETORNE", seeIfReturn);
    if(seeIfReturn != null){
        return seeIfReturn;
    }
    return null;
};


// Visit a parse tree produced by miniPythonParser#moreStatements_AST.
VisitorInterprete.prototype.visitMoreStatements_AST = function(ctx) {
    let seeIfReturn = VisitorInterprete.prototype.visit(ctx.statement(0));
    if(seeIfReturn != null){
        return seeIfReturn;
    }
    for(var i = 1; i < ctx.statement().length; i++){
        seeIfReturn = VisitorInterprete.prototype.visit(ctx.statement(i));
        if(seeIfReturn != null){
            return seeIfReturn;
        }
    }
    return null;
};

// Visit a parse tree produced by miniPythonParser#expression_AST.
VisitorInterprete.prototype.visitExpression_AST = function(ctx) {
    let exp = VisitorInterprete.prototype.visit(ctx.additionExpression());
    secondExp = VisitorInterprete.prototype.visit(ctx.comparison());
    if(secondExp.length !== 0) {
        secondExp.unshift(exp);
        return secondExp;
    }
    console.log("I AM A EXPRESSION", exp);
    if(/*exp === null ||*/ exp === undefined){
        listaError.agregarError('Nulos no permitidos');
        //this.listaVisitor = listaError.getListaErrores();
        //console.log("Lista error",this.listaVisitor);
        document.getElementById("messages").value += ("Nulos no permitidos");
        throw ( console.error('Nulos no permitidos'));
    }
    return exp;
};
// Visit a parse tree produced by miniPythonParser#comparision_AST.
VisitorInterprete.prototype.visitComparision_AST = function(ctx) {
    let lista = [];
    for(var i = 0; i < ctx.additionExpression().length; i++){
        let operador = VisitorInterprete.prototype.visit(ctx.logicOperator(i));
        lista.push(operador);
        var exp2 = VisitorInterprete.prototype.visit(ctx.additionExpression(i)); 
        lista.push(exp2);
    }
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
        //return null;
    }

    let expressionList = VisitorInterprete.prototype.visit(ctx.additionFactor());
   
    while (expressionList.length !== 0){
        let i = 0;
        exp = VisitorInterprete.prototype.operarNumeros(exp,expressionList[i],expressionList[i+1]);
        /*if(printSt){
            operadoEnPrint = true;
        }*/
        if(exp === null){
            return null;
        }
        expressionList.splice(0,1);
        expressionList.splice(0,1);
    }
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
        //return null;
    }
    let expressionList = VisitorInterprete.prototype.visit(ctx.multiplicationFactor());
    while (expressionList.length !== 0){
        let i = 0;
        exp = VisitorInterprete.prototype.operarNumeros(exp,expressionList[i],expressionList[i+1]);
        console.log("SOY LA EXPRESION", exp);
        if(exp === null){
            return null;
        }
        expressionList.splice(0,1);
        expressionList.splice(0,1);
    }
    return  exp;
};


// Visit a parse tree produced by miniPythonParser#multiplicationFactor_ElementExpression_AST.
VisitorInterprete.prototype.visitMultiplicationFactor_ElementExpression_AST = function(ctx) {
    let expression;
    let operator;
    let listaMult = [];
    for(var i = 0; i < ctx.elementExpression().length; i++){
        expression = VisitorInterprete.prototype.visit(ctx.elementExpression(i));
        operator = VisitorInterprete.prototype.visit(ctx.multOperator(i));
        listaMult.push(operator);
        listaMult.push(expression);
    }
    return listaMult;
};
VisitorInterprete.prototype.operarNumeros = function (par1, oper, par2){
    console.log("PAR 1",par1, "PAR 2", par2);
    if(par1 == null || par2 ==null){
        //console.log("Llegué hasta aquí porque soy muy loser");
        return null;
    }
    if(typeof par1 === 'number' && typeof par2 === 'number'){
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
                //let res1 = par1.substring(0, par1.length - 1);
                //let res2 = par2.substring(1);
                return par1.concat(par2);
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
                return par1.concat(par2);
            case "-":
                return null;
            case "*":
                return null;
            case "/":
                return null;
        }
    }
    if(printSt){
        if(oper === '+'){
                part1 = "";
                part2 = "";
                /*if(!operadoEnPrint){
                    if(typeof par1 === 'string'){
                        part1 = par1.substring(1, par1.length - 1)
                    }
                }*/
                /*if(typeof par2 === 'string'){
                    part2 = par2.substring(1, par2.length - 1);
                }*/
                if(part1 === ""){
                    part1 = par1.toString();
                }
                if(part2 === ""){
                    part2 = par2.toString();
                }
                console.log("PAR 1",part1);
                console.log("PAR 2",part2);
                console.log("CONCATENATION",part1.concat(part2));
                return part1.concat(part2);
        }
    }
    return null;
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
    //console.log("I AM THE primitiveExpression IN ELEMENT EXPRESSION ", exp);
    let elementAccess = VisitorInterprete.prototype.visit(ctx.elementAccess());
    if(typeof exp !=='number' && elementAccess !== null){
        if(typeof elementAccess !== 'number'){
            var error = "Solo puede acceder a un elemento por medio de un número";
            document.getElementById("messages").value += (error);
            throw ( console.error(error));
        }else{
            if(elementAccess < exp.length){
                exp = exp[elementAccess];
            }else{
                var error = "Indice fuera de rango";
                document.getElementById("messages").value += (error);
                throw ( console.error(error));
            }
        }

    }
    //console.log("I AM THE element access IN ELEMENT EXPRESSION ", elementAccess);
    return exp;
};


// Visit a parse tree produced by miniPythonParser#elementAccess_Expression_AST.
VisitorInterprete.prototype.visitElementAccess_Expression_AST = function(ctx) {
    let lista = [];
    let exp = null;
    for(var i = 0; i < ctx.expression().length; i++){
        exp = VisitorInterprete.prototype.visit(ctx.expression(i));
        lista.push(exp);
    }
    //console.log("SOY UNA LISTA DE ELEMENT EXPRESSION", exp);
    return exp;
};

// Visit a parse tree produced by miniPythonParser#elementAccess_Epsylon_AST.
VisitorInterprete.prototype.visitElementAccess_Epsylon_AST = function(ctx) {
    return null;
};

// Visit a parse tree produced by miniPythonParser#functionCallExpression_AST.
VisitorInterprete.prototype.visitFunctionCallExpression_AST = function(ctx) {                           //HERE
    nombreMetodo = ctx.ID().getSymbol();
    var metodo = almacenMetodos.buscar(nombreMetodo.text);
    if(metodo!==null){
        this.local = true;
        this.metodoActual=metodo;
        stack.stack.push(this.metodoActual);
        VisitorInterprete.prototype.asignarValorAParametros(ctx);
        var resultado = VisitorInterprete.prototype.visit(this.metodoActual.puntero);
        stack.imprimir();
        if(stack.stack.length>0){
            var tam = stack.stack.length;
            this.metodoActual = stack.stack[tam-2];
        }else{
            this.local=false;
        }
        stack.stack.pop();
        stack.imprimir();
        
    }
    console.log("IMPRIMIR GLOBALES");
    almacenGlobales.imprimir();
    console.log("IMPRIMIR LOCALES");
    almacenMetodos.imprimir();
    if(resultado==null){
        var error = "Error en la invocación de la función "+ nombreMetodo.line+":"+nombreMetodo.column;
        document.getElementById("messages").value += (error);
        throw ( console.error(error));
    }
    return resultado;
};


// Visit a parse tree produced by miniPythonParser#expressionList_AST.
VisitorInterprete.prototype.visitExpressionList_AST = function(ctx) {
    let exp = VisitorInterprete.prototype.visit(ctx.expression());
    let moreExpressions = VisitorInterprete.prototype.visit(ctx.moreExpressions());
    moreExpressions.unshift(exp);
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
    let len = ctx.expression().length;

    let i = 0;
    while (i < ctx.expression().length){
        expression = VisitorInterprete.prototype.visit(ctx.expression(i));
        moreExp.push(expression);
        i++;
    }

    /*for(i = 0; i < ctx.expression().length; i++){
        console.log("LEN", ctx.expression().length);
        expression = VisitorInterprete.prototype.visit(ctx.expression(i));
        moreExp.push(expression);
        console.log("HAILO",moreExp);
        if(moreExp.length > 50){
            break;
        }
    }*/
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
    let str = ctx.STRING().getText();
    let text = str.substring(1, str.length - 1);
    console.log("ENTRÉ A STRING");
    comeFromString = true;
    return text;
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_ID_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_ID_AST = function(ctx) {                           //HERE IDDDDDD
    var metAux = null;
    let id = ctx.ID().getText();
    let idValue;
    if(llamada){
        if(stack.stack.length >= 2){   
            var tam = stack.stack.length;
            metAux = stack.stack[tam-2];  
            idValue= metAux.buscarValor(id);
        }else{
            idValue = almacenGlobales.buscarValor(id);
        }
        llamada=false;
        return idValue;   
    }
    if(stat){
        stat = false;
        return id;
    }
    else{
        let idValue;
        if(this.metodoActual==null){
            idValue = almacenGlobales.buscarValor(id);
            return idValue;
        }else{
            idValue = this.metodoActual.buscarValor(id);
            if(idValue === null){
                let value = almacenGlobales.buscarValor(id);
                return value;

            }
            return idValue;
        }
        
    }
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_Expression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_Expression_AST = function(ctx) {
    return VisitorInterprete.prototype.visit(ctx.expression());
};


// Visit a parse tree produced by miniPythonParser#primitiveExpression_listExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_listExpression_AST = function(ctx) {
    let primitiveList = VisitorInterprete.prototype.visit(ctx.listExpression());
    return primitiveList;
};

VisitorInterprete.prototype.visitPrimitiveExpression_len_Expression_AST = function(ctx) {
    //stat = true;
    let dataForLen = VisitorInterprete.prototype.visit(ctx.expression());
    let len;
    let dataValue = null;
    console.log("VOY A BUSCAR A ",dataForLen);
    console.log("type",typeof dataForLen, "comeFomString",comeFromString);
    console.log("STAT",stat);
    if(typeof dataForLen === 'object'){
        stat = false;
        comeFromString = false;
        len = dataForLen.length;
        return len;
    }
    if(comeFromString){
        console.log("DATA AQUÍ", len);
        len = dataForLen.length;
        comeFromString = false;
        stat = false;
        return len;
    }
    if(this.metodoActual==null){
        console.log("Estoy buscando global sin método definido");
        dataValue = almacenGlobales.buscarValor(dataForLen);
        if(typeof dataValue === 'number'){
            var error = "Error, no puede hacer len de un número ";
            document.getElementById("messages").value += (error);
            throw ( console.error(error));
        }
        comeFromString = false;
        stat = false;
        return dataValue.length;
    }
    else {
        console.log("Estoy buscando local con método definido");
        console.log("IMPRIMIR LOCALES");
        almacenMetodos.imprimir();
        console.log("data", dataForLen);
        console.log("Método", this.metodoActual);

        dataValue = this.metodoActual.buscarValor(dataForLen);
        if (dataValue === null) {
            console.log("No debía haber entrado aquí");
            dataValue = almacenGlobales.buscarValor(dataForLen);
        }
        if(typeof dataValue === 'number'){
            var error = "Error, no puede hacer len de un número ";
            document.getElementById("messages").value += (error);
            throw ( console.error(error));
        }
        len = dataValue.length;
        comeFromString = false;
        console.log("data value", dataValue);
        stat = false;
        return len;
    }
    //Por ahorita solo números
    var error = "Error, no puede hacer len de un número ";
    document.getElementById("messages").value += (error);
    throw ( console.error(error));
};

// Visit a parse tree produced by miniPythonParser#primitiveExpression_functionCallExpression_AST.
VisitorInterprete.prototype.visitPrimitiveExpression_functionCallExpression_AST = function(ctx) {
    let kawai = VisitorInterprete.prototype.visit(ctx.functionCallExpression());
    return kawai;
};


// Visit a parse tree produced by miniPythonParser#listExpression_AST.
VisitorInterprete.prototype.visitListExpression_AST = function(ctx) {
    let listExp = VisitorInterprete.prototype.visit(ctx.expressionList());
    let listType = typeof listExp[0];
    let flagType = false;
    for(let i =0; i < listExp.length; i++){
        if(typeof listExp[i] === 'object'){
            var error = "Error, no se permiten listas de listas";
            document.getElementById("messages").value += (error);
            throw ( console.error(error));
        }
    }
    //console.log("LISTA",listExp);
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
VisitorInterprete.prototype.getListaPrint = function () {
    return listaPrint.getListaPrint();
};
module.exports = VisitorInterprete;