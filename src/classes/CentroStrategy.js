import Bien from "./Bien.js"
import CeldaStrategy from "./CeldaStrategy.js"
import Circuito from "./Circuito.js"
import { UpdaterCellMixin } from "../mixins/UpdaterCellMixin.js"

export default class CentroStrategy extends CeldaStrategy {
    constructor(cuadricula, fichaCpu, fichaJugador) {
        super()
        this.circuito = null
        this.celda = null
        this.cuadricula = cuadricula
        this.fichaCpu = fichaCpu
        this.bienes = cuadricula.toLineas()
        .map(l => new Bien(l, fichaCpu, fichaJugador))
    }

    updateCelda() {
        const lineasBase = this.bienes.filter(b => b.isFichaCpu()).map(b => b.linea)
        if (lineasBase.length === 1) {
            lineasBase.push(this.cuadricula.toLineas().find(l =>l.estaNeutra()))
        }
        const lineasCierre = this.bienes.filter(b => b.isFichaEspacio()).map(b => b.linea)
        this.crearCircuito(lineasBase, lineasCierre)
        const espacios = this.circuito.getInterceptos()
        const idx = Math.floor(Math.random() * espacios.length)
        this.celda = espacios.at(idx)
        this.update()
    }

    fueDescubierta() {
        return this.circuito && this.circuito.estaNeutralizado()
    }

    crearCircuito(lineasBase, lineasCierre) {
        for (const l of lineasCierre) {
            this.circuito = new Circuito(...lineasBase, l)
            if (this.circuito.formaCircuito()) return
        }
    }
}


Object.assign(CentroStrategy.prototype, UpdaterCellMixin) 