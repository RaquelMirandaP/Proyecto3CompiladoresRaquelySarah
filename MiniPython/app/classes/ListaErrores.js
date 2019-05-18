function ListaErrores() {
    console.log("Llegó a este contructor de Lista Errores");
    this.listaE = [];
    return this;
}
ListaErrores.prototype.agregarError = function (mensaje) {
    this.listaE.push(mensaje);
};

ListaErrores.prototype.imprimirErrores = function () {
  for(var i = 0; i < this.listaE.length; i++){
      console.log(this.listaE[i]);
  }
};

ListaErrores.prototype.getListaErrores = function () {
    return this.listaE;
};
ListaErrores.prototype.clearList = function () {
    /*for(let i = 0; i < this.listaE.length; i++){
        this.listaE[i] = "";
    }*/
    this.listaE = [];
};

ListaErrores.prototype.constructor = ListaErrores;

module.exports = ListaErrores;