/*Autor: Víctor Martínez*/

import Boot from "./prototypes/Boot.js"
import ConfigxCero from "./classes/ConfigxCero.js"
import Game from "./prototypes/Game.js"
import MainMenu from "./prototypes/MainMenu.js"
import Preloader from "./prototypes/Preloader.js"


const xCero = new ConfigxCero()
const mainMenu = new MainMenu(xCero)
const game = new Game(xCero)

const phaser = new Phaser.Game(xCero.ANCHO, xCero.ALTURA, Phaser.CANVAS, 'phaser')
phaser.state.add('Boot', Boot)
phaser.state.add('Preloader', Preloader)
phaser.state.add('MainMenu', mainMenu)
phaser.state.add('Game', game)
phaser.state.start('Boot')