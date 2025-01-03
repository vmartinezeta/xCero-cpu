/*Autor: Víctor Martínez*/

export default function SelectorFicha(game, config, selector, predeterminada, opciones, origen) {
    Phaser.Group.call(this, game)
    this.config = config
    this.origen = origen
    this.selector = selector
    this.tipoFicha = predeterminada
    this.opciones = opciones
    this.indice = opciones.findIndex(claseFicha => claseFicha.id === predeterminada.id)
    this.botones = []

    this.setAll('anchor.set', 1 / 2)

    this.crearButton(origen.getX() - 103, origen.getY(), 'boton-atras', false, this.elegirFicha, this)

    this.seleccion = this.create(origen.getX(), origen.getY(), this.tipoFicha.getNombre())

    this.crearButton(origen.getX() + 103, origen.getY(), "boton-siguiente", true, this.elegirFicha, this)

    if (this.indice === this.opciones.length - 1) {
        this.toggleActivo()
    }
}

SelectorFicha.prototype = Object.create(Phaser.Group.prototype)
SelectorFicha.prototype.constructor = SelectorFicha

SelectorFicha.prototype.crearButton = function (x, y, name, isActive, callback, context) {
    const boton = this.create(x, y, name)
    boton.inputEnabled = isActive
    boton.events.onInputUp.add(callback, context)
    this.botones.push(boton)
}

SelectorFicha.prototype.elegirFicha = function () {
    if (this.indice < this.opciones.length - 1) {
        this.indice++
        if (this.indice === this.opciones.length - 1) {
            this.toggleActivo()
        }
    } else if (this.indice > 0) {
        this.indice--
        if (this.indice === 0) {
            this.toggleActivo()
        }
    }

    this.tipoFicha = this.opciones[this.indice]
    this.selector.call(this.config, this.tipoFicha)

    this.seleccion.destroy()
    this.seleccion = this.create(this.origen.getX(), this.origen.getY(), this.tipoFicha.getNombre())
}

SelectorFicha.prototype.toggleActivo = function () {
    const [izq, der] = this.botones
    izq.inputEnabled = !izq.inputEnabled
    der.inputEnabled = !der.inputEnabled
}