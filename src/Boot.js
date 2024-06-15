/*Autor: Víctor Martínez*/

export default function Boot(game) {}

Boot.prototype.preload = function () {}

Boot.prototype.create = function () {
    this.input.maxPointers = 1
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.state.start('Preloader')
}