/*Autor: Víctor Martínez*/

export default class PuntoArranque {
    constructor(punto, nivel) {
        this.punto = punto
        this.nivel = nivel
    }

    getPunto() {
        return this.punto
    }

    getNivel() {
        return this.nivel
    }
}