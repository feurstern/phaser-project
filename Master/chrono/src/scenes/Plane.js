import Phaser from "phas//er";


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
        key: 'player',
        path: 'sd/ship.png',
        isBackground: false,
        isStatic: false,
    },
    {
        key: 'shoot-btn',
        path: 'sd/shoot-btn.png',
        isBackground: false,
        isStatic: true,
    },

]

const playerAnimation = [
    {
        key: 'turn',
        isStatic: true,
        startFrame: 0,
        endFrame: null,
        spriteName: 'ship'
    },
    {
        key: 'left',
        isStatic: false,
        startFrame: 1,
        endFrame: 2,
        spriteName: 'ship'
    },
    {
        key: 'right',
        isStatic: false,
        startFrame: 1,
        endFrame: 2,
        spriteName: 'ship'
    }
]

export default class MainPlaneScene extends Phaser.Scene {
    constructor() {
        super(`Corona Buster `)
    }
    init() {

        // I just want to show you that Javascript is dynamic
        this.player = undefined;
        this.btnLeft = 2;
        this.btnRight = true;
        this.btnShoot = 'string'
        this.cloud = ''

        this.cursor = '';
    }

    preload() {

        assetImage.forEach((data) => {
            if (data.isStatic) {
                this.load.image(data.key, data.path);
            }
            else if (!data.isStatic) {
                console.log('not static', data)
                this.load.spritesheet(data.key, data.path, {
                    frameWidth: 66,
                    frameHeight: 66
                })
            }
        })
    }

    create() {
        const screenWidht = this.scale.width * 0.5;
        const screenHeight = this.scale.height * 0.5;
        console.log('screen widht', screenWidht);
        console.log('screen height', screenHeight);
        this.add.image(screenWidht, screenHeight, 'bg')
        // this.add.image()

        this.createCloud();
        this.createButton();
        this.player = this.createPlayer();
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    createCloud() {
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 15
        })
        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds)
    }

    moveCloud() {
        this.cloud.children.iterate(e => {
            e.setVelocityY(25)
            // console.log(e.y);
            e.y > this.scale.height ? (
                e.x = Phaser.Math.Between(10, 400),
                e.y = 0
            )
                : 0
        })

    }

    createButton() {
        this.input.addPointer(3);
        let shoot = this.add.image(320, 550, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        let navLeft = this.add.image(50, 550, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        let navRight = this.add.image(navLeft.x + navLeft.displayWidth, 550, 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.8);

        navLeft.on('pointerdown', () => {
            this.btnLeft = true
        }, this);

        navLeft.on('pointerout', () => {
            this.btnLeft = false;
        }, this)

        navRight.on('pointerdown', () => {
            this.btnRight = true
        })

        navRight.on('pointerout', () => {
            this.btnRight = false;
        }, this)

        shoot.on('pointerdown', () => {
            this.btnShoot = true
        }, this)

        shoot.on('pointerout', () => {
            this.btnShoot = false;
        }, this)


    }

    createPlayer() {
        const player = this.physics.add.sprite(200, 450, 'player')

        player.setCollideWorldBounds(true);

        playerAnimation.forEach((data, index) => {
            if (data.isStatic) {
                console.log('static data', data)
                this.anims.create({
                    key: data.key,
                    frames: [{ key: 'player', frame: data.startFrame }]
                })
            }
            else {
                console.log('dynamic data', data)
                this.anims.create({
                    key: data.key,
                    frames: this.anims.generateFrameNumbers('player', { start: data.startFrame, end: data.endFrame })
                })
            }
        })
        return player;
    }

    playerMovement(player, time) {
        // if(this,)
        const moveLeft = this.cursor.left.isDown;
        const moveRight = this.cursor.right.isDown;

        if (this.btnLeft || moveLeft) {
            console.log('you pressed the left button')
            this.player.setVelocityX(-200)
            this.player.anims.play('left', true)
        }
        else if (this.btnRight || moveRight) {
            console.log('you pressed the right button');
            this.player.setVelocityX(200)
            this.player.anims.play('right', true)
        }
        else if (this.btnShoot) {
            console.log('you pressed the shoot button')
        }

    }

    update() {
        this.moveCloud()
        this.playerMovement(this.player, this.time)

    }
}