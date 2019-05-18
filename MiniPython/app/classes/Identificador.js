function Identificador(t,tp,nivel) {
    this.token = t;
    this.type = tp;
    this.nivel = nivel;
    return this;
}
Identificador.prototype.constructor = Identificador;

module.exports = Identificador;