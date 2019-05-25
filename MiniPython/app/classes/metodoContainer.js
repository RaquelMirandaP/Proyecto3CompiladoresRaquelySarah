//aqui se estructura el objeto método o función que tendrá un token, lista de parametros, valor de retorno


var variable = require('./variable');

function metodoContainer() {
    this.token = 0;
    this.variables = []; // se ingresa si no esta, pero se debe consultar si ya existe en el local o en el global 
    return this;

}

//metodo insertar variables a la lista


//ver si voy a ocupar ambos buscar porque, se busca local y luego global, no es necesario llevar el nivel??? creo

metodoContainer.prototype.insertarVar = function(token, tipo, valor){
    var temp = this.buscarVar(token.text);
    if ( temp == null) {
        var i = new variable(token, tipo, valor);  
        this.variables.push(i);
        
    }else{   
        temp.valor = valor;
        temp.type = tipo;
    }
    
};
//los punteros se insertan desde el visitor, como un objeto

metodoContainer.prototype.buscarVar = function(nombre){
    temp = null;
    for(i = this.variables.length-1; i >=0;i--){
        if(this.variables[i].token.text === nombre){
            temp = this.variables[i]
        }
    }
    return temp
};
almacenVarGlobales.prototype.imprimir = function(){
    console.log("Cantidad de variables del metodo ",this.variables.length);
    for(i = 0; i<this.variables.length;i++){
        s = this.tabla[i].token.text;
        console.log("Nombre "+ s +" tipo: " +this.tabla[i].type +" tipo: " +this.tabla[i].valor);
    }
};


metodoContainer.prototype.constructor = metodoContainer;

module.exports = metodoContainer;