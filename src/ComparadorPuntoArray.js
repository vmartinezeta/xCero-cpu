import Punto from "./Punto.js"

export class ComparadorPuntoArray {
    constructor(array1, array2) {
        if (array1.some(e => !(e instanceof Punto))
            || array2.some(e => !(e instanceof Punto))
        ) {
            throw new TypeError("Error!")
        }
        this.grupo1 = new Set(array1.map(p => p.toString()))
        this.grupo2 = new Set(array2.map(p => p.toString()))
    }

    tieneIntercepto() {
        return this.getInterseccion().length !== 0
    }

    getInterseccion() {
        const intersectos = []
        for (const elem of this.grupo2) {
            if (this.grupo1.has(elem)) {
                intersectos.push(elem)
            }
        }
        return intersectos.map(e => new Punto(e.toString()))
    }

    getDiferencia() {
        const diferencia = new Set(this.grupo1)
        for (const elem of this.grupo2) {
            diferencia.delete(elem)
        }
        return [...diferencia].map(e=>new Punto(e.toString()))
    }

}