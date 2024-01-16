import Phaser from "phaser";

export default class OverScene extends Phaser.Scene {
    constructor() {
        super('over_scene');
    }
//  inut(4)
    init(data) {
        this.replayBtn = 0;
        this.score = data.score // 4
    }

    preload(){
        this.load.image('bg', 'img/bg_layer1.png');
        this.load.image('game-over', 'img/gameover.png')
        this.load.image('replay',  'img/replay.png')
        
    }

    create(){
        this.add.image(this.scale.width, this.scale.height, 'bg');
        this.add.image(200, 210, 'game-over');
        this.replayBtn = this.add.image(120, 400, 'replay').setDepth(0.5).setInteractive();
        this.add.text(100, 500, `Last score : ${this.score}`,{
            fontSize : '30px',
            fill : 'black'
        })

        this.replayBtn.once('pointerup', ()=>{
            this.scene.start(`test1`)
        })
    }


    update(){

    }
}