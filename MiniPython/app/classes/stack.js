//aqui se almacenan los almacenes  de metodos

var almacen = require('./almacenMetodo');

function Stack(){
    this.stack = [];
    return this;
}
Stack.prototype.constructor = Stack;



Stack.prototype.insertar = function(){
    var i = new almacen();  
    this.stack.push(i)

};

//buscar

//sacar del almacen

//consultar al almacen


module.exports = Stack;