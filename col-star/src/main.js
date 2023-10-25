import Phaser from "phaser";

import scene1 from './scenes/scene1';
import copyscene from './scenes/copyscene'

const config ={
    type:Phaser.AUTO,
    width : 800,
    height : 600,
    physics :{
        default : 'arcade',
        arcade:{
            gravity :{y : 200},
            debug:true
        }
    },
    scene : [scene1]
}

export default new Phaser.Game(config);