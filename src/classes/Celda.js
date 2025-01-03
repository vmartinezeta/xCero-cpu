/*Autor: Víctor Martínez*/

export default class Celda {
    constructor(claseFicha, ubicacion) {
        this.claseFicha = claseFicha
        this.ubicacion = ubicacion
    }

    setClaseFicha(claseFicha) {
        this.claseFicha = claseFicha
    }

    getClaseFicha() {
        return this.claseFicha
    }

    setUbicacion(ubicacion) {
        this.ubicacion = ubicacion
    }

    getUbicacion() {
        return this.ubicacion
    }

    toBit() {
        return this.claseFicha.getId()
    }

    isEspacioDisponible() {
        return this.claseFicha.getId() === 4
    }

    newInstance() {
        return new Celda(this.claseFicha, this.ubicacion)
    }
}