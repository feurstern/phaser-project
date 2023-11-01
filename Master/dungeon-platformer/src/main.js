import Phaser from "phaser";

// we have to import the scenes that we made before
import Test from "./scenes/test";
import MainScene from "./scenes/MainScene";

const config= {
    type : Phaser.AUTO,
    width : 800,
    height: 600,
    physics :{
        default : 'arcade',
        arcade :{
            gravity : {y : 200}
        }
    },
    scene : [MainScene]
}

export default new Phaser.Game(config);