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
        var i = new variable(token, tipo, valor);
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

almacenVarGlobales.prototype.imprimir = function(){
    console.log("Cantidad de elementos del almacen de variables globales",this.tabla.length);
    for(i = 0; i<this.tabla.length;i++){
        s = this.tabla[i].token.text;
        console.log("Nombre "+ s +" tipo: " +this.tabla[i].type + " valor: " +this.tabla[i].valor);
    }
};

module.exports = almacenVarGlobales;
