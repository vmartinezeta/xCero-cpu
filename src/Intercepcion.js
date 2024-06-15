/*Autor: Víctor Martínez*/

export default function Interseccion(pareja, celda) {
    this.pareja = pareja
    this.celda = celda
}

Interseccion.prototype = Object.create(Interseccion.prototype)
Interseccion.prototype.constructor = Interseccion

Interseccion.prototype.getPareja = function () {
    return this.pareja
}

Interseccion.prototype.getCelda = function () {
    return this.celda
}

Interseccion.prototype.toString = function() {
    return this.pareja.toString()
}