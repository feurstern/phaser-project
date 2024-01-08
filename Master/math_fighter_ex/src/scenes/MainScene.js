import Phaser from "phaser";

const imageAsset = [
    {
        keyName: 'bg',
        path: 'img/bg_layer1.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'fight-bg',
        path: 'img/fight-bg.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'tile',
        path: 'img/tile.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'startBtn',
        path: 'img/start_button.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'player',
        path: 'img/warrior1.png',
        isStatic: false,
        frameWidth: 80,
        frameHeight: 80
    },
    {
        keyName: 'enemy',
        path: 'img/warrior2.png',
        isStatic: false,
        frameWidth: 80,
        frameHeight: 80
    },
    {
        keyName: 'numbers',
        path: 'img/numbers.png',
        isStatic: false,
        frameWidth: 131,
        frameHeight: 71.25
    },
    {
        keyName: 'slash',
        path: 'img/slash.png',
        isStatic: false,
        frameWidth: 42,
        frameHeight: 88
    }

]

export default class MainScene extends Phaser.Scene {


    constructor() {
        super(`main-scene`);
    }

    init() {
        this.author = 0;
    }


    preload() {
        imageAsset.forEach(dt => {
            if(img.isStatic){
                this.load.image(dt.keyName, dt.path);
                console.log('static:', dt);
            }
        })

        this.load.image('bg', 'img/bg_layer1.png');
        console.log('preload');


    }
    
    create(){
        this.add.image(this.scale.width, this.scale.height, 'bg')
        console.log('hshshhsS')
    }

}