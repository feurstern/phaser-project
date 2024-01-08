import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import Test1 from "./scenes/test1";

const config = {
    
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCentere: Phaser.Scale.CENTER_BOTH
        },
        scene: [Test1]
    }
}

export default new Phaser.Game(config);