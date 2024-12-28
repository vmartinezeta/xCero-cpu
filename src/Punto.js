/*Autor: Víctor Martínez*/

export default function Punto(x, y) {
    if (arguments.length === 1 && typeof x === "string") {
        const vector = x.split(",")
        this.x = vector[0]
        this.y = vector[1]
    } else {
        this.x = x
        this.y = y
    }
}

Punto.prototype = Object.create(Punto.prototype)
Punto.prototype.constructor = Punto

Punto.prototype.toString = function () {
    return `${this.x},${this.y}`
}

Punto.prototype.setX = function (x) {
    this.x = x
}

Punto.prototype.getX = function () {
    return this.x
}

Punto.prototype.setY = function (y) {
    this.y = y
}

Punto.prototype.getY = function () {
    return this.y
}

Punto.prototype.newInstance = function () {
    return new Punto(this.x, this.y)
}