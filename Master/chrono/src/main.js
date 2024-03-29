import Phaser from "phaser";

// we have to import the scenes that we made before
import Test from "./scenes/test";
import MainPlaneScene from "./scenes/Plane";
// plane
import mathfighterscene from "./platformer/scene";
import Testing3 from "./scenes/c3";
import Testing1 from "./scenes/c1";
import GameOver from "./scenes/go";
import DebugHand from "./scenes/h";
import GameOverScene from "./scenes/Gameover";
import OverScene from "./scenes/OverScene";
// math fighter
import Test1 from "./scenes/c2";
import MathFigther from "./scenes/MathScene";
import MathFigther1 from "./scenes/m-1";
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
    scene : [MathFigther, OverScene, GameOver, DebugHand,  GameOverScene]
}

export default new Phaser.Game(config);

