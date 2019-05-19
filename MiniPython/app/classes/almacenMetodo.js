//aqui se estructura el objeto método o función que tendrá un token, lista de parametros, valor de retorno


var variable = require('./variable');

function almacenMetodo() {
    this.token = 0;
    this.valorRetorno = 0;
    this.variables = [];
    this.nivelActual = -1;
    return this;

}

//metodo insertar valiables a la lista

almacenMetodo.prototype.insertar = function(token, tipo, valor){
    var i = new variable(token, tipo, this.nivelActual, valor);  
    this.variables.push(i)

};

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

almacenMetodo.prototype.constructor = almacenMetodo;

module.exports = almacenMetodo;