var metodo = require('./metodoContainer');


function almacenMetodo(){
    this.almacen = [];
    return this;
}

almacenMetodo.prototype.constructor = almacenMetodo;

/*almacendeMetodos.prototype.insertar = function(token){
    var i = new metodo(token);
    this.almacen.push(i);
    
    
};*/

almacenMetodo.prototype.buscar = function(nombre){
    temp = null;
    for(i = this.almacen.length-1; i >=0;i--){
        if(this.almacen[i].token.text === nombre){
            temp = this.almacen[i]
        }
    }
    return temp
};

almacenVarGlobales.prototype.imprimir = function(){
    console.log("Cantidad de elementos del almacen de metodos",this.almacen.length);
    for(i = 0; i<this.almacen.length;i++){
        s = this.almacen[i].token.text;
        console.log("Nombre "+ s);
        //imprimir las variables de los metodos
        s.imprimir();
    }
};



module.exports = almacenMetodo;
