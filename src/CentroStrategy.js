import CeldaStrategy from "./CeldaStrategy.js"
import { UpdaterCellMixin } from "./UpdaterCellMixin.js"

export default class CentroStrategy extends CeldaStrategy{
    constructor() {
        super()
    }

    updateCelda(){
        console.log("works")
    }
}

Object.assign(CentroStrategy.prototype, UpdaterCellMixin) 