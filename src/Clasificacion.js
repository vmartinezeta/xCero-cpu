/*Autor: Víctor Martínez*/

export default function Clasificacion(id, nombre) {
    this.id = id
    this.nombre = nombre
}

Clasificacion.prototype = Object.create(Clasificacion.prototype)
Clasificacion.prototype.constructor = Clasificacion

Clasificacion.prototype.getId = function() {
    return this.id
}

Clasificacion.prototype.getNombre = function () {
    return this.nombre
}

Clasificacion.prototype.isFichaX = function() {
    return this.id === 1
}

Clasificacion.prototype.isFichaCero = function() {
    return this.id === 0
}

Clasificacion.prototype.isEscalaDificil = function() {
    return this.id === 11
}

Clasificacion.prototype.isEscalaNormal = function() {
    return this.id === 3
}

Clasificacion.prototype.isEscalaFacil = function(){
    return this.id === 2
}

Clasificacion.prototype.newInstance = function () {
    return new Clasificacion(this.id, this.nombre)
}