/*Autor: Víctor Martínez*/

export default function EstadoLinea(claseFicha, estado, claseEstado) {
    this.estado = estado
    this.claseEstado = claseEstado
    this.ficha = claseFicha
}

EstadoLinea.prototype = Object.create(EstadoLinea.prototype)
EstadoLinea.prototype.constructor = EstadoLinea

EstadoLinea.prototype.getEstado = function () {
    return this.estado
}

EstadoLinea.prototype.getClaseEstado = function () {
    return this.claseEstado
}

EstadoLinea.prototype.getClaseFicha = function () {
    return this.ficha
}