export function Loading(scene, origen) {
    Phaser.Group.call(this, scene)
    this.scene = scene
    this.origen = origen
    this.origenOficial = origen.newInstance()
    this.timer = scene.time.create(false)
    this.timer.loop(150, this.dibujar, this)
    this.timer.start()
}

Loading.prototype = Object.create(Phaser.Group.prototype)
Loading.prototype.constructor = Loading

Loading.prototype.crearTexto = function () {
    const texto = this.scene.add.text(this.origenOficial.x - 50, this.origenOficial.y, "Loading")
    texto.font = 'Arial Black'
    texto.fontSize = 20
    texto.fill = '#000000'
    texto.anchor.set(0.5)
    this.add(texto)
}

Loading.prototype.dibujar = function () {
    if (this.countLiving()===0) {
        this.crearTexto()
    }
    const grafico = this.scene.add.graphics(this.origen.x, this.origen.y)
    grafico.lineStyle(4, 0x000)
    grafico.drawCircle(0, 0, 5)
    grafico.anchor.set(0.5)
    this.add(grafico)
    this.origen.x = this.origen.x + 10
    if (this.countLiving() > 4) {
        this.origen = this.origenOficial.newInstance()
        this.removeAll()
        this.crearTexto()
    }
}

Loading.prototype.stop = function () {
    this.timer.stop()
}