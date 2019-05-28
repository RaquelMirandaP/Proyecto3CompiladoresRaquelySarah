//aqui se almacenan los almacenes  de metodos

var metodo = require('./metodoContainer');

function Stack(){
    this.stack = [];
    return this;
}

Stack.prototype.constructor = Stack;



Stack.prototype.insertar = function(){
    var i = new metodo();  
    this.stack.push(i)
    console.log("insercion completa en la pila");
    this.imprimir();

};



//sacar del almacen, Retorna el último valor ingresado a la pila, sacándolo de ésta.
Stack.prototype.eliminar = function(){
    console.log("elimino de la pila");
    return this.stack.pop(); 
         
}
Stack.prototype.imprimir = function(){
    for(var i = 0; i<this.stack.length; i++){
        //console.log("pila");
        console.log(this.stack[i]);
    }        
}



module.exports = Stack;