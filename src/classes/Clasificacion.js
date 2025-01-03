/*Autor: Víctor Martínez*/

export default class Clasificacion {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
    }

    getId () {
        return this.id
    }

    getNombre () {
        return this.nombre
    }

    isFichaX () {
        return this.id === 1
    }

    isFichaCero () {
        return this.id === 0
    }

    isEscalaDificil () {
        return this.id === 11
    }

    isEscalaNormal () {
        return this.id === 3
    }

    isEscalaFacil () {
        return this.id === 2
    }

    newInstance () {
        return new Clasificacion(this.id, this.nombre)
    }
}