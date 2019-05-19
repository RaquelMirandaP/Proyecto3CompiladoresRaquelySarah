//aqui se estructura el objeto método o función que tendrá un token, lista de parametros, valor de retorno

function Metodo(n,param) {
    this.token = n;
    this.param = param;
    return this;
}
Metodo.prototype.constructor = Metodo;

module.exports = Metodo;