/*Autor: Víctor Martínez*/

import Punto from "../classes/Punto.js"

export default function Tachado(game, linea) {
    const [p1, p2] = linea.getPuntosExtremo()
    const origen = new Punto(0, 0)

    if (linea.isDiagonal()) {
        origen.setX((p1.getX() + p2.getX()) / 2)
        origen.setY((p1.getY() + p2.getY()) / 2)
    } else if (linea.isHorizontal()) {
        origen.setX((p1.getX() + p2.getX()) / 2)
        origen.setY(p1.getY())
    } else if (linea.isVertical()) {
        origen.setX(p1.getX())
        origen.setY((p1.getY() + p2.getY()) / 2)
    }

    const nombre = linea.isDiagonal() ? 'linea-2' : 'linea-1'
    Phaser.Sprite.call(this, game, origen.getX(), origen.getY(), nombre)
    this.anchor.set(0.5)

    const angulo = Phaser.Math.angleBetweenPoints(p1, p2)

    if (linea.isDiagonal() || linea.isVertical()) {
        this.angle = Phaser.Math.radToDeg(angulo)
    }
    game.add.existing(this)
}

Tachado.prototype = Object.create(Phaser.Sprite.prototype)
Tachado.prototype.constructor = Tachado