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
export default class Test1 extends Phaser.Scene {

    constructor() {
        super(`main-test`);
    }

    init() {
        this.player = 0;
        this.enemy = 0;
        this.slash = 1;
        this.screenHalfWidth = this.scale.width * 0.5;
        this.screenHalfHeight = this.scale.height * 0.5;
    }

    preload() {
        // this.load.image('bg', 'sd/bg_layer1.png');
        imageAsset.forEach(dt => {
            if (dt.isStatic) {
                this.load.image(dt.keyName, dt.path);
            }
            else if (!dt.isStatic) {
                console.log(dt)
                this.load.spritesheet(dt.keyName, dt.path, {
                    frameWidth: dt.frameWidth,
                    frameHeight: dt.frameHeight
                })
            }
        })
    }


    create() {
        this.add.image(this.scale.width, this.scale.height, 'bg');
        const fightBackground = this.add.image(240, 160, 'fight-bg')
        const tile = this.physics.add.staticImage(240, fightBackground.height - 40, 'tile')


        this.createPlayer();
        this.createEnemy();
        this.physics.add.collider(this.player, tile);
    }

    createPlayer() {
        this.player = this.physics.add.sprite(
            this.screenHalfWidth - 150,
            this.screenHalfHeight - 50, 'player').setBounce(0.2).setOffset(-20, -10)
    }

    createEnemy(){
        this.enemy = this.physics.add.sprite(
            this.screenHalfWidth + 150,
            this.screenHalfHeight - 50, 'enemy'
        ).setBounce(0.5).setFlipX(true);
    }


}