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
    
    for (const celda of this.linea.toArrayCelda()) {
        const clase = celda.getClaseFicha()
        if (clase.toString() === this.fichaCpu.toString()) {
            contador.cpu++
        } else if (clase.toString() === this.fichaJugador.toString()) {
            contador.jugador++
        } else if (clase.toString() === this.fichaEspacio.toString()) {
            contador.espacio++
        }
    }

    const { cpu, jugador, espacio } = contador

    if ((cpu > jugador && cpu > espacio)
        || (espacio > jugador && espacio > cpu && cpu > jugador)) {
        return this.fichaCpu
    } else if ((jugador > cpu && jugador > espacio)
        || (espacio > jugador && espacio > cpu && jugador > cpu)) {
        return this.fichaJugador
    } else if (espacio > jugador && espacio > cpu) {
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

