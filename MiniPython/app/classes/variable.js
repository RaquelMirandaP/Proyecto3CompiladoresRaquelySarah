//aqui se estructura el objeto variable 

function variable(t,tp, valor) {
    this.token = t;
    this.type = tp;
    this.valor= valor;
    return this;
}
variable.prototype.constructor = variable;

module.exports = variable;