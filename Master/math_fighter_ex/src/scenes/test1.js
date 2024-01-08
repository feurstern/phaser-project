import Phaser from "phaser";

export default class Test1 extends Phaser.Scene{

    constructor(){
        super(`main-test`);
    }

    preload(){
        this.load.image('bg', 'img/bg_layer1.png');
    }

    
    create(){
        this.add.image(this.scale.width, this.scale.height, 'bg');
    }
}