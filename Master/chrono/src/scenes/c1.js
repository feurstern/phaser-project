import Phaser from "phaser";
import FallingObject from "./FallingObject";

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
        isProjectile: true,
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
        isProjectile: false,
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
        key: 'left',
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player',
        isStatic: false
    },
    {
        key: 'right',
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player',
        isStatic: false
    },
    {
        key: 'tur',
        startFrame: '0',
        endFrame: null,
        spriteName: 'player',
        isStatic: true
    }
]


export default class Testing1 extends Phaser.Scene {
    constructor() {
        super(`test1`);
    }

    init() {
        this.cloud = undefined;
        this.leftBtn = '';
        this.righBtn = '';
        this.shootBtn = '';
        this.player = 'f';

        this.enemy ='2';
        this.enemySpeed = 20;

    }


    preload() {
        assetImage.forEach((data) => {
            if (data.isStatic) {
                this.load.image(data.key, data.path);
                if(data.key==='enemy'){
                    console.log(data)
                }
            }
            else if (!data.isStatic) {
                // console.log('load data:', data)
                this.load.spritesheet(data.key, data.path, {
                    frameWidth: 66,
                    frameHeight: 66
                })
            }
        })

    }



    create() {

        const screenHeight = this.scale.height;
        const screenWidth = this.scale.width;

        this.add.image(screenWidth, screenWidth, 'bg');
        this.createCloud();
        this.createButton();
        this.createPlayer();
        this.createEnemy();
        this.createTime();
        

    }


    createCloud() {
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 14
        })
        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds)

    }

    moveCloud() {
        this.cloud.children.iterate(c => {
            c.setVelocityY(55);

            c.y > this.scale.height ? (
                c.y = 0,
                c.x = Phaser.Math.Between(10, 400)
            ) : 0
        })
    }

    createButton() {
        this.leftBtn = this.add.image(50, 550, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        this.righBtn = this.add.image(this.leftBtn.x + this.leftBtn.displayWidth, 550, 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        this.shootBtn = this.add.image(340, 550, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.5)

        this.leftBtn.on('pointerdown', () => {
            this.leftBtn = true;
            console.log('press left')
        })

        this.leftBtn.on('pointerup', () => {
            this.leftBtn = false;
        })

        this.righBtn.on('pointerdown', () => {
            this.rightBtn = true;
            console.log('press RIGHT')
        })

        this.righBtn.on('pointerup', () => {
            this.rightBtn = false;
            console.log('unpressed right')
        })

        this.shootBtn.on('pointerdown', () => {
            this.shootBtn = true;
            console.log('press up')
        })

        this.shootBtn.on('pointerup', () => {
            this.shootBtn = false;
        })
    }


    createPlayer() {
        this.player = this.physics.add.sprite(200, 450, 'player');
        this.player.setCollideWorldBounds(true);
        playerAnimation.forEach(dt=>{
            // start  isStatic
            if(dt.isStatic){
                this.anims.create({
                    key: dt.key,
                    frames:[{
                        key:dt.spriteName, frame: dt.startFrame
                    }]
                })
            }
            // end of static
            else if(!dt.isStatic){
                console.log(dt)
                this.anims.create({
                    key : dt.key,
                    frames: this.anims.generateFrameNumbers(dt.spriteName, { start: dt.startFrame, end: dt.endFrame})
                })
            }
        })

    }

    playerMovement(player, time){
        if(this.leftBtn){
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.setFlipX(false)
        }
        else if(this.righBtn){
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.setFlipX(true)
        }
    }

    createEnemy(){

        this.enemy = this.load.image(300, 200, 'enemy');
        this.enemy = this.physics.add.group({
            classType: FallingObject,
            maxSize: 12,
            runChildUpdate: true
        });
    }

    createTime(){
        this.time.addEvent({
            delay : Phaser.Math.Between(1000, 5000),
            callBack : this.spawnEnemy(),
            callbackScope: true,
            loop : true
        })
    }

    spawnEnemy(){
        const config={
            speed: 30,
            rotation : 0.55
        };

        const enemy = this.enemy.get(0,0, 'enemy', config);
        const positionX = Phaser.Math.Between(50, 350);
        enemy ? enemy.spawn(positionX) : 0;
    }



    update() {
        this.moveCloud()
        this.playerMovement(this.player, this.time)
        this.spawnEnemy();
    }
}