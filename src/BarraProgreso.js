/*Autor: Víctor Martínez*/
import Punto from "./Punto.js"


export default function BarraProgreso(game, origen, vol, color) {
    Phaser.Group.call(this, game)
    this.game = game
    this.vol = vol
    this.origen = origen
    this.render = false
    this.color = color
    this.items = []

    const grafico = game.add.graphics(origen.getX(), origen.getY())
    grafico.beginFill(color.fondo)
    grafico.lineStyle(2, color.border, 1)
    grafico.moveTo(0, 0)
    grafico.lineTo(100, 0)
    grafico.lineTo(100, 6)
    grafico.lineTo(0, 6)
    grafico.lineTo(0, 0)
    grafico.endFill()
    this.add(grafico)

    this.llenar()
}

BarraProgreso.prototype = Object.create(Phaser.Group.prototype)
BarraProgreso.prototype.constructor = BarraProgreso


BarraProgreso.prototype.dibujarRelleno = function (colorFondo, origen) {
    const grafico = this.game.add.graphics(origen.getX(), origen.getY());
    grafico.beginFill(colorFondo)
    grafico.moveTo(0, 0)
    grafico.lineTo(10, 0)
    grafico.lineTo(10, 6)
    grafico.lineTo(0, 6)
    grafico.lineTo(0, 0)
    grafico.endFill()
    this.add(grafico)
    this.items.push(grafico)
}

BarraProgreso.prototype.llenar = function () {
    if (this.vol % 10 !== 0) {
        throw new TypeError("ConfigxCero.volumen, invalido el valor")
    }
    let xmax = this.origen.getX() + this.vol
    let x = this.origen.getX()
    while (x < xmax) {
        this.dibujarRelleno(this.color.relleno, new Punto(x, this.origen.getY()))
        x += 10
    }
}

BarraProgreso.prototype.vaciar = function () {
    for (let g of this.items) {
        this.remove(g)
    }
}

BarraProgreso.prototype.setVol = function (vol) {
    if (vol === 0) {
        this.vaciar()
    }
    if (this.vol !== vol) {
        this.vol = vol
        this.render = true
    }
}

BarraProgreso.prototype.getVol = function () {
    return this.vol
}

BarraProgreso.prototype.update = function () {
    if (this.render) {
        this.llenar()
        this.render = false
    }
}