import Phaser from "phaser";

export default class DebugHand extends Phaser.Scene {
    constructor() {
        super(`test hand`);
    }

    init(data) {
        this.score = data.score;
        this.replayBtn = ''
    }

    preload() {
        this.load.image('bg', 'sd/bg_layer1.png')
        this.load.image('gameover', 'sd/gameover.png')
        this.load.image('replay', 'sd/replay.png')
    }

    create() {
        this.add.image(this.scale.width, this.scale.height, 'bg');
        this.add.image(200, 400, 'gameover');
        this.add.text(250,500, `The last score : ${this.score}`, {
            fontSize : '24px',
            fill : 'black'
        })
        this.createReplayButton();

    }


    createReplayButton(){
        this.replayBtn = this.add.image(300,570, 'replay').setInteractive();

        this.replayBtn.once('pointerup',()=>{
            this.scene.start('test-1');
        })
    }


}