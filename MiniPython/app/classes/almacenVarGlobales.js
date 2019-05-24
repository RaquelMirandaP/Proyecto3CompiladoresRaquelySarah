//aqui se almacenan las variables globales y de nivel uno para los if, while, for
var variable = require('./variable');


function almacenVarGlobales(){
    this.tabla = [];
    return this;
}

almacenVarGlobales.prototype.constructor = almacenVarGlobales;

//metodo para insertar variables y actualizarlas
almacenVarGlobales.prototype.insertar = function(token,tipo, valor){
    var temp = this.buscar(token.text);
    if (temp == null) {
        var i = new Ident(token, tipo, valor);
        this.tabla.push(i);
    }else{
        temp.valor = valor;
        temp.type = tipo;
    }
    
    
};

almacenVarGlobales.prototype.buscar = function(nombre){
    temp = null;
    for(i = this.tabla.length-1; i >=0;i--){
        if(this.tabla[i].token.text === nombre){
            temp = this.tabla[i]
        }
    }
    return temp
};

module.exports = almacenVarGlobales;