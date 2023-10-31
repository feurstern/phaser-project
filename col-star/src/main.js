import Phaser from "phaser";

// import scene1 from './scenes/scene1';
import copyscene from './scenes/copyscene'
import LevelOne from "./scenes/Level1";
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
    scene : [LevelOne]
}

export default new Phaser.Game(config);