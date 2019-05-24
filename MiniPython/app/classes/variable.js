//aqui se estructura el objeto variable 

function variable(t,tp,nivel, valor) {
    this.token = t;
    this.type = tp;
    this.valor= valor;
    return this;
}
variable.prototype.constructor = variable;

module.exports = variable;