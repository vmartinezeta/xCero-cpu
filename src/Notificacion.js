/*Autor: Víctor Martínez*/

import EstadoMensaje from "./EstadoMensaje.js"

export default function Notificacion(game, observador, origen) {
    const estado = new EstadoMensaje(observador)
    const sonido = game.add.audio(estado.sonido)
    sonido.play()
    const { x, y } = origen
    Phaser.Sprite.call(this, game, x, y, estado.titulo)
    this.anchor.set(0.5)
    game.add.existing(this)
}

Notificacion.prototype = Object.create(Phaser.Sprite.prototype)
Notificacion.prototype.constructor = Notificacion