/*Autor: Víctor Martínez*/

import ClaseList from "./ClaseList.js"

export default function Linea(celdas, claseLinea, fichaCpu) {
    this.celdas = celdas
    this.claseLinea = claseLinea
    this.fichaCpu = fichaCpu
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

Linea.prototype.getPropietario = function () {
    const contador = { cpu: 0, jugador: 0, espacio: 0 }
    const fichaCpu = this.fichaCpu
    const lista = ClaseList.fromRango(0,1)
    const fichaJugador = lista.find(clase => clase.toString() !== fichaCpu.toString())
    
    for (let c of this.celdas) {
        const clase = c.getClaseFicha()
        if (clase.toString() === fichaCpu.toString()) {
            contador.cpu++
        } else if (clase.toString() === fichaJugador.toString()) {
            contador.jugador++
        } else if (clase.toString() === ClaseList.fromNombre('ficha-espacio').toString()) {
            contador.espacio++
        }
    }

    const { cpu, jugador, espacio } = contador

    if ((cpu > jugador && cpu > espacio)
        || (espacio > jugador && espacio > cpu && cpu > jugador)) {
        return fichaCpu
    } else if ((jugador > cpu && jugador > espacio)
        || (espacio > jugador && espacio > cpu && jugador > cpu)) {
        return fichaJugador
    } else if (espacio > jugador && espacio > cpu) {
        return ClaseList.fromNombre('ficha-espacio')
    }
    return null
}

Linea.prototype.tienePropietario = function () {
    return this.getPropietario() !== null
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