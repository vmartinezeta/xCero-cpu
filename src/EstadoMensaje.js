/*Autor: Víctor Martínez*/

export default function EstadoMensaje(observador) {
    if (observador.ganoJugador()) {
        this.ganoJugador()
    } else if (observador.falloJugador()) {
        this.falloJugador()
    } else if (observador.hayEmpate()) {
        this.empate()
    }

    throw new TypeError("No se puede dar un estado")
}

EstadoMensaje.prototype = Object.create(EstadoMensaje.prototype)
EstadoMensaje.prototype.constructor = EstadoMensaje

EstadoMensaje.prototype.ganoJugador = function () {
    this.sonido = 'ganador',
    this.titulo = 'rotulo-ganador'
    return this
}

EstadoMensaje.prototype.falloJugador = function () {
    this.sonido = 'perdedor'
    this.titulo = 'rotulo-perdedor'
    return this
}

EstadoMensaje.prototype.empate = function () {
    this.sonido = 'empate'
    this.titulo = 'rotulo-empate'
    return this
}