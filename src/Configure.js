/*Autor: Víctor Martínez*/

import BarraProgreso from "./BarraProgreso.js"
import Punto from "./Punto.js"
import SelectorFicha from "./SelectorFicha.js"

export default function Configure(config) {
    this.config = config
    this.barraProgreso = null
}

Configure.prototype = Object.create(Configure.prototype)
Configure.prototype.constructor = Configure

Configure.prototype.create = function () {
    this.add.sprite(0, 0, 'configuracion')

    new SelectorFicha(this, this.config, this.config.setClaseFicha, this.config.getClaseFicha(), this.config.getClasesFicha(), new Punto(110, 157))

    new SelectorFicha(this, this.config, this.config.setDificultad, this.config.getDificultad(), this.config.getDificultades(), new Punto(110, 277))

    this.crearButton(0.5 * this.config.ANCHO, this.config.ALTURA - 60, 'boton-jugar', this.iniciarJuego, this)

    this.crearButton(this.config.ANCHO * 0.5, 120, 'volumen', this.ajustarVolumen, this)

    const color = {
        fondo: 0x03cde7,
        border: 0x1aaef1,
        relleno: 0xff0000
    }
    this.barraProgreso = new BarraProgreso(this, new Punto(105, 136), this.config.volumen, color)
}

Configure.prototype.crearButton = function(x, y, name, callback, context) {
    const boton = this.add.button(x, y, name, callback, context)
    boton.anchor.set(1 / 2)
    boton.input.useHandCursor = true
}

Configure.prototype.ajustarVolumen = function () {
    let siguienteVol = this.barraProgreso.getVol() + 10
    this.barraProgreso.setVol(siguienteVol)  
    if (siguienteVol > 100) {
        siguienteVol = 0
        this.barraProgreso.setVol(siguienteVol)  
    }
    
    this.config.musicaFondo.volume = siguienteVol / 100
    this.config.volumen = siguienteVol
}

Configure.prototype.iniciarJuego = function () {
    this.game.state.start('Game')
}