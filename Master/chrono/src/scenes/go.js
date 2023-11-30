import Phaser from "phaser";

// const imageAsset =[{}]
export default class GameOver extends Phaser.Scene {
    constructor() {
        super(`game-over-scene`)
    }

    init(data) {
        this.replayButton = 'sdsds';
        // creating score from the other scene 
        // that's why I have to use the  parameter
        this.score = data.score;

    }

    preload() {
        this.load.image('background', 'sd/bg_layer1.png')
        this.load.image('gameover', 'sd/gameover.png')
        this.load.image('replay-button', 'sd/replay.png')

    }

    create() {
        this.add.image(this.scale.width, this.scale.width, 'background');
        this.add.image(250, 400, 'gamover');
        this.add.text(250, 450, `score : ${this.score}`,{
            fontSize : '32px', fill : 'black'
        })
        this.createReplayButton();
    }

    createReplayButton(){
        this.replayButton =   this.add.image(250, 550, 'replay').setInteractive().setScale();   

        this.replayButton.once('pointerup', ()=>{
            this.scene.start(`test1`);
        })
    }
}