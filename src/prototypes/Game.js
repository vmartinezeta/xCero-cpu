/*Autor: Víctor Martínez*/

import ClaseList from "../ClaseList.js"
import Cuadricula from "../classes/Cuadricula.js"
import Notificacion from "./Notificacion.js"
import Punto from "../classes/Punto.js"
import Tablero from "./Tablero.js"
import Tachado from "./Tachado.js"
import MiniCPU from "../classes/MiniCPU.js"
import { Loading } from "./Loading.js"

const EstadoBoton = {
    BORRAR_ACTIVO: "boton-espacio",
    BORRAR_INACTIVO: "boton-espacio-inactivo",
    FICHA_0_ACTIVO: 'boton-0',
    FICHA_0_INACTIVO: 'boton-0-inactivo',
    FICHA_X_ACTIVO: "boton-x",
    FICHA_X_INACTIVO: "boton-x-inactivo"
}


export default function Game(config) {
    this.config = config
    this.cuadricula = null
    this.tablero = null
    this.fichaEnJuego = null
    this.botonFichaEspacio = null
    this.botonFichaEnJuego = null
    this.celdaEnJuego = null
    this.miniCPU = null
    this.animacion = null
}

Game.prototype = Object.create(Game.prototype)
Game.prototype.constructor = Game

Game.prototype.create = function () {
    this.add.sprite(0, 0, 'tablero')

    this.botonFichaEnJuego = this.add.button(this.config.ANCHO * 0.5 - 55, 442, 'boton-x', this.finColocacionJugador, this)
    this.botonFichaEnJuego.anchor.set(0.5)

    this.botonFichaEspacio = this.add.button(this.config.ANCHO * 0.5 + 55, 442, 'boton-espacio', this.cancelarColocacionJugador, this)
    this.botonFichaEspacio.anchor.set(0.5)

    this.fichaEnJuego = this.config.getFichaCpu()
    this.cuadricula = new Cuadricula()
    this.miniCPU = new MiniCPU(this.cuadricula, this.config)
    this.colocarFichaCpu()
    this.inhabilitarBotones()
}

Game.prototype.reset = function () {
    this.x = 0.5 * this.config.ANCHO - 30
    this.animacion.removeAll()
    this.items = []
}

Game.prototype.redibujarTablero = function () {
    if (this.tablero !== null) {
        this.tablero.destroy()
    }
    this.tablero = new Tablero(this, this.cuadricula)
    this.tablero.inputEnableChildren = true
    this.tablero.onChildInputUp.add(this.iniciaColocacionJugador, this)
}

Game.prototype.colocarFichaCpu = function () {
    this.animacion = new Loading(this, new Punto(0.5*this.config.ANCHO, 75))
    this.miniCPU.colocarFicha()

    if (this.miniCPU.finalizoJuego()) {
        this.redibujarTablero()
        this.notificarResultado()
        return
    }

    if (this.tablero === null) {
        this.habilitarTurnoJugador()
    } else {
        this.time.events.add(2e3, this.habilitarTurnoJugador, this)
    }
}

Game.prototype.iniciaColocacionJugador = function (imagen) {
    this.celdaEnJuego = imagen.toCelda()
    this.celdaEnJuego.setClaseFicha(ClaseList.fromNombre('ficha-espacio-activo'))
    this.cuadricula.setCelda(this.celdaEnJuego)
    this.redibujarTablero()
    this.habilitarBotones()
}

Game.prototype.finColocacionJugador = function () {
    this.celdaEnJuego.setClaseFicha(this.fichaEnJuego)
    this.cuadricula.setCelda(this.celdaEnJuego)
    this.redibujarTablero()
    this.cambiarTurno()
    this.inhabilitarBotones()

    if (this.miniCPU.finalizoJuego()) {
        this.notificarResultado()
        return
    }

    this.colocarFichaCpu()
}

Game.prototype.cancelarColocacionJugador = function () {
    this.inhabilitarBotones()
    this.celdaEnJuego.setClaseFicha(ClaseList.fromNombre('ficha-espacio'))
    this.cuadricula.setCelda(this.celdaEnJuego)
    this.redibujarTablero()
    this.tablero.habilitarEspaciosDisponible()
}

Game.prototype.habilitarTurnoJugador = function () {
    this.animacion.stop()
    this.reset()

    this.redibujarTablero()
    this.tablero.habilitarEspaciosDisponible()
    this.cambiarTurno()
    this.inhabilitarBotones()
}

Game.prototype.inhabilitarBotones = function () {
    this.botonFichaEnJuego.inputEnabled = false
    this.botonFichaEspacio.inputEnabled = false

    let estadoFicha = EstadoBoton.FICHA_X_INACTIVO
    if (this.fichaEnJuego.isFichaCero()) {
        estadoFicha = EstadoBoton.FICHA_0_INACTIVO
    }
    this.botonFichaEnJuego.loadTexture(estadoFicha)
    this.botonFichaEspacio.loadTexture(EstadoBoton.BORRAR_INACTIVO)
}

Game.prototype.habilitarBotones = function () {
    this.botonFichaEnJuego.inputEnabled = true
    this.botonFichaEspacio.inputEnabled = true
    let estadoFicha = EstadoBoton.FICHA_X_ACTIVO
    if (this.fichaEnJuego.isFichaCero()) {
        estadoFicha = EstadoBoton.FICHA_0_ACTIVO
    }
    this.botonFichaEnJuego.loadTexture(estadoFicha)
    this.botonFichaEspacio.loadTexture(EstadoBoton.BORRAR_ACTIVO)
}

Game.prototype.cambiarTurno = function () {
    if (this.fichaEnJuego.isFichaX()) {
        this.fichaEnJuego = ClaseList.fromNombre('ficha-0')
    } else {
        this.fichaEnJuego = ClaseList.fromNombre('ficha-x')
    }
}

Game.prototype.notificarResultado = function () {
    if (this.miniCPU.hayGanador()) {
        const linea = this.miniCPU.getLineaGanador()
        new Tachado(this, linea)
    }
    const centro = new Punto(0.5 * this.config.ANCHO, 0.5 * this.config.ALTURA)
    new Notificacion(this, this.miniCPU, centro)
    this.time.events.add(6e3, this.cerrarJuego, this)
    this.animacion.stop()
}

Game.prototype.cerrarJuego = function () {
    this.cuadricula = new Cuadricula()
    this.miniCPU = new MiniCPU(this.cuadricula, this.config)
    this.fichaEnJuego = this.config.getFichaCpu()
    this.tablero = null
    this.celdaEnJuego = null
    this.game.state.start('MainMenu')
}