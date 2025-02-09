/*Autor: Víctor Martínez*/

import Celda from "./Celda.js"
import ClaseList from "../ClaseList.js"
import Linea from "./Linea.js"
import Punto from "./Punto.js"
import Ubicacion from "./Ubicacion.js"


export default class Cuadricula {
    constructor() {
        this.NUMERO_FILAS = 3
        this.NUMERO_COLUMNAS = 3
        this.celdas = []
        for (let i = 0; i < this.NUMERO_FILAS; i++) {
            const fila = []
            for (let j = 0; j < this.NUMERO_COLUMNAS; j++) {
                const x = 60 + 100 * j
                const y = 140 + 100 * i
                const ubicacion = new Ubicacion(new Punto(i, j), new Punto(x, y))
                const claseFicha = ClaseList.fromNombre('ficha-espacio').newInstance()
                fila.push(new Celda(claseFicha, ubicacion))
            }
            this.celdas.push(fila)
        }
    }

    fromXY(x, y) {
        return this.celdas[x][y]
    }

    fromPunto(punto) {
        return this.fromXY(punto.x, punto.y)
    }

    setCelda(celda) {
        const { x, y } = celda.getUbicacion().getPuntoAbstracto()
        this.celdas[x][y] = celda
    }

    toLineas() {
        const celdasDiagonal1 = []
        const celdasDiagonal2 = []
        const lineas = []
        for (let i = 0; i < this.NUMERO_FILAS; i++) {
            const celdasVertical = []
            const celdasHorizontal = []
            for (let j = 0; j < this.NUMERO_COLUMNAS; j++) {
                celdasHorizontal.push(this.fromXY(i, j))
                celdasVertical.push(this.fromXY(j, i))
                if (i === j) {
                    celdasDiagonal1.push(this.fromXY(i, j))
                }
                if ((i + j) === 2) {
                    celdasDiagonal2.push(this.fromXY(i, j))
                }
            }
            lineas.push(new Linea(celdasHorizontal, ClaseList.fromNombre('horizontal')))
            lineas.push(new Linea(celdasVertical, ClaseList.fromNombre('vertical')))
        }
        lineas.push(new Linea(celdasDiagonal1, ClaseList.fromNombre('diagonal-1')))
        lineas.push(new Linea(celdasDiagonal2, ClaseList.fromNombre('diagonal-2')))
        return lineas
    }

    toArrayCelda() {
        const celdas = []
        for (let i = 0; i < this.NUMERO_FILAS; i++) {
            for (let j = 0; j < this.NUMERO_COLUMNAS; j++) {
                celdas.push(this.fromXY(i, j))
            }
        }
        return celdas
    }

    toPuntosAbstracto() {
        return this.toArrayCelda().map(({ ubicacion }) => ubicacion.puntoAbstracto)
    }

    getPuntosEspacio() {
        return this.toArrayCelda().filter(c => c.isEspacioDisponible()).map(({ ubicacion }) => ubicacion.puntoAbstracto)
    }

    tieneEspacioDisponible() {
        return this.toArrayCelda().filter(c => c.isEspacioDisponible()).length > 0
    }

    estaIntacta() {
        return this.toArrayCelda().filter(c => !c.isEspacioDisponible()).length === 0
    }
}