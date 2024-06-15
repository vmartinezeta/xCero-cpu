/*Autor: Víctor Martínez*/

export default function PuntoArranque(punto, nivel) {
    this.punto = punto
    this.nivel = nivel
}

PuntoArranque.prototype = Object.create(PuntoArranque.prototype)
PuntoArranque.prototype.constructor = PuntoArranque

PuntoArranque.prototype.getPunto = function () {
    return this.punto
}

PuntoArranque.prototype.getNivel = function () {
    return this.nivel
}