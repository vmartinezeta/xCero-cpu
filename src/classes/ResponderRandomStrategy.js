import CeldaStrategy from "./CeldaStrategy.js"
import { UpdaterCellMixin } from "../mixins/UpdaterCellMixin.js"

export default class ResponderRandomStrategy extends CeldaStrategy{
    constructor(cuadricula, fichaCpu) {
        super()
        this.cuadricula = cuadricula
        this.fichaCpu = fichaCpu
    }

    updateCelda() {
        const espacios = this.cuadricula.getPuntosEspacio()
        const idx = Math.floor(Math.random() * espacios.length)
        const punto = espacios.at(idx)
        this.celda = this.cuadricula.fromPunto(punto)
        this.update()
    }
}

Object.assign(ResponderRandomStrategy.prototype, UpdaterCellMixin)