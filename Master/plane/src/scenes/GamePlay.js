import Phaser from "phaser";
import Object from "./FallObkject";

const imageAsset = [
    {
        key: 'bg',
        path: 'sd/bg_layer1.png',
        isStatic: true
    },
    {
        key: 'cloud',
        path: 'sd/cloud.png',
        isStatic: true
    },
    {
        key: 'enemy',
        path: 'sd/enemy.png',
        isStatic: true
    },
    {
        key: 'explosion',
        path: 'sd/explosion.png',
        isStatic: true
    },
    {
        key: 'gameover',
        path: 'sd/gameover.png',
        isStatic: true
    },
    {
        key: 'handsanitizer',
        path: 'sd/handsanitizer.png',
        isStatic: true
    },
    {
        key: 'laser',
        path: 'sd/laser-bolts.png',
        isStatic: false,
        isProjecttile: true
    },
    {
        key: 'left-btn',
        path: 'sd/left-btn.png',
        isStatic: true
    },
    {
        key: 'right-btn',
        path: 'sd/right-btn.png',
        isStatic: true
    },
    {
        key: 'replay-btn',
        path: 'sd/replay.png',
        isStatic: true
    },
    {
        key: 'player',
        path: 'sd/ship.png',
        isStatic: false,
        isProjecttile: false
    },
    {
        key: 'shoot-btn',
        path: 'sd/shoot-btn.png',
        isStatic: true
    },

]

const playerAnimations = [
    {
        key: 'turn',
        isStatic: true,
        startFrame: 0,
        endFrame: null,
        spriteName: 'player'
    },
    {
        key: 'left',
        isStatic: false,
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player'
    },
    {
        key: 'right',
        isStatic: false,
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player'
    },
]

// imageAsset[0].key= 'ssdsds';

export default class MainPlane extends Phaser.Scene {

    constructor() {
        super('Plane vs Virus')
    }

    init() {
        this.leftBtn = 'g';
        this.rightBtn = 't';
        this.shootBtn = 22323;
        this.cloud = 'gg';
        this.player = 'fdf';
        this.speed = 100;
        this.enemy = '';

    }

    preload() {
        imageAsset.forEach(dt => {
            if (dt.isStatic) {
                // console.log('static asset', dt)
                this.load.image(dt.key, dt.path)
            }
            else if (!dt.isStatic && !dt.isProjecttile) {
                console.log('spritesheet load player', dt)
                this.load.spritesheet(dt.key, dt.path, {
                    frameWidth: 66,
                    frameHeight: 66,
                })
            }
            else if (!dt.isStatic && dt.isProjecttile) {
                console.log('load the laser', dt)
                this.load.spritesheet(dt.key, dt.path, {
                    frameWidth: 66,
                    frameHeight: 66,
                })
            }
        })

    }

    create() {
        console.log('the screen height', this.scale.height)
        const screenHeight = this.scale.height;
        const screenWidth = this.scale.width;
        this.add.image(screenWidth, screenHeight, 'bg')
        // to render the assest to browser, physics, position, and other
        this.createCloud();
        this.createButton();
        this.createPlayer();
        this.createEnemy();
        this.createTime();
        // console.log('eenemy', this.createEnemy())
    }

    createCloud() {
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 14
        })
        // this.cloud = this.add.image(50, 200, 'cloud')
        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds)

        console.log(this.cloud.getChildren())
        // move this cloud and set forever loop

    }

    moveCloud() {
        this.cloud.children.iterate(e => {
            e.setVelocityY(50)
            // console.log('y postion', e.y);

            e.y > this.scale.height ? (
                e.x = Math.floor(Math.random() * this.scale.width),
                e.y = 0
            )
                : 0
        })
    }

    createButton() {
        this.leftBtn = this.add.image(50, 500, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0.5);
        this.rightBtn = this.add.image(this.leftBtn.x + 80, 500, 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.5);
        this.shootBtn = this.add.image(335, 500, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.5);

        // interaction to set or detect

        this.leftBtn.on('pointerdown', () => {
            // console.log('YOu press left button');
            this.leftBtn = true;
        })
        this.leftBtn.on('pointerup', () => {
            // console.log('YOu do not press left button');
            this.leftBtn = false;
        })

        this.rightBtn.on('pointerdown', () => {
            // console.log('YOu press righjtt button');
            this.rightBtn = true;
        })
        this.rightBtn.on('pointerup', () => {
            // console.log('YOu do not press right button');
            this.rightBtn = false;
        })

        this.shootBtn.on('pointerdown', () => {
            // console.log('YOu press shoot button');
            this.leftBtn = true;
        })
        this.shootBtn.on('pointerup', () => {
            // console.log('YOu do not press shoot button');
            this.leftBtn = false;
        })

    }

    createPlayer() {
        this.player = this.physics.add.sprite(200, 400, 'player');
        this.player.setCollideWorldBounds(true);

        playerAnimations.forEach(data => {
            if (data.isStatic) {
                // console.log('static frame', data)
                this.anims.create({
                    key: data.key,
                    frames: [{ key: data.spriteName, frame: data.startFrame }]
                })
            }
            else if (!data.isStatic) {
                // console.log('dynamic frame:', data)
                this.anims.create({
                    key: data.key,
                    frames: this.anims.generateFrameNumbers(data.spriteName, { start: data.startFrame, end: data.endFrame })
                })
            }
        })
    }

    playerMovement() {
        if (this.leftBtn) {
            // console.log('go lefft')
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
            this.player.setFlipX(false)
        }
        else if (this.rightBtn) {
            // console.log('go rightt')
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
            this.player.setFlipX(true)
        }
        else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
    }

    createEnemy() {
        this.enemy = this.add.image(0, 0, 'enemy');

        this.enemy = this.physics.add.group({
            classType: Object,
            maxSize: 12,
            runChildUpdate: true
        })
    }

    createTime(){
        this.time.addEvent({
            delay : Phaser.Math.Between(1000,5000),
            callback : this.spawnEnemy,
            callbackScope : this,
            loop:true
        })
    }

    // spawn ENEMY from the top
    spawnEnemy() {
        // we have to create an object called config 
        let config = {
            speed: 50,
            rotation: 0.2
        }

        let enemySpawn = this.enemy.get(0, 0, 'enemy', config);

        // get random number for x position
        const positionX = Math.floor(Math.random() * 390);

        enemySpawn ? enemySpawn.spawn(positionX) : 0

    }


    update() {
        this.moveCloud();
        this.playerMovement();
        this.spawnEnemy();

    }

}