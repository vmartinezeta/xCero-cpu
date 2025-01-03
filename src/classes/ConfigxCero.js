/*Autor: Víctor Martínez*/

import ClaseList from "../ClaseList.js"

export default class ConfigxCero {
    constructor() {
        this.ANCHO = 320
        this.ALTURA = 500
        this.musicaFondo = null
        this.volumen = 10
        this.fichaCpu = ClaseList.fromNombre('ficha-0')
        this.fichaJugador = ClaseList.fromNombre('ficha-x')
        this.dificultad = ClaseList.fromNombre('nivel-facil')
    }

    setFichaJugador(fichaJugador) {
        this.fichaJugador = fichaJugador
        this.fichaCpu = this.getClasesFicha().find(ficha => ficha.id !== fichaJugador.id)
    }

    getFichaJugador() {
        return this.fichaJugador
    }

    getFichaCpu() {
        return this.fichaCpu
    }

    getClasesFicha() {
        return ClaseList.fromRango(0, 1)
    }

    getFichaEspacio() {
        return ClaseList.fromNombre("ficha-espacio")
    }

    getDificultad() {
        return this.dificultad
    }

    setDificultad(dificultad) {
        this.dificultad = dificultad
    }

    getDificultades() {
        return ClaseList.fromRango(2, 3)
    }
}