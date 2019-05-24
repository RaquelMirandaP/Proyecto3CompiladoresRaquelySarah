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



module.exports = almacenMetodo;
