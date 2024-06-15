/*Autor: Víctor Martínez*/

export default function Ubicacion(puntoAbstracto, puntoConcreto) {
    this.puntoAbstracto = puntoAbstracto
    this.puntoConcreto = puntoConcreto
}

Ubicacion.prototype = Object.create(Ubicacion.prototype)
Ubicacion.prototype.constructor = Ubicacion

Ubicacion.prototype.setPuntoAbstracto = function (puntoAbstracto) {
    this.puntoAbstracto = puntoAbstracto
}

Ubicacion.prototype.getPuntoAbstracto = function () {
    return this.puntoAbstracto
}

Ubicacion.prototype.getPuntoConcreto = function () {
    return this.puntoConcreto
}

Ubicacion.prototype.newInstance = function () {
    return new Ubicacion(this.puntoAbstracto, this.puntoConcreto)
}