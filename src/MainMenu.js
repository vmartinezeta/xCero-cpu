/*Autor: Víctor Martínez*/

export default function MainMenu(config) {
    this.sonidos = []
    this.config = config
}

MainMenu.prototype.create = function () {
    this.add.sprite(0, 0, 'menu-principal')
    this.botonJugar = this.add.button(this.config.ANCHO * 0.5 - 53, this.config.ALTURA * 0.5, 'boton-jugar', this.iniciarJuego, this)
    this.botonJugar.anchor.set(0.5)
    this.botonJugar.input.useHandCursor = true

    this.botonOpciones = this.add.button(this.config.ANCHO * 0.5 + 53, this.config.ALTURA * 0.5, 'boton-opciones', this.configurar, this)
    this.botonOpciones.anchor.set(0.5)
    this.botonOpciones.input.useHandCursor = true

    if (!this.config.musicaFondo) {
        this.config.musicaFondo = this.add.audio('musica-fondo')
        this.sonidos = [this.config.musicaFondo]
        this.sound.setDecodedCallback(this.sonidos, this.iniciarMusica, this)
    }
}

MainMenu.prototype.iniciarMusica = function () {
    this.sonidos.shift()
    this.config.musicaFondo.loopFull(this.config.volumen/100)
}

MainMenu.prototype.iniciarJuego = function () {
    this.game.state.start('Game')
}

MainMenu.prototype.configurar = function () {
    this.game.state.start('Configure')
}