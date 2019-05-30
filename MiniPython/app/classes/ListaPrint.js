function ListaPrint() {
    this.listaP = [];
    return this;
}
ListaPrint.prototype.agregarMensaje = function (mensaje) {
    this.listaP.push(mensaje);
};

ListaPrint.prototype.imprimirMensajes = function () {
    for(var i = 0; i < this.listaP.length; i++){
        console.log(this.listaP[i]);
    }
};

ListaPrint.prototype.getListaPrint = function () {
    return this.listaP;
};
ListaPrint.prototype.clearList = function () {
    /*for(let i = 0; i < this.listaE.length; i++){
        this.listaE[i] = "";
    }*/
    this.listaP = [];
};

ListaPrint.prototype.constructor = ListaPrint;

module.exports = ListaPrint;