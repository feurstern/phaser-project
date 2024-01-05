import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {

    constructor() {
        // the name of the scene that we want to use
        super(`game-over-scene`);
    }

    // 
    init(data) {
        this.replayBtn = '';
        this.score = data.score;
    }

    preload() {
        this.load.image('bg', 'sd/bg_layer1.png');
        this.load.image('over', 'sd/gameover.png');
        this.load.image('replay', 'sd/replay.png');
    }


    create(){
        this.add.image(this.scale.width, this.scale.height, 'bg');
        this.add.text(4, 40, "This game was made by Miku",{
            fontSize:'20px',
            fill: 'black'
        })
        this.add.image(200,250, 'over');
        // to show the last score that the user got
        this.add.text(40, 400, `Score : ${this.score}`, {
            fontSize : '30px',
            fill : 'black'
        })
        
        this.replayBtn = this.add.image(300, 500, 'replay').setInteractive().setScale(0.5);

        this.replayBtn.once('pointerup', ()=>{
            this.scene.start(`test1`);
        }, this)
    }


}