/*Autor: Víctor Martínez*/

export default function ParejaLinea(l1, l2) {
    this.l1 = l1
    this.l2 = l2
}

ParejaLinea.prototype = Object.create(ParejaLinea.prototype)
ParejaLinea.prototype.constructor = ParejaLinea

ParejaLinea.prototype.getEsta = function () {
    return this.l1
}

ParejaLinea.prototype.getEsa = function () {
    return this.l2
}

ParejaLinea.prototype.toNumber = function () {
    return this.l1.toNumber() + this.l2.toNumber()
}

ParejaLinea.prototype.intersecta = function () {
    const puntos = this.l1.toPuntosAbstracto()
    for (let p1 of puntos) {
        for (let p2 of this.l2.toPuntosAbstracto()) {
            if (p1.toString() === p2.toString()) {
                return true
            }
        }
    }
    return false
}

ParejaLinea.prototype.getCeldaIntercepto = function () {
    for (let p1 of this.l1.toPuntosAbstracto()) {
        for (let p2 of this.l2.toPuntosAbstracto()) {
            if (p1.toString() === p2.toString()) {
                return this.l1.celdaFrom(p1)
            }
        }
    }
    throw new Error('No hay intercepto')
}