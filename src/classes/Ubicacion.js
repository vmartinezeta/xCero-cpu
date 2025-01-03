/*Autor: Víctor Martínez*/

export default class Ubicacion {
    constructor(puntoAbstracto, puntoConcreto) {
        this.puntoAbstracto = puntoAbstracto
        this.puntoConcreto = puntoConcreto
    }

    setPuntoAbstracto (puntoAbstracto) {
        this.puntoAbstracto = puntoAbstracto
    }

    getPuntoAbstracto () {
        return this.puntoAbstracto
    }

    getPuntoConcreto () {
        return this.puntoConcreto
    }

    newInstance () {
        return new Ubicacion(this.puntoAbstracto, this.puntoConcreto)
    }
}