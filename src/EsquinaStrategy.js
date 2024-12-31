import Bien from "./Bien.js"
import CeldaStrategy from "./CeldaStrategy.js"
import Circuito from "./Circuito.js"
import { UpdaterCellMixin } from "./UpdaterCellMixin.js"

export default class EsquinaStrategy extends CeldaStrategy {
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
        const lineasCierre = this.bienes.filter(b => b.isFichaEspacio()).map(b => b.linea)
        if (!this.circuito || this.circuito && this.circuito.acechaEnemigo()) {
            this.crearCircuito(lineasBase, lineasCierre)
        }

        const espacios = this.circuito.getInterceptos()
        const idx = Math.floor(Math.random() * espacios.length)
        this.celda = espacios.at(idx)
        this.update()
    }

    crearCircuito(lineasBase, lineasCierre) {
        for (const l of lineasCierre) {
            this.circuito = new Circuito(...lineasBase, l)
            if (this.circuito.formaCircuito()) return
        }
    }
}


Object.assign(EsquinaStrategy.prototype, UpdaterCellMixin) 