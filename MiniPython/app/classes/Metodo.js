function Metodo(n,param) {
    this.token = n;
    this.param = param;
    return this;
}
Metodo.prototype.constructor = Metodo;

module.exports = Metodo;