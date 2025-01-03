import CeldaStrategy from "./CeldaStrategy.js"
import { PuntoArranqueList } from "../PuntoArranqueList.js"
import { UpdaterCellMixin } from "../mixins/UpdaterCellMixin.js"

export default class PuntoArranqueStrategy extends CeldaStrategy{
    constructor(cuadricula, fichaCpu, dificultad) {
        super()
        this.cuadricula = cuadricula
        this.fichaCpu = fichaCpu
        this.dificultad = dificultad
    }

    updateCelda() {
        const puntosArranque = PuntoArranqueList.fromNivel(this.dificultad)
        const puntos = puntosArranque.map(pa => pa.getPunto())
        const idx = Math.floor(Math.random() * puntos.length)
        const punto = puntos.at(idx)
        this.celda = this.cuadricula.fromPunto(punto)
        this.update()
    }
}

Object.assign(PuntoArranqueStrategy.prototype, UpdaterCellMixin)