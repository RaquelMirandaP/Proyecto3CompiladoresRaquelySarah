//aqui se estructura el objeto método o función que tendrá un token, lista de parametros, valor de retorno


var variable = require('./variable');

function metodoContainer() {
    this.token = 0;
    this.variables = []; // se ingresa si no esta, pero se debe consultar si ya existe en el local o en el global 
    this.puntero = null;
    return this;

}
metodoContainer.prototype.insertarParametros = function(token){
    var i = new variable(token, null, null);
    this.variables.push(i);
    //console.log("si inserto en parametro")
}


metodoContainer.prototype.insertarVar = function(token, tipo, valor){
    var temp = this.buscarVar(token.text);
    if ( temp == null) {
        var i = new variable(token, tipo, valor);  
        this.variables.push(i);
        return true;
        
    }else{   
        temp.valor = valor;
        temp.type = tipo;
        return true;
    }
    return false;
    
};

//los punteros y el token del metodo, se insertan desde el visitor como un objeto

metodoContainer.prototype.buscarVar = function(nombre){
    temp = null;
    for(i = this.variables.length-1; i >=0;i--){
        if(this.variables[i].token.text === nombre){
            temp = this.variables[i]
        }
    }
    return temp
};

metodoContainer.prototype.buscarAsignar = function(nombre){
    for(i = this.variables.length-1; i >=0;i--){
        if(this.variables[i].token.text === nombre){
            return true;
        }
    }
    console.log("soy una variable que no existo local: ",nombre);
    return false;
};

metodoContainer.prototype.buscarValor = function(nombre){
    let temp = null;
    for(i = this.variables.length-1; i >=0;i--){
        console.log(this.variables[i].token.text);
        if(this.variables[i].token.text === nombre){
            temp = this.variables[i].valor ;
        }
    }
    return temp;
};

metodoContainer.prototype.constructor = metodoContainer;

module.exports = metodoContainer;