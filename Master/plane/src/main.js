import Phaser from "phaser"

import MainPlane from "./scenes/GamePlay"
import MainGame from "./scenes/game"

const config = {
    type : Phaser.AUTO,
    width: 400,
    height  : 600,
    physics:{
        default: 'arcade',
        arcade : {
            gravity : {y:0}
        },
    },
    scale:{
        mode : Phaser.Scale.FIT,
        autoCenter : Phaser.Scale.CENTER_BOTH
    },
    scene : [MainPlane]
}

export default new Phaser.Game(config)

