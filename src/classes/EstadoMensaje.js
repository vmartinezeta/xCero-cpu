/*Autor: Víctor Martínez*/

export default class EstadoMensaje {
    constructor(observador) {
        if (observador.ganoJugador()) {
            return this.ganoJugador()
        } else if (observador.falloJugador()) {
            return this.falloJugador()
        } else if (observador.hayEmpate()) {
            return this.empate()
        }
    }

    ganoJugador() {
        this.sonido = 'ganador'
        this.titulo = 'rotulo-ganador'
    }

    falloJugador() {
        this.sonido = 'perdedor'
        this.titulo = 'rotulo-perdedor'
    }

    empate() {
        this.sonido = 'empate'
        this.titulo = 'rotulo-empate'
    }
}