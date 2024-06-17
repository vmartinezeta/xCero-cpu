/*Autor: Víctor Martínez*/

export default function Linea(celdas, claseLinea) {
    this.celdas = celdas
    this.claseLinea = claseLinea
}

Linea.prototype = Object.create(Linea.prototype)
Linea.prototype.constructor = Linea

Linea.prototype.getClaseLinea = function () {
    return this.claseLinea
}

Linea.prototype.getC1 = function () {
    return this.celdas[0]
}

Linea.prototype.getC2 = function () {
    return this.celdas[1]
}

Linea.prototype.getC3 = function () {
    return this.celdas[2]
}

Linea.prototype.toPuntosAbstracto = function () {
    return this.celdas.map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
}

Linea.prototype.toString = function () {
    return this.celdas.map(c => c.toBit()).join('')
}

Linea.prototype.toNumber = function () {
    return Number(this.toString())
}

Linea.prototype.toBit = function () {
    return this.toBitArray().reduce((numero, subtotal) => subtotal + numero, 0)
}

Linea.prototype.toBitArray = function () {
    return this.celdas.map(c => c.toBit())
}

Linea.prototype.toArrayCelda = function () {
    return this.celdas
}

Linea.prototype.celdaFrom = function (punto) {
    return this.celdas.find(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto.toString() === punto.toString())
}

Linea.prototype.getCeldaEspacio = function () {
    return this.celdas.find(celda => celda.isEspacioDisponible())
}

Linea.prototype.tieneEspacioDisponible = function () {
    return this.celdas.filter(c => c.isEspacioDisponible()).length > 0
}

Linea.prototype.pertenece = function (punto) {
    return this.toPuntosAbstracto().filter(p => p.toString() === punto.toString()).length === 1
}

Linea.prototype.correspondeExtremo = function (celda) {
    return this.correspondeExtremoIzquierdo(celda)
        || this.correspondeExtremoDerecho(celda)
}

Linea.prototype.correspondeExtremoIzquierdo = function (celda) {
    const { puntoAbstracto } = this.getC1().getUbicacion()
    const ubicacion = celda.getUbicacion()
    return puntoAbstracto.toString() === ubicacion.getPuntoAbstracto().toString()
}

Linea.prototype.correspondeExtremoDerecho = function (celda) {
    const { puntoAbstracto } = this.getC3().getUbicacion()
    const ubicacion = celda.getUbicacion()
    return puntoAbstracto.toString() === ubicacion.getPuntoAbstracto().toString()
}