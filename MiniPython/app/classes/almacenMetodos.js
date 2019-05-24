var metodo = require('./metodoContainer');


function almacenMetodos(){
    this.almacen = [];
    return this;
}

almacenMetodos.prototype.constructor = almacenMetodos;

/*almacendeMetodos.prototype.insertar = function(token){
    var i = new metodo(token);
    this.almacen.push(i);
    
    
};*/

almacenMetodos.prototype.buscar = function(nombre){
    temp = null;
    for(i = this.almacen.length-1; i >=0;i--){
        if(this.almacen[i].token.text === nombre){
            temp = this.almacen[i]
        }
    }
    return temp
};



module.exports = almacenMetodos;
