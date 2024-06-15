/*Autor: Víctor Martínez*/

export default function Celda(claseFicha, ubicacion) {
    this.claseFicha = claseFicha
    this.ubicacion = ubicacion
}

Celda.prototype = Object.create(Celda.prototype)
Celda.prototype.constructor = Celda

Celda.prototype.setClaseFicha = function (claseFicha) {
    this.claseFicha = claseFicha
}

Celda.prototype.getClaseFicha = function () {
    return this.claseFicha
}

Celda.prototype.setUbicacion = function (ubicacion) {
    this.ubicacion = ubicacion
}

Celda.prototype.getUbicacion = function () {
    return this.ubicacion
}

Celda.prototype.toBit = function () {
    return this.claseFicha.getId()
}

Celda.prototype.isEspacioDisponible = function () {
    return this.claseFicha.getId() === 4
}

Celda.prototype.newInstance = function () {
    return new Celda(this.claseFicha, this.ubicacion)
}