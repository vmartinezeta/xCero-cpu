export const UpdaterCellMixin = {
    update() {
        this.celda.setClaseFicha(this.fichaCpu)
        this.cuadricula.setCelda(this.celda)
    }
}