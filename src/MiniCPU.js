/*Autor: Víctor Martínez*/

import ClaseList from "./ClaseList.js"
import Punto from "./Punto.js"
import PuntoArranque from "./PuntoArranque.js"
import Bien from "./Bien.js"
import EsquinaStrategy from "./EsquinaStrategy.js"
import CentroStrategy from "./CentroStrategy.js"
import CeldaStrategy from "./CeldaStrategy.js"

const PuntoArranqueController = {
    lista: [
        new PuntoArranque(new Punto(0, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 0), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 2), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(2, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(0, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(0, 2), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 2), ClaseList.fromNombre('nivel-medio'))
    ],
    fromNivel: function (nivel) {
        return this.lista.filter(function (puntoArranque) {
            return puntoArranque.getNivel().id === nivel.id
        })
    }
}

export default function MiniCPU(cuadricula, fichaCpu, fichaJugador, fichaEspacio, dificultad) {
    this.cuadricula = cuadricula
    this.fichaCpu = fichaCpu
    this.fichaJugador = fichaJugador
    this.fichaEspacio = fichaEspacio
    this.dificultad = dificultad
    this.strategy =  null
}

MiniCPU.prototype = Object.create(MiniCPU.prototype)
MiniCPU.prototype.constructor = MiniCPU

MiniCPU.prototype.colocarFicha = function () {
    if (!this.hayEspacioDisponible()) {
        return
    }

    if (this.debeColocarPuntoArranque()) {
        this.colocarPuntoArranque()
    } else if (this.puedeGanar()) {
        this.colocarPuntoGanador()
    } else if (this.puedeNeutralizar()) {
        this.colocarPuntoNeutro()
    } else if (this.puedeResponderFormaRandom()) {
        this.colocarPuntoRandom()
    } else if (this.debeHacerEstrategia()) {
        let strategy = null
        if (this.dificultad.isEscalaDificil()) {
        } else if (this.dificultad.isEscalaNormal()) {
            strategy = new EsquinaStrategy(this.cuadricula, this.fichaCpu, this.fichaJugador)
        } else if (this.dificultad.isEscalaFacil()) {
            strategy = new CentroStrategy()
        }
        this.colocarPuntoEstrategico(strategy)
    }
}

MiniCPU.prototype.hayEspacioDisponible = function () {
    return this.cuadricula.tieneEspacioDisponible()
}

MiniCPU.prototype.finalizoJuego = function () {
    return this.hayGanador() || this.hayEmpate()
}

MiniCPU.prototype.hayGanador = function () {
    const lineas = this.cuadricula.toLineas()
    for (const l of lineas) {
        if (l.hayGanador()) return true
    }
    return false
}

MiniCPU.prototype.falloJugador = function () {
    try {
        const l = this.getLineaGanador()
        return l.contieneTodas(this.fichaCpu)
    } catch (error) {
        return false
    }
}

MiniCPU.prototype.ganoJugador = function () {
    try {
        const l = this.getLineaGanador()
        return l.contieneTodas(this.fichaJugador)
    } catch (error) {
        return false
    }
}

MiniCPU.prototype.getLineaGanador = function () {
    if (!this.hayGanador()) {
        throw new Error('MiniCPU.prototype.getLineaGanador().No hay ganador')
    }
    const lineas = this.cuadricula.toLineas()
    for (const l of lineas) {
        if (l.hayGanador()) {
            return l
        }
    }
}

MiniCPU.prototype.puedeNeutralizar = function () {
    for (const l of this.cuadricula.toLineas()) {
        const bien = new Bien(l, this.fichaCpu, this.fichaJugador)
        if (bien.estaNeutro()) return true
    }
    return false
}

MiniCPU.prototype.colocarPuntoNeutro = function () { 
    const bienes = this.cuadricula.toLineas().map(l => new Bien(l, this.fichaCpu, this.fichaJugador))
    const bien = bienes.find(b => b.estaNeutro())
    const l = bien.linea
    const celda = l.getCeldaEspacio()
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.puedeGanar = function () {
    for (const l of this.cuadricula.toLineas()) {
        const bien = new Bien(l, this.fichaCpu, this.fichaJugador)
        if (bien.puedeGanarCpu()) return true
    }
    return false
}

MiniCPU.prototype.colocarPuntoGanador = function () {
    const lineas = this.cuadricula.toLineas()
    let linea = lineas.find(l => l.puedeGanar())
    const celda = linea.getCeldaEspacio()
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.hayEmpate = function () {
    return !this.hayEspacioDisponible() && !this.hayGanador()
}

MiniCPU.prototype.debeHacerEstrategia = function () {
    return !this.debeColocarPuntoArranque()
        && !this.puedeGanar()
        && !this.puedeNeutralizar()
        && !this.puedeResponderFormaRandom()
}

MiniCPU.prototype.debeColocarPuntoArranque = function () {
    return this.cuadricula.estaIntacta()
}

MiniCPU.prototype.colocarPuntoArranque = function () {
    const puntosArranque = PuntoArranqueController.fromNivel(this.dificultad)
    const puntos = puntosArranque.map(pa => pa.getPunto())
    const n = Math.floor(Math.random() * puntos.length)
    const punto = puntos[n]
    const celda = this.cuadricula.fromPunto(punto)
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.colocarPuntoEstrategico = function (strategy) {
    if (!(strategy instanceof CeldaStrategy)) {
        throw new TypeError("No es una estrategia valida")
    }
    strategy.updateCelda()
}

MiniCPU.prototype.puedeResponderFormaRandom = function () {
    const espacios = this.cuadricula.getPuntosEspacio()
    return espacios.length <= 3 && !this.formaLineaRecta(espacios)
}

MiniCPU.prototype.formaLineaRecta = function (puntos) {
    if (puntos.length < 3) {
        return false
    }

    for (const l of this.cuadricula.toLineas()) {
        if (l.contieneTodos(puntos)) return true
    }
    return false
}

MiniCPU.prototype.colocarPuntoRandom = function () {
    const espacios = this.cuadricula.getPuntosEspacio()
    const idx = Math.floor(Math.random() * espacios.length)
    const punto = espacios.at(idx)
    const celda = this.cuadricula.fromPunto(punto)
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}