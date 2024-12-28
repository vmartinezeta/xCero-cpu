/*Autor: Víctor Martínez*/

export default function Linea(celdas, orientacion) {
    this.celdas = celdas
    this.orientacion = orientacion
}

Linea.prototype = Object.create(Linea.prototype)
Linea.prototype.constructor = Linea

Linea.prototype.getOrientacion = function () {
    return this.orientacion
}

Linea.prototype.toBit = function () {
    return this.celdas.map(c => c.toBit()).reduce((numero, subtotal) => subtotal + numero, 0)
}

Linea.prototype.toPuntosAbstracto = function () {
    return this.celdas.map(({ubicacion}) => ubicacion.puntoAbstracto)
}

Linea.prototype.pertenece = function (punto) {
    return this.toPuntosAbstracto().find(p = p.toString() === punto.toString())
}

Linea.prototype.hayGanador = function () {
    return [0, 3].includes(this.toBit())
}

Linea.prototype.contieneTodas = function(ficha) {
    return 3 * ficha.id === this.toBit()
}