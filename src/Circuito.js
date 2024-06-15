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
        return this.parejas.every(pareja => pareja.intersecta()) && !this.igualInterceptos()
    }

    igualInterceptos() {
        const celdas = []
        for (let p of this.parejas) {
            if (p.intersecta()) {
                celdas.push(p.getCeldaIntercepto())
            }
        }
        const [p1, p2, p3] = celdas.map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
        return p1.toString() === p2.toString() && p1.toString() === p3.toString()
    }

    interceptosClaveDisponibles() {
        return this.l3.toArrayCelda().filter(c => c.isEspacioDisponible())
    }

}