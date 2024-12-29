/*Autor: Víctor Martínez*/

import ParejaLinea from "./ParejaLinea.js"

export default class Circuito {

    constructor(l1, l2, l3) {
        this.l1 = l1
        this.l2 = l2
        this.l3 = l3
        this.parejas = [
            new ParejaLinea(l1, l2),
            new ParejaLinea(l1, l3),
            new ParejaLinea(l2, l3)
        ]
    }

    formaCircuito() {
        return this.parejas.every(pareja => pareja.intersecta())
    }

    getInterceptos() {
        return this.l3.getExtremos()
    }

    acechaEnemigo () {
        return this.l1.estaNeutra()
    }

}