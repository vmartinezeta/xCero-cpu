/*Autor: Víctor Martínez*/

import ClaseList from "./ClaseList.js"
import Clasificacion from "./Clasificacion.js"

export default function ConfigxCero() { }

ConfigxCero.prototype = Object.create(ConfigxCero.prototype)
ConfigxCero.prototype.constructor = ConfigxCero

ConfigxCero.prototype.ANCHO = 320
ConfigxCero.prototype.ALTURA = 500
ConfigxCero.prototype.musicaFondo = null
ConfigxCero.prototype.volumen = 10
ConfigxCero.prototype.fichaCpu = new Clasificacion(0, 'ficha-0')
ConfigxCero.prototype.fichaJugador = new Clasificacion(1, 'ficha-x')
ConfigxCero.prototype.dificultad = new Clasificacion(2, 'nivel-facil')

ConfigxCero.prototype.setFichaJugador = function (fichaJugador) {
    this.fichaJugador = fichaJugador
    this.fichaCpu = this.getClasesFicha().find(ficha => ficha.id !== fichaJugador.id)
}

ConfigxCero.prototype.getFichaJugador = function () {
    return this.fichaJugador
}

ConfigxCero.prototype.getFichaCpu = function () {
    return this.fichaCpu
}

ConfigxCero.prototype.getClasesFicha = function() {
    return ClaseList.fromRango(0, 1)
}

ConfigxCero.prototype.getFichaEspacio = function() {
    return ClaseList.fromNombre("ficha-espacio")
}

ConfigxCero.prototype.getDificultad = function () {
    return this.dificultad
}

ConfigxCero.prototype.setDificultad = function (dificultad) {
    this.dificultad = dificultad
}

ConfigxCero.prototype.getDificultades = function () {
    return ClaseList.fromRango(2,3)
}