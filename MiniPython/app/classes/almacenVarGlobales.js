//aqui se almacenan las variables globales y de nivel uno para los if, while, for
var variable = require('./variable');


function almacenVarGlobales(){
    this.tabla = [];
    this.nivelActual = -1;
    return this;
}

almacenVarGlobales.prototype.constructor = almacenVarGlobales;


almacenVarGlobales.prototype.insertar = function(token,tipo, valor){
    var i = new Ident(token, tipo, this.nivelActual, valor);
    this.tabla.push(i)
    
};

//buscar por nivel

//buscar



almacenVarGlobales.prototype.openScope =  function(){
    this.nivelActual ++;
};

almacenVarGlobales.prototype.closeScope = function(){
    var i = 0;
    while (i < this.tabla.length){
        if(this.tabla[i].nivel === this.nivelActual){
            this.tabla.splice(i,1);
            i = 0;
        }else {
            i++;
        }
    }
    this.nivelActual--;
};


module.exports = almacenVarGlobales;
