import Phaser from "phaser";


const baseScale = 0.5;

const assetImage = [
    {
        key: 'bg',
        path: 'sd/bg_layer1.png',
        isBackground: true,
        isStatic: true,
    },
    {
        key: 'cloud',
        path: 'sd/cloud.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'enemy',
        path: 'sd/enemy.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'explosion',
        path: 'sd/explosion.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'gameover',
        path: 'sd/gameover.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'hand',
        path: 'sd/handsanitizer.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'laserbolt',
        path: 'sd/laserbolt',
        isBackground: false,
        isStatic: false,
    },
    {
        key: 'left-btn',
        path: 'sd/left-btn.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'replay',
        path: 'sd/replay.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'right-btn',
        path: 'sd/right-btn.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'ship',
        path: 'sd/ship.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'shoot-btn',
        path: 'sd/shoot-btn.png',
        isBackground: false,
        isStatic: true,
    },

]

export default class MainPlaneScene extends Phaser.Scene {
    constructor() {
        super(`Plane crash nazi`);
    }

    init() {
        this.cloud = '';
        this.navLeft = '';
        this.navRight = ''
    }

    preload() {
        assetImage.forEach((data, index) => {
            if (data.isStatic) {
                this.load.image(data.key, data.path)
            }

        })
    }

    create() {
        const screenWidth = this.scale.width * baseScale;
        const screenHeight = this.scale.height * baseScale;
        this.add.image(screenWidth, screenHeight, 'bg')

        this.createCloud();
        this.createButton();
    }

    createCloud() {
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 12,
        })


        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds);
    }

    createButton(){
        this.input.addPointer(3);
        // load the image
        let shoot = this.add.image(320, 550, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        let navLeft = this.add.image(50,550, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0,8);
        let navRight = this.add.image(navLeft.x + navLeft.displayWidth, 550 , 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
    }

    moveCloud() {
        this.cloud.children.iterate((e) => {
            e.setVelocityY(40);
            // console.log('y axis', e.y);
            e.y > this.scale.height ? (
                e.x = Phaser.Math.Between(10, 400),
                e.y = 0
            ) : 0
        })
    }

    update() {

        this.moveCloud();

    }


}