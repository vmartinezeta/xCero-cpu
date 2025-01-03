/*Autor: Víctor Martínez*/

import ClaseList from "../ClaseList.js"

export default class Bien {

    constructor(linea, fichaCpu, fichaJugador) {
        this.linea = linea
        this.fichaCpu = fichaCpu
        this.fichaJugador = fichaJugador
        this.fichaEspacio = ClaseList.fromNombre("ficha-espacio")
    }

    getLinea () {
        return this.linea
    }

    getPropietario () {
        const contador = { cpu: 0, jugador: 0, espacio: 0 }

        for (const celda of this.linea.getCeldas()) {
            const clase = celda.getClaseFicha()
            if (clase.id === this.fichaCpu.id) {
                contador.cpu++
            } else if (clase.id === this.fichaJugador.id) {
                contador.jugador++
            } else if (clase.id === this.fichaEspacio.id) {
                contador.espacio++
            }
        }

        const { cpu, jugador, espacio } = contador

        if ((cpu === 1 && espacio === 2) || (cpu===3 && espacio + jugador === 0)||(cpu===2 && espacio+jugador>0)) {
            return this.fichaCpu
        } else if ((jugador === 1 && espacio === 2) || (jugador === 3 && espacio + jugador === 0)||(jugador===2 && espacio+jugador>0)) {
            return this.fichaJugador
        } else if (espacio === 3 && cpu + jugador === 0) {
            return this.fichaEspacio
        }
        return null
    }

    tienePropietario () {
        return this.getPropietario() !== null
    }

    isFichaCpu () {
        return this.tienePropietario() && this.getPropietario().id === this.fichaCpu.id
    }

    isFichaJugador() {
        return this.tienePropietario() && this.getPropietario().id === this.fichaJugador.id
    }

    isFichaEspacio () {
        return this.tienePropietario() && this.getPropietario().id === this.fichaEspacio.id
    }

    puedeGanarJugador () {
        return this.linea.puedeGanar() && this.linea.contiene(this.fichaJugador)
    }

    puedeGanarCpu () {
        return this.linea.puedeGanar() && this.linea.contiene(this.fichaCpu)
    }
}