//aqui se almacenan las variables globales y de nivel uno para los if, while, for
var variable = require('./variable');


function almacenVarGlobales(){
    this.tabla = [];
    this.nivelActual = -1;
    return this;
}

almacenVarGlobales.prototype.constructor = almacenVarGlobales;

//metodo para insertar variables y actualizarlas
almacenVarGlobales.prototype.insertar = function(token,tipo, valor){
    var temp = this.buscarPorNivel(token.text);
    if (temp == null) {
        var i = new Ident(token, tipo, this.nivelActual, valor);
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
almacenVarGlobales.prototype.buscarPorNivel = function(nombre){
    temp = null;
    for(i = this.tabla.length-1; i >=0;i--){
        if(this.tabla[i].nivel === this.nivelActual){
            if(this.tabla[i].token.text === nombre){
                temp = this.tabla[i]
            }
        }
    }
    return temp
};


//alcance de las variables globales
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
