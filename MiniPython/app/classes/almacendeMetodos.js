var metodo = require('./metodoContainer');


function almacendeMetodos(){
    this.almacen = [];
    return this;
}

almacendeMetodos.prototype.constructor = almacendeMetodos;

almacendeMetodos.prototype.insertar = function(token){
    var i = new metodo(token);
    this.almacen.push(i);
    
    
};

almacendeMetodos.prototype.buscar = function(nombre){
    temp = null;
    for(i = this.almacen.length-1; i >=0;i--){
        if(this.almacen[i].token.text === nombre){
            temp = this.almacen[i]
        }
    }
    return temp
};



module.exports = almacendeMetodos;
