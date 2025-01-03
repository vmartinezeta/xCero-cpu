import Bien from "./Bien.js"
import CeldaStrategy from "./CeldaStrategy.js"
import { UpdaterCellMixin } from "../mixins/UpdaterCellMixin.js"

export default class NeutralizarStrategy extends CeldaStrategy{
    constructor(cuadricula, fichaCpu, fichaJugador) {
        super()
        this.cuadricula =cuadricula 
        this.fichaCpu = fichaCpu
        this.fichaJugador = fichaJugador
    }

    updateCelda() {
        const bienes = this.cuadricula.toLineas().map(l => new Bien(l, this.fichaCpu, this.fichaJugador))
        const bien = bienes.find(b => b.puedeGanarJugador())
        const l = bien.linea
        this.celda = l.getCeldaEspacio()
        this.update()
    }
}

Object.assign(NeutralizarStrategy.prototype, UpdaterCellMixin)