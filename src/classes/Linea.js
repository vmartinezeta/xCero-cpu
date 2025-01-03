/*Autor: Víctor Martínez*/

export default class Linea {
    constructor(celdas, orientacion) {
        this.celdas = celdas
        this.orientacion = orientacion
    }

    getOrientacion() {
        return this.orientacion
    }

    isHorizontal() {
        return this.orientacion.id === 7
    }

    isVertical() {
        return this.orientacion.id === 8
    }

    isDiagonal() {
        return this.orientacion.id === 9 || this.orientacion.id === 10
    }

    toBit() {
        return this.celdas.map(c => c.claseFicha.id).reduce((numero, subtotal) => subtotal + numero, 0)
    }

    toPuntosAbstracto() {
        return this.celdas.map(({ ubicacion }) => ubicacion.puntoAbstracto)
    }

    getCeldas() {
        return this.celdas
    }

    puedeGanar() {
        return [4, 6].includes(this.toBit())
    }

    hayGanador() {
        return [0, 3].includes(this.toBit())
    }

    contieneTodas(ficha) {
        return 3 * ficha.id === this.toBit()
    }

    contiene(ficha) {
        return this.celdas.map(({ claseFicha }) => claseFicha.id).includes(ficha.id)
    }

    contieneTodos(puntos) {
        const internos = this.celdas.map(({ ubicacion }) => ubicacion.puntoAbstracto).map(p => p.toString())
        return internos.join("") === puntos.join("")
    }

    getPuntosExtremo() {
        const { ubicacion: u1 } = this.celdas.at(0)
        const { ubicacion: u2 } = this.celdas.at(2)
        return [u1.puntoConcreto, u2.puntoConcreto]
    }

    getExtremos() {
        const celdas = this.celdas
        return [celdas.at(0), celdas.at(2)]
    }

    tieneEspacio() {
        for (const c of this.celdas) {
            if (c.isEspacioDisponible()) return true
        }
        return false
    }

    getCeldaEspacio() {
        if (!this.tieneEspacio()) {
            throw new TypeError("No hay espacio")
        }
        return this.celdas.find(c => c.isEspacioDisponible())
    }

    estaNeutra() {
        return this.toBit() === 5
    }
}