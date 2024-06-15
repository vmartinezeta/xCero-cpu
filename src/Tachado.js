/*Autor: Víctor Martínez*/

import ClaseList from "./ClaseList.js"
import Punto from "./Punto.js"

export default function Tachado(game, linea) {
    const p1 = linea.getC1().getUbicacion().getPuntoConcreto()
    const p2 = linea.getC3().getUbicacion().getPuntoConcreto()
    const origen = new Punto(0, 0)

    const orientaciones = ClaseList.fromRango(9, 10).map(c => c.toString())

    if (orientaciones.includes(linea.getClaseLinea().toString())) {
        origen.setX((p1.getX() + p2.getX()) / 2)
        origen.setY((p1.getY() + p2.getY()) / 2)
    } else if (linea.getClaseLinea().toString() === ClaseList.fromNombre('horizontal').toString()) {
        origen.setX((p1.getX() + p2.getX()) / 2)
        origen.setY(p1.getY())
    } else if (linea.getClaseLinea().toString() === ClaseList.fromNombre('vertical').toString()) {
        origen.setX(p1.getX())
        origen.setY((p1.getY() + p2.getY()) / 2)
    }

    const nombre = orientaciones.includes(linea.getClaseLinea().toString()) ? 'linea-2' : 'linea-1'
    Phaser.Sprite.call(this, game, origen.getX(), origen.getY(), nombre)
    this.anchor.set(0.5)

    const angulo = Phaser.Math.angleBetweenPoints(p1, p2)

    orientaciones.push(ClaseList.fromNombre('vertical').toString())
    if (orientaciones.includes(linea.getClaseLinea().toString())) {
        this.angle = Phaser.Math.radToDeg(angulo)
    }
    game.add.existing(this)
}

Tachado.prototype = Object.create(Phaser.Sprite.prototype)
Tachado.prototype.constructor = Tachado