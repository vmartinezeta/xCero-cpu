import ClaseList from "./ClaseList.js"
import Punto from "./classes/Punto.js"
import PuntoArranque from "./classes/PuntoArranque.js"

export const PuntoArranqueList = {
    lista: [
        new PuntoArranque(new Punto(0, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 0), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 2), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(2, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(0, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(0, 2), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 2), ClaseList.fromNombre('nivel-medio'))
    ],
    fromNivel: function (nivel) {
        return this.lista.filter(function (puntoArranque) {
            return puntoArranque.getNivel().id === nivel.id
        })
    }
}