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
        return true;
    }else{
        temp.valor = valor;
        temp.type = tipo;
        return true;
    }
    return false;
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

almacenVarGlobales.prototype.buscarAsignar = function(nombre){
    for(i = this.tabla.length-1; i >=0;i--){
        if(this.tabla[i].token.text === nombre){
            return true;
        }
    }
    return false;
};
almacenVarGlobales.prototype.buscarValor = function(nombre){
    let temp = null;
    for(i = this.tabla.length-1; i >=0;i--){
        console.log(this.tabla[i]);
        if(this.tabla[i].token.text === nombre){
            temp = this.tabla[i].valor ;
        }
    }
    return temp;
};

almacenVarGlobales.prototype.insertarVarFor = function(token,tipo, valor){
    let i = new variable(token, tipo, valor);
    this.tabla.push(i);
};


almacenVarGlobales.prototype.imprimir = function(){
    for(i = 0; i<this.tabla.length;i++){
        s = this.tabla[i].token.text;
        console.log("Nombre "+ s +" tipo: " +this.tabla[i].type + " valor: " +this.tabla[i].valor);

    }
};

almacenVarGlobales.prototype.clearList = function () {
    this.tabla = [];
};


module.exports = almacenVarGlobales;
