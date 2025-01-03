import CeldaStrategy from "./CeldaStrategy.js"
import { UpdaterCellMixin } from "../mixins/UpdaterCellMixin.js"

export default class GanadorStrategy extends CeldaStrategy{
    constructor(cuadricula, fichaCpu) {
        super()
        this.cuadricula = cuadricula
        this.fichaCpu = fichaCpu
    }

    updateCelda() {
        const lineas = this.cuadricula.toLineas()
        let linea = lineas.find(l => l.puedeGanar())
        this.celda = linea.getCeldaEspacio()
        this.update()
    }
}

Object.assign(GanadorStrategy.prototype, UpdaterCellMixin)