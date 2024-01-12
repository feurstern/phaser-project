import Phaser from "phaser";
import { playerAnimation, enemyAnimation, imageAsset } from "./loadAsset";

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

        this.starGame = false;
        this.questionText = undefined;
        this.resulText = 0;

        this.button1 = undefined
        this.button2 = undefined
        this.button3 = undefined
        this.button4 = undefined
        this.button5 = undefined
        this.button6 = undefined
        this.button7 = undefined
        this.button8 = undefined
        this.button9 = undefined
        this.button0 = undefined
        this.buttonDel = undefined
        this.buttonOk = undefined
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
        this.createSlash();
        this.createAnimation()
        this.createButton()
    }

    createPlayer() {
        this.player = this.physics.add.sprite(
            this.screenHalfWidth - 150,
            this.screenHalfHeight - 50, 'player').setBounce(0.2).setOffset(-20, -10)
    }

    createEnemy() {
        this.enemy = this.physics.add.sprite(
            this.screenHalfWidth + 150,
            this.screenHalfHeight - 50, 'enemy'
        ).setBounce(0.5).setFlipX(true);
    }

    createSlash() {
        this.slash = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(true)
            .setGravity(-500)
            .setOffset(0, -10)
            .setDepth(1)
            .setCollideWorldBounds(true);
    }

    createAnimation() {
        playerAnimation.forEach(x => {
            this.anims.create({
                key: x.keyName,
                frames: this.anims.generateFrameNumbers('player',
                    {
                        start: x.frameStart,
                        end: x.frameEnd
                    }),
                frameRate: x.frameRate,
                repeat: x.repeat != 0 ? x.repeat : null,
            })
        });

        enemyAnimation.forEach(x => {
            this.anims.create({
                key: x.keyName,
                frames: this.anims.generateFrameNumbers('enemy',
                    {
                        start: x.frameStart,
                        end: x.frameEnd
                    }),
                frameRate: x.frameRate,
                repeat: x.repeat != 0 ? x.repeat : null,
            })
        });
        console.log('animation has been created!')
    }


    createButton() {
        let startBtn = this.add.image(this.screenHalfWidth, this.screenHalfHeight + 141, 'startBtn').setInteractive();

        startBtn.once('pointerup', () => {
            // alert('pressed!');
            this.gameStartTrigger();

        })
    }


    gameStartTrigger() {
        this.starGame = true;
        this.player.anims.play('player-standby', true);
        this.enemy.anims.play('enemy-standby', true);

        //creating a text 
        this.resulText = this.add.text(this.screenHalfWidth, 200, '0', {
            fontSize: '32px',
            fill: 'black'
        })

        this.questionText = this.add.text(this.screenHalfWidth, 100, 0, {
            fontSize: '32px',
            fill: 'black'
        })

    }









}