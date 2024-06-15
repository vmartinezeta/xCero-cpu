/*Autor: Víctor Martínez*/

export default function Bien(linea, propietario) {
    this.linea = linea
    this.propietario = propietario
}

Bien.prototype = Object.create(Bien.prototype)
Bien.prototype.constructor = Bien

Bien.prototype.getLinea = function () {
    return this.linea
}

Bien.prototype.getPropietario = function () {
    return this.propietario
}