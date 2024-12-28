/*Autor: Víctor Martínez*/

import { ComparisonPoints } from "./ComparisonPoints.js"

export default function ParejaLinea(l1, l2) {
    this.l1 = l1
    this.l2 = l2
    this.comparison = new ComparisonPoints(l1.toPuntosAbstracto(),l2.toPuntosAbstracto())
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
    return this.comparison.hasIntercepto()
}

ParejaLinea.prototype.getCeldaIntercepto = function () {
    if (!this.comparison.hasIntercepto()) {
        throw new TypeError("Error")
    }
    const [punto] = this.comparison.intersection()
    return this.l1.celdaFrom(punto)
}