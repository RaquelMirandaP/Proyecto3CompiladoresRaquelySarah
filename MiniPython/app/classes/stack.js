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
    console.log("insercion completa en la pila");

};



//sacar del almacen, Retorna el último valor ingresado a la pila, sacándolo de ésta.
Stack.prototype.eliminar = function(){
    console.log("elimino de la pila");
    return this.stack.pop(); 
         
}



module.exports = Stack;