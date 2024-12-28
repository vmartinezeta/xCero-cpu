/*Autor: Víctor Martínez*/

export default function Preloader(game) {}

Preloader.prototype.preload = function () {

    this.load.image('volumen', 'images/vocero.png')
    this.load.image('linea-1', 'images/linea-1.png')
    this.load.image('linea-2', 'images/linea-2.png')
    this.load.image('menu-principal', 'images/menu-principal.png')
    this.load.image('configuracion', 'images/configuracion.png')

    this.load.image('boton-jugar', 'images/boton-jugar.png')
    this.load.image('boton-x', 'images/boton-x.png')
    this.load.image('boton-0', 'images/boton-0.png')
    this.load.image('boton-espacio', 'images/boton-espacio.png')

    this.load.image('boton-x-inactivo', 'images/boton-x-inactivo.png')
    this.load.image('boton-0-inactivo', 'images/boton-0-inactivo.png')
    this.load.image('boton-espacio-inactivo', 'images/boton-espacio-inactivo.png')
    this.load.image('boton-opciones', 'images/boton-opciones.png')
    this.load.image('boton-atras','images/boton-atras.png')
    this.load.image('boton-siguiente','images/boton-siguiente.png')

    this.load.image('ficha-0', 'images/ficha-0.png')
    this.load.image('ficha-x', 'images/ficha-x.png')
    this.load.image('ficha-espacio', 'images/ficha-espacio.png')
    this.load.image('ficha-espacio-activo', 'images/ficha-espacio-activo.png')

    this.load.image('nivel-facil', 'images/nivel-facil.png')
    this.load.image('nivel-medio', 'images/nivel-medio.png')

    this.load.image('cargando', 'images/cargando.png')
    this.load.image('tablero', 'images/tablero.png')

    this.load.image('rotulo-ganador', 'images/rotulo-ganador.png')
    this.load.image('rotulo-empate', 'images/rotulo-empate.png')
    this.load.image('rotulo-perdedor', 'images/rotulo-perdedor.png')

    this.load.audio('ganador', ['audio/ganador.mp3'])
    this.load.audio('perdedor', ['audio/perdedor.mp3'])
    this.load.audio('empate', ['audio/empate.mp3'])
    this.load.audio('musica-fondo',['audio/stranger-things.mp3'])
}

Preloader.prototype.create = function () {
    this.game.state.start('MainMenu')
}