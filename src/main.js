/*Autor: Víctor Martínez*/

import Boot from "./Boot.js"
import ConfigxCero from "./ConfigxCero.js"
import Game from "./Game.js"
import MainMenu from "./MainMenu.js"
import Preloader from "./Preloader.js"


const xCero = new ConfigxCero()
const mainMenu = new MainMenu(xCero)
const game = new Game(xCero)

const phaser = new Phaser.Game(xCero.ANCHO, xCero.ALTURA, Phaser.CANVAS, 'phaser')
phaser.state.add('Boot', Boot)
phaser.state.add('Preloader', Preloader)
phaser.state.add('MainMenu', mainMenu)
phaser.state.add('Game', game)
phaser.state.start('Boot')