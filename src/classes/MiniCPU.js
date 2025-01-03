/*Autor: Víctor Martínez*/

import Bien from "./Bien.js"
import EsquinaStrategy from "./EsquinaStrategy.js"
import CentroStrategy from "./CentroStrategy.js"
import CeldaStrategy from "./CeldaStrategy.js"
import PuntoArranqueStrategy from "./PuntoArranqueStrategy.js"
import GanadorStrategy from "./GanadorStrategy.js"
import NeutralizarStrategy from "./NeutralizarStrategy.js"
import ResponderRandomStrategy from "./ResponderRandomStrategy.js"


export default class MiniCPU {
    constructor(cuadricula, configXcero) {
        this.cuadricula = cuadricula
        this.fichaJugador = configXcero.getFichaJugador()
        this.fichaCpu = configXcero.getFichaCpu()
        this.dificultad = configXcero.getDificultad()
        this.strategy =  null
    }

    colocarFicha() {
        if (!this.hayEspacioDisponible()) {
            return
        }

        if (this.debeColocarPuntoArranque()) {
            this.setStrategy(new PuntoArranqueStrategy(this.cuadricula, this.fichaCpu, this.dificultad))
        } else if (this.puedeGanar()) {
            this.setStrategy(new GanadorStrategy(this.cuadricula, this.fichaCpu))
        } else if (this.puedeNeutralizar()) {
            this.setStrategy(new NeutralizarStrategy(this.cuadricula, this.fichaCpu, this.fichaJugador))
        } else if (this.puedeResponderFormaRandom()) {
            this.setStrategy(new ResponderRandomStrategy(this.cuadricula, this.fichaCpu))
        } else if (this.dificultad.isEscalaNormal()) {
            if (this.strategy instanceof CeldaStrategy || this.strategy.fueDescubierta()) {
                this.setStrategy(new EsquinaStrategy(this.cuadricula, this.fichaCpu, this.fichaJugador))
            }
        } else if(this.dificultad.isEscalaFacil()) {
            if (this.strategy instanceof CeldaStrategy || this.strategy.fueDescubierta()) {
                this.setStrategy(new CentroStrategy(this.cuadricula, this.fichaCpu, this.fichaJugador))
            }
        }
        this.aplicarEstrategia()
    }

    setStrategy(strategy){
        this.strategy = strategy
    }

    hayEspacioDisponible() {
        return this.cuadricula.tieneEspacioDisponible()
    }

    finalizoJuego() {
        return this.hayGanador() || this.hayEmpate()
    }

    hayGanador() {
        const lineas = this.cuadricula.toLineas()
        for (const l of lineas) {
            if (l.hayGanador()) return true
        }
        return false
    }

    falloJugador () {
        try {
            const l = this.getLineaGanador()
            return l.contieneTodas(this.fichaCpu)
        } catch (error) {
            return false
        }
    }

    ganoJugador () {
        try {
            const l = this.getLineaGanador()
            return l.contieneTodas(this.fichaJugador)
        } catch (error) {
            return false
        }
    }

    getLineaGanador() {
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

    puedeNeutralizar () {
        const bienes = this.cuadricula.toLineas()
        .map(l => new Bien(l, this.fichaCpu, this.fichaJugador))
        .filter(b=>b.isFichaJugador())
        for (const b of bienes) {
            if (b.puedeGanarJugador()) return true
        }
        return false
    }

    puedeGanar() {
        const bienes = this.cuadricula.toLineas()
        .map(l => new Bien(l, this.fichaCpu, this.fichaJugador))
        .filter(b=>b.isFichaCpu())
        for (const b of bienes) {
            if (b.puedeGanarCpu()) return true
        }
        return false
    }

    hayEmpate () {
        return !this.hayEspacioDisponible() && !this.hayGanador()
    }

    debeHacerEstrategia () {
        return !this.debeColocarPuntoArranque()
            && !this.puedeGanar()
            && !this.puedeNeutralizar()
            && !this.puedeResponderFormaRandom()
    }

    debeColocarPuntoArranque () {
        return this.cuadricula.estaIntacta()
    }

    aplicarEstrategia() {
        if (this.strategy && this.strategy instanceof CeldaStrategy) {
            this.strategy.updateCelda()
        }
    }

    puedeResponderFormaRandom () {
        const espacios = this.cuadricula.getPuntosEspacio()
        return espacios.length <= 3 && !this.formaLineaRecta(espacios)
    }

    formaLineaRecta (puntos) {
        if (puntos.length < 3) {
            return false
        }

        for (const l of this.cuadricula.toLineas()) {
            if (l.contieneTodos(puntos)) return true
        }
        return false
    }
}