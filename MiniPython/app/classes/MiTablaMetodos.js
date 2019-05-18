var met = require('./Metodo');

function MiTablaMetodos(){
    this.tabla = [];
    return this;
}
MiTablaMetodos.prototype.constructor = MiTablaMetodos;


MiTablaMetodos.prototype.insertar = function(n,param){
    var i = new met(n,param);   //let me da error
    this.tabla.push(i)

};


MiTablaMetodos.prototype.buscar = function(nombre){
    var temp = null;
    for( var i = this.tabla.length-1; i >=0;i--){
        if(this.tabla[i].token.text === nombre){    //en vez de name iba tok.gettext() pero aqui no se guarda un token
            temp = this.tabla[i]
        }
    }
    return temp
};


MiTablaMetodos.prototype.imprimir = function(){
    console.log("Cantidad de elementos de la tabla metodos ",this.tabla.length);
    for(var i = 0; i<this.tabla.length;i++){
        var s = this.tabla[i].token.text;
        console.log("Nombre "+ s+" - " +" parametros: " +this.tabla[i].param );
    }
};


module.exports = MiTablaMetodos;