/*Autor: Víctor Martínez*/

import { ComparadorPuntoArray } from "./ComparadorPuntoArray.js"

export default class ParejaLinea extends ComparadorPuntoArray{
    constructor(l1, l2) {
        super(l1.toPuntosAbstracto(), l2.toPuntosAbstracto())
        this.l1 = l1
        this.l2 = l2
    }

    intersecta() {
        return this.tieneIntercepto()
    }

    getCeldaIntercepto() {
        if (!this.tieneIntercepto()) {
            throw new TypeError("No hay intercepto")
        }
        const [punto] = this.getInterseccion()
        return this.l1.celdas.find(({ubicacion})=>ubicacion.puntoAbstracto.toString()===punto.toString())
    }
}