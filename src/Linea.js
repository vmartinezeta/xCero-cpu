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

Linea.prototype.isHorizontal = function () {
    return this.orientacion.id === 7
}

Linea.prototype.isVertical = function () {
    return this.orientacion.id === 8
}

Linea.prototype.isDiagonal = function () {
    return this.orientacion.id === 9 || this.orientacion.id === 10
}

Linea.prototype.toBit = function () {
    return this.celdas.map(c => c.claseFicha.id).reduce((numero, subtotal) => subtotal + numero, 0)
}

Linea.prototype.toPuntosAbstracto = function () {
    return this.celdas.map(({ ubicacion }) => ubicacion.puntoAbstracto)
}

Linea.prototype.getCeldas = function () {
    return this.celdas
}

Linea.prototype.puedeGanar = function () {
    return [4, 6].includes(this.toBit())
}

Linea.prototype.hayGanador = function () {
    return [0, 3].includes(this.toBit())
}

Linea.prototype.contieneTodas = function (ficha) {
    return 3 * ficha.id === this.toBit()
}

Linea.prototype.contieneTodos = function (puntos) {
    const internos = this.celdas.map(({ ubicacion }) => ubicacion.puntoAbstracto).map(p => p.toString())
    return internos.join("") === puntos.join("")
}

Linea.prototype.getPuntosExtremo = function () {
    const { ubicacion: u1 } = this.celdas.at(0)
    const { ubicacion: u2 } = this.celdas.at(2)
    return [u1.puntoConcreto, u2.puntoConcreto]
}

Linea.prototype.getExtremos = function () {
    const celdas = this.celdas
    return [celdas.at(0), celdas.at(2)]
}

Linea.prototype.tieneEspacio = function () {
    for (const c of this.celdas) {
        if (c.isEspacioDisponible()) return true
    }
    return false
}

Linea.prototype.getCeldaEspacio = function () {
    if (!this.tieneEspacio()) {
        throw new TypeError("No hay espacio")
    }
    return this.celdas.find(c => c.isEspacioDisponible())
}

Linea.prototype.estaNeutra = function () {
    return this.toBit() === 5
}