import Phaser from "phaser";

// import scene1 from './scenes/scene1';
import copyscene from './scenes/copyscene'
import LevelOne from "./scenes/Level1";
import L1 from "./scenes/L1";

const config ={
    type:Phaser.AUTO,
    width : 800,
    height : 600,
    physics :{
        default : 'arcade',
        arcade:{
            gravity :{y : 200},
        }
    },
    scene : [L1]
}

export default new Phaser.Game(config);