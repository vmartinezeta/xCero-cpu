/*Autor: Víctor Martínez*/

import ClaseList from "./ClaseList.js"
import Cuadricula from "./Cuadricula.js"
import Notificacion from "./Notificacion.js"
import Punto from "./Punto.js"
import Tablero from "./Tablero.js"
import Tachado from "./Tachado.js"
import MiniCPU from "./MiniCPU.js"

const EstadoBoton = {
    BORRAR_ACTIVO: "boton-espacio",
    BORRAR_INACTIVO: "boton-espacio-inactivo",
    FICHA_0_ACTIVO: 'boton-0',
    FICHA_0_INACTIVO: 'boton-0-inactivo',
    FICHA_X_ACTIVO: "boton-x",
    FICHA_X_INACTIVO: "boton-x-inactivo"
}


export default function Game(config) {
    this.cuadricula = null
    this.tablero = null
    this.fichaEnJuego = null
    this.botonFichaEspacio = null
    this.botonFichaEnJuego = null
    this.celdaElegidaJugador = null
    this.miniCPU = null
    this.config = config
    this.animacion = null
    this.x = 0.5 * config.ANCHO - 30 
    this.timer = 0
}

Game.prototype.create = function () {
    this.add.sprite(0, 0, 'tablero')

    this.botonFichaEnJuego = this.add.button(this.config.ANCHO * 0.5 - 55, 442, 'boton-x', this.finColocacionJugador, this)
    this.botonFichaEnJuego.anchor.set(0.5)

    this.botonFichaEspacio = this.add.button(this.config.ANCHO * 0.5 + 55, 442, 'boton-espacio', this.cancelarColocacionJugador, this)
    this.botonFichaEspacio.anchor.set(0.5)

    this.fichaEnJuego = this.config.getFichaCpu()
    this.cuadricula = new Cuadricula(this.config.getFichaCpu())
    this.miniCPU = new MiniCPU(this.cuadricula, this.config.getFichaCpu(), this.config.getClaseFicha(), this.config.getDificultad())

    this.animacion = this.add.group()
    

    this.colocarFichaCpu()
    this.inhabilitarBotones()
}

Game.prototype.draw = function () {
    const item = this.animacion.create(this.x, 80, 'punto')    
    item.anchor.set(1 / 2)
    this.x += 25
    if (this.animacion.countLiving() > 3) {
        this.reset()
    }
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
    this.timer = setInterval(this.draw.bind(this), 100);
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
    this.celdaElegidaJugador = imagen.toCelda()
    this.celdaElegidaJugador.setClaseFicha(ClaseList.fromNombre('ficha-espacio-activo'))
    this.cuadricula.setCelda(this.celdaElegidaJugador)
    this.redibujarTablero()
    this.habilitarBotones()
}

Game.prototype.finColocacionJugador = function () {
    this.celdaElegidaJugador.setClaseFicha(this.fichaEnJuego)
    this.cuadricula.setCelda(this.celdaElegidaJugador)
    this.redibujarTablero()
    this.intercambiarClaseFicha()
    this.inhabilitarBotones()

    if (this.miniCPU.finalizoJuego()) {
        this.notificarResultado()
        return
    }

    this.colocarFichaCpu()
}

Game.prototype.cancelarColocacionJugador = function () {
    this.inhabilitarBotones()
    this.celdaElegidaJugador.setClaseFicha(ClaseList.fromNombre('ficha-espacio'))
    this.cuadricula.setCelda(this.celdaElegidaJugador)
    this.redibujarTablero()
    this.tablero.habilitarEspaciosDisponible()
}

Game.prototype.habilitarTurnoJugador = function () {
    clearInterval(this.timer)
    this.reset()

    this.redibujarTablero()
    this.tablero.habilitarEspaciosDisponible()
    this.intercambiarClaseFicha()
    this.habilitarBotones()
}

Game.prototype.inhabilitarBotones = function () {
    this.botonFichaEnJuego.inputEnabled = false
    this.botonFichaEspacio.inputEnabled = false

    let estadoFicha = EstadoBoton.FICHA_X_INACTIVO
    if (this.fichaEnJuego.toString() === ClaseList.fromNombre('ficha-0').toString()) {
        estadoFicha = EstadoBoton.FICHA_0_INACTIVO
    }
    this.botonFichaEnJuego.loadTexture(estadoFicha)
    this.botonFichaEspacio.loadTexture(EstadoBoton.BORRAR_INACTIVO)
}

Game.prototype.habilitarBotones = function () {
    this.botonFichaEnJuego.inputEnabled = true
    this.botonFichaEspacio.inputEnabled = true
    let estadoFicha = EstadoBoton.FICHA_X_ACTIVO
    if (this.fichaEnJuego.toString() === ClaseList.fromNombre('ficha-0').toString()) {
        estadoFicha = EstadoBoton.FICHA_0_ACTIVO
    }
    this.botonFichaEnJuego.loadTexture(estadoFicha)
    this.botonFichaEspacio.loadTexture(EstadoBoton.BORRAR_ACTIVO)
}

Game.prototype.intercambiarClaseFicha = function () {
    if (this.fichaEnJuego.toString() === ClaseList.fromNombre('ficha-x').toString()) {
        this.fichaEnJuego = ClaseList.fromNombre('ficha-0')
    } else {
        this.fichaEnJuego = ClaseList.fromNombre('ficha-x')
    }
}

Game.prototype.notificarResultado = function () {
    if (this.miniCPU.hayGanador()) {
        const linea = this.miniCPU.getLineaGanador()
        new Tachado(this.game, linea)
    }
    const centro = new Punto(0.5 * this.config.ANCHO, 0.5 * this.config.ALTURA)
    new Notificacion(this, this.miniCPU, centro)
    this.time.events.add(6e3, this.cerrarJuego, this)
    clearInterval(this.timer)
}

Game.prototype.cerrarJuego = function () {
    this.cuadricula = new Cuadricula(this.config.getFichaCpu())
    this.miniCPU = new MiniCPU(this.cuadricula, this.config.getFichaCpu(), this.config.getClaseFicha(), this.config.getDificultad())
    this.fichaEnJuego = this.config.getFichaCpu()
    this.tablero = null
    this.celdaElegidaJugador = null
    this.game.state.start('MainMenu')
}