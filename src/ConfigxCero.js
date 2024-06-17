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
ConfigxCero.prototype.claseFicha = new Clasificacion(1, 'ficha-x')
ConfigxCero.prototype.dificultad = new Clasificacion(2, 'nivel-facil')

ConfigxCero.prototype.setClaseFicha = function (claseFicha) {
    this.claseFicha = claseFicha
    this.fichaCpu = this.getClasesFicha().find(clase => clase.toString() !== claseFicha.toString())
}

ConfigxCero.prototype.getFichaCpu = function () {
    return this.fichaCpu
}

ConfigxCero.prototype.getClaseFicha = function () {
    return this.claseFicha
}


ConfigxCero.prototype.getFichaEspacio = function() {
    return ClaseList.fromNombre("ficha-espacio")
}

ConfigxCero.prototype.getClasesFicha = function () {
    return ClaseList.fromRango(0, 1)
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