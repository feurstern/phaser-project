import Phaser from "phaser";
import { imageAsset } from "./MathAsset";
import { playerAnimation, enemyAnimation, assetAnimation } from "./Animation";
export default class MathFigther extends Phaser.Scene {
    constructor() {
        super(`math-scene`)

    }

    init() {
        this.gameScreenHalfWidth = this.scale.width / 2;
        this.gameScreenHalfHeight = this.scale.height / 2;
        this.player = 0;
        this.enemy = 0;
        this.slash = 0;

        // this properties is just for the set trigger the button is being pressed
        this.startGame = false;

        // for displaying the question
        this.questionText = 0;

        // for displaying the choosen number
        this.resultText = 0;


        this.button0 = undefined;
        this.button1 = undefined;
        this.button2 = undefined;
        this.button3 = undefined;
        this.button4 = undefined;
        this.button5 = undefined;
        this.button6 = undefined;
        this.button7 = undefined;
        this.button8 = undefined;
        this.button9 = undefined;
        this.buttonOk = undefined;
        this.buttonDel = undefined;


        // start pr

        // end pr







    }

    preload() {
        // load all the asset


        imageAsset.forEach(x => {
            if (x.isStatic) {
                this.load.image(x.keyName, x.path);
                // console.log('static image:', x )
            }
            else if (!x.isStatic) {
                this.load.spritesheet(x.keyName, x.path, {
                    frameWidth: x.frameWidth,
                    frameHeight: x.frameHeight
                })
                // console.log('dynamic image', x);

            }

        })

    }

    create() {
        this.add.image(this.scale.width, this.scale.height, 'bg');
        let fightBackground = this.add.image(230, 160, 'fight-bg');
        let tile = this.add.image(230, fightBackground.height - 30, 'tile')


        this.createPlayer();
        this.createEnemy();
        this.createSlash();
        // create collision for the tile and the player
        this.physics.add.collider(this.player, tile);
        this.createAnimation();
        this.createStartButton();

    }

    createPlayer() {
        this.player = this.add.sprite(this.gameScreenHalfWidth - 150, this.gameScreenHalfHeight - 40, 'player')
    }

    createEnemy() {
        this.enemy = this.add.sprite(this.gameScreenHalfWidth + 150, this.gameScreenHalfHeight - 40, 'enemy').setFlipX(true)
    }

    createSlash() {
        this.slash = this.physics.add.sprite(200, 240, 'slash')
            .setActive(false)
            .setVisible(true)
            .setGravityY(-500)
            .setCollideWorldBounds(true)
            .setDepth(1)
            .setOffset(0, -10)
    }

    createAnimation() {

        assetAnimation.forEach(x => {
            if (x.spriteName == 'player') {
                this.anims.create({
                    key: x.keyName,
                    frames: this.anims.generateFrameNumbers(x.spriteName, {
                        start: x.frameStart,
                        end: x.frameEnd
                    }),
                    frameRate: x.frameRate,
                    repeat: x.repeat = null ? 0 : x.repeat
                })
            }
            else {
                this.anims.create({
                    key: x.keyName,
                    frames: this.anims.generateFrameNumbers(x.spriteName, {
                        start: x.frameStart,
                        end: x.frameEnd
                    }),
                    frameRate: x.frameRate,
                    repeat: x.repeat = null ? 0 : x.repeat
                })


            }
        })


    }


    // this method for creating the start button
    createStartButton() {

        let startButton = this.add.image(this.gameScreenHalfWidth, this.gameScreenHalfHeight + 160, 'start-btn').setInteractive();

        startButton.once('pointerdown', () => {
            startButton.destroy();
            this.gameStart();
            this.createNumberButton()
        })
    }


    gameStart() {
        //  we set the properties of the start game to true
        this.startGame = true;

        // for the animation
        this.player.anims.play('player-standby', true);
        this.enemy.anims.play('enemy-standby', true);

        // displaying the text
        this.resultText = this.add.text(this.gameScreenHalfWidth, 150, `0`, {
            fontSize: '24px',
            fill: "blue"
        })

        // console.log(`The value of the resulttext yAxis : ${this.resultText.y}`)


        this.questionText = this.add.text(this.gameScreenHalfWidth, this.resultText.y + 60, `0`, {
            fontSize: '24px',
            fill: "red"
        })

       
    }



    createNumberButton() {
        const widthDifference = 131;
        const heightDifference = 71.25;

        const startPosY = this.scale.height - 230;

        // left side
        this.button1 = this.add.image(this.gameScreenHalfWidth - widthDifference, startPosY, 'numbers', 0).setInteractive().setData(`value`, 1);
        this.button4 = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button1.y + heightDifference, 'numbers', 3).setInteractive().setData(`value`, 4);
        this.button7 = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button4.y + heightDifference, 'numbers', 6).setInteractive().setData(`value`, 7);
        this.buttonDel = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button7.y + heightDifference, 'numbers', 9).setInteractive().setData(`value`, `del`);

        // middle

        this.button2 = this.add.image(this.gameScreenHalfWidth, startPosY, 'numbers', 1).setInteractive().setData(`value`, 2);
        this.button5 = this.add.image(this.gameScreenHalfWidth, this.button2.y + heightDifference, 'numbers', 4).setInteractive().setData(`value`, 5);
        this.button8 = this.add.image(this.gameScreenHalfWidth, this.button5.y + heightDifference, 'numbers', 5).setInteractive().setData(`value`, 8);
        this.button0 = this.add.image(this.gameScreenHalfWidth, this.button8.y + heightDifference, 'numbers', 10).setInteractive().setData(`value`, 0);

        // right
        this.button3 = this.add.image(this.gameScreenHalfWidth + widthDifference, startPosY, 'numbers', 2).setInteractive().setData(`value`, 3);
        this.button6 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button3.y + heightDifference, 'numbers', 5).setInteractive().setData(`value`, 6);
        this.button9 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button6.y + heightDifference, 'numbers', 6).setInteractive().setData(`value`, 9);
        this.buttonOk = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button9.y + heightDifference, 'numbers', 11).setInteractive().setData(`value`, `ok`);

    }


  





    update() {
    }
} 