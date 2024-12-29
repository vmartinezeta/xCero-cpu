/*Autor: Víctor Martínez*/

export default function Bien(linea, fichaCpu, fichaJugador, fichaEspacio) {
    this.linea = linea
    this.fichaCpu = fichaCpu
    this.fichaJugador = fichaJugador
    this.fichaEspacio = fichaEspacio
}

Bien.prototype = Object.create(Bien.prototype)
Bien.prototype.constructor = Bien

Bien.prototype.getLinea = function () {
    return this.linea
}

Bien.prototype.getPropietario = function () {
    const contador = { cpu: 0, jugador: 0, espacio: 0 }
    
    for (const celda of this.linea.getCeldas()) {
        const clase = celda.getClaseFicha()
        if (clase.id === this.fichaCpu.id) {
            contador.cpu++
        } else if (clase.id === this.fichaJugador.id) {
            contador.jugador++
        } else if (clase.id === this.fichaEspacio.id) {
            contador.espacio++
        }
    }

    const { cpu, jugador, espacio } = contador

    if ((cpu === 1 && espacio === 2) || (cpu>=2 && espacio+jugador===0)) {
        return this.fichaCpu
    } else if ((jugador === 1 && espacio===2)|| (jugador>=2 && espacio+jugador===0)) {
        return this.fichaJugador
    } else if (espacio === 3 && cpu+jugador===0) {
        return this.fichaEspacio
    }
    return null
}

Bien.prototype.tienePropietario = function () {
    return this.getPropietario() !== null
}

Bien.prototype.isFichaCpu = function() {
    return this.tienePropietario() && this.getPropietario().id === this.fichaCpu.id
}

Bien.prototype.isFichaEspacio = function() {
    return this.tienePropietario() && this.getPropietario().id === this.fichaEspacio.id
}

Bien.prototype.estaNeutro = function () {
    return this.linea.toBit() === 2*this.fichaJugador.id+this.fichaEspacio.id
}