/*Autor: Víctor Martínez*/

export default function Tablero(game, cuadricula) {
    Phaser.Group.call(this, game)
    this.cuadricula = cuadricula
    for (let celda of cuadricula.toArrayCelda()) {
        const ficha = celda.getClaseFicha()
        const ubicacion = celda.getUbicacion()
        const puntoAbstracto = ubicacion.getPuntoAbstracto()
        const { x, y } = ubicacion.getPuntoConcreto()

        const imagen = this.create(x, y, ficha.getNombre())
        imagen.key = puntoAbstracto.toString()
        imagen.toCelda = function () {
            return celda
        }
        imagen.inputEnabled = false
        imagen.anchor.set(0.5)
    }
}

Tablero.prototype = Object.create(Phaser.Group.prototype)
Tablero.prototype.constructor = Tablero

Tablero.prototype.habilitarEspaciosDisponible = function () {
    const puntos = this.cuadricula.getPuntosEspacio()
    for (let punto of puntos) {
        const imagen = this.iterate('key', punto.toString(), Phaser.Group.RETURN_CHILD)
        imagen.inputEnabled = true
    }
}