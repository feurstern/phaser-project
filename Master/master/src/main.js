import Phaser from "phaser";

// we have to import the scenes that we made before
import Test from "./scenes/test";

const config= {
    type : Phaser.AUTO,
    width : 1920,
    height: 1080,
    physics :{
        default : 'arcade',
        arcade :{
            gravity : {y : 200}
        }
    },
    scene : [Test]
}

export default new Phaser.Game(config);