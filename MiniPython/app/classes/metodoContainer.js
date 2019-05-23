//aqui se estructura el objeto método o función que tendrá un token, lista de parametros, valor de retorno


var variable = require('./variable');

function metodoContainer() {
    this.token = 0;
    this.valorRetorno = 0;
    this.variables = []; // se ingresa si no esta, pero se debe consultar si ya existe en el local o en el global
    this.nivelActual = -1;   
    this.puntero =  0;
    return this;

}

//metodo insertar variables a la lista


//ver si voy a ocupar ambos buscar porque, se busca local y luego global, no es necesario llevar el nivel??? creo

metodoContainer.prototype.insertar = function(token, tipo, valor){
    var temp = this.buscarVar(token.text);
    if ( temp == null) {
        var i = new variable(token, tipo, this.nivelActual, valor);  
        this.variables.push(i);
        
    }else{   
        temp.valor = valor;
        temp.type = tipo;
    }
    
};

metodoContainer.prototype.buscarVar = function(nombre){
    temp = null;
    for(i = this.variables.length-1; i >=0;i--){
        if(this.variables[i].token.text === nombre){
            temp = this.variables[i]
        }
    }
    return temp
};

metodoContainer.prototype.buscarPorNivel = function(nombre){
    temp = null;
    for(i = this.variables.length-1; i >=0;i--){
        if(this.variables[i].nivel === this.nivelActual){
            if(this.variables[i].token.text === nombre){
                temp = this.variables[i]
            }
        }
    }
    return temp
};

//alcance para las variables locales

almacenMetodo.prototype.openScope =  function(){
    this.nivelActual ++;
};
almacenMetodo.prototype.closeScope = function(){
    var i = 0;
    while (i < this.variables.length){
        if(this.variables[i].nivel === this.variables){
            this.variables.splice(i,1);
            i = 0;
        }else {
            i++;
        }
    }
    this.nivelActual--;
};

metodoContainer.prototype.constructor = metodoContainer;

module.exports = metodoContainer;