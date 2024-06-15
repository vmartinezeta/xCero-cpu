/*Autor: Víctor Martínez*/

import Clasificacion from "./Clasificacion.js"

const ClaseList = {
    lista: [
        new Clasificacion(0, 'ficha-0'),
        new Clasificacion(1, 'ficha-x'),
        new Clasificacion(2, 'nivel-facil'),
        new Clasificacion(3, 'nivel-medio'),
        new Clasificacion(4, 'ficha-espacio'),
        new Clasificacion(4, 'ficha-espacio-activo'),
        new Clasificacion(5, 'puede-ganar'),
        new Clasificacion(6, 'ganador'),
        new Clasificacion(7, 'horizontal'),
        new Clasificacion(8, 'vertical'),
        new Clasificacion(9, 'diagonal-1'),
        new Clasificacion(10, 'diagonal-2'),
    ],
    fromRango: function (inicio, fin) {
        return this.lista.filter(c => {
            return c.id >= inicio && c.id <= fin
        })
    },
    fromNombre: function (nombre) {
        return this.lista.find(c => c.getNombre() === nombre)
    }
}


export default ClaseList