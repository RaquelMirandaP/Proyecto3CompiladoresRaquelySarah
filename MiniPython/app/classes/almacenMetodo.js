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
    //console.log("Qué tengo en el almacén?", this.almacen);
    for(i = this.almacen.length-1; i >=0;i--){
        //console.log("Qué tengo en el almacén?", this.almacen[i]);
        if(this.almacen[i].token.text === nombre){
            temp = this.almacen[i]
        }
    }
    return temp
};

almacenMetodo.prototype.imprimir = function(){
    for(i = 0; i<this.almacen.length;i++){
        s = this.almacen[i].token.text;
        console.log("Nombre "+ s +" Cantidad de objetos del metodo "+ this.almacen[i].variables.length);
        for(j = 0; j<this.almacen[i].variables.length;j++){
            //console.log(this.almacen[i].variables[j]);
            console.log("var "+this.almacen[i].variables[j].token.text +" type "+ this.almacen[i].variables[j].type
             +" valor "+ this.almacen[i].variables[j].valor);
        }

    }
};



module.exports = almacenMetodo;
