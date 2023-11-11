import Phaser from "phaser";

// we have to import the scenes that we made before
import Test from "./scenes/test";
import MainPlaneScene from "./scenes/Plane";
import Testing1 from "./scenes/c1";
const config= {
    type : Phaser.AUTO,
    width : 400,
    height: 620,
    physics :{
        default : 'arcade',
        arcade :{
            gravity : {y : 0}
        }
    },
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter : Phaser.Scale.CENTER_BOTH
    },
    scene : [Testing1]
}

export default new Phaser.Game(config);

