/*Autor: Víctor Martínez*/

export default class Punto{
    constructor(x, y) {
        if (arguments.length === 1 && typeof x === "string") {
            const vector = x.split(",")
            this.x = vector[0]
            this.y = vector[1]
        } else {
            this.x = x
            this.y = y
        }
    }

    toString () {
        return `${this.x},${this.y}`
    }

    setX (x) {
        this.x = x
    }

    getX () {
        return this.x
    }

    setY (y) {
        this.y = y
    }

    getY () {
        return this.y
    }

    newInstance () {
        return new Punto(this.x, this.y)
    }
}