import CeldaStrategy from "./CeldaStrategy.js"
import { UpdaterCellMixin } from "./UpdaterCellMixin.js"

class CentroAbsolutoStrategy extends CeldaStrategy {
    constructor(){
        super()
    }
}

Object.assign(CentroAbsolutoStrategy.prototype, UpdaterCellMixin) 