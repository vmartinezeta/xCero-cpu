/*Autor: Víctor Martínez*/

export default function Clasificacion(id, nombre) {
    this.id = id
    this.nombre = nombre
}

Clasificacion.prototype = Object.create(Clasificacion.prototype)
Clasificacion.prototype.constructor = Clasificacion

Clasificacion.prototype.setId = function (id) {
    this.id = id
}

Clasificacion.prototype.getId = function () {
    return this.id
}

Clasificacion.prototype.setNombre = function (nombre) {
    this.nombre = nombre
}

Clasificacion.prototype.getNombre = function () {
    return this.nombre
}

Clasificacion.prototype.toString = function () {
    return `${this.id}-${this.nombre}`
}

Clasificacion.prototype.isEscalaMedia = function() {
    return this.id === 3
}

Clasificacion.prototype.isEscalaFacil = function(){
    return this.id === 2
}

Clasificacion.prototype.newInstance = function () {
    return new Clasificacion(this.id, this.nombre)
}