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

        // 
        this.number = 0
        this.numberArray = []

        this.question = [];

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
        this.createStartButtonTrigger();
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


    createStartButtonTrigger() {
        let startBtn = this.add.image(this.screenHalfWidth, this.screenHalfHeight + 141, 'startBtn').setInteractive();

        startBtn.once('pointerup', () => {
            // alert('pressed!');
            startBtn.destroy();
            this.gameStartTrigger();
            this.createButtonNumber()

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

        this.input.on(`gameobjectdown`, this.addNumber, this)
        this.generateQuestion();
        // this.input.on('gameobjectdown', this.generateQuestion, this)
    }

    createButtonNumber() {
        const startPosY = this.scale.height - 246;
        const widthDifference = 131;
        const heightDifference = 71.25;

        // middle button
        this.button2 = this.add.image(this.screenHalfWidth, startPosY, 'numbers', 1).setInteractive().setData(`value`, 5);
        this.button5 = this.add.image(this.screenHalfWidth, this.button2.y + heightDifference, 'numbers', 4).setInteractive().setData(`value`, 5);
        this.button8 = this.add.image(this.screenHalfWidth, this.button5.y + heightDifference, 'numbers', 7).setInteractive().setData(`value`, 8);
        this.button0 = this.add.image(this.screenHalfWidth, this.button8.y + heightDifference, 'numbers', 10).setInteractive().setData('value', 0);
        // end of button 

        //left
        this.button1 = this.add.image(this.screenHalfWidth - widthDifference, startPosY, 'numbers', 0).setInteractive().setData(`value`, 1);
        this.button4 = this.add.image(this.screenHalfWidth - widthDifference, this.button1.y + heightDifference, 'numbers', 3).setInteractive().setData(`value`, 4);
        this.button7 = this.add.image(this.screenHalfWidth - widthDifference, this.button4.y + heightDifference, 'numbers', 6).setInteractive().setData(`value`, 7);
        this.buttonDel = this.add.image(this.screenHalfWidth - widthDifference, this.button7.y + heightDifference, 'numbers', 9).setInteractive().setData(`value`, `del`);
        // end of left side button


        // right side
        this.button3 = this.add.image(this.screenHalfWidth + widthDifference, startPosY, 'numbers', 2).setInteractive().setData(`value`, 3);
        this.button6 = this.add.image(this.screenHalfWidth + widthDifference, this.button3.y + heightDifference, 'numbers', 5).setInteractive().setData(`value`, 6);
        this.button9 = this.add.image(this.screenHalfWidth + widthDifference, this.button6.y + heightDifference, 'numbers', 8).setInteractive().setData(`value`, 9);
        this.buttonOk = this.add.image(this.screenHalfWidth + widthDifference, this.button9.y + heightDifference, 'numbers', 11).setInteractive().setData(`value`, `ok`);
        // 

        // this.buttonOk.on('pointerdown', () => {
        //     alert(this.getData('value'))
        // }, this)

    }


    addNumber(pointer, object, event) {

        let value = object.getData(`value`)

        // checking whether the button that we pressed is number or not 
        if (isNaN(value)) {
            value == `del` ? this.numberArray.pop() : 0
            // set default number to 0 
            this.numberArray.length < 1 ? this.numberArray[0] = 0 : 0;

            value == 'ok' ? (
                this.checkAnswer(),
                this.numberArray = [],
                this.numberArray[0] = 0
            )

                : 0

        }
        else {
            // to check whether the amount of number 
            if (this.numberArray.length == 1 && this.numberArray[0] == 0) {
                // we reassign the value 
                this.numberArray[0] == value
            }
            else if (this.numberArray.length < 10) {
                // push the number into array
                this.numberArray.push(value)
            }

        }

        console.log('current array numbee:', this.numberArray);

        this.number = parseInt(this.numberArray.join(''));

        this.resulText.setText(this.number);
        const textHalfWidth = this.resulText.width * 0.5;
        this.resulText.setX(this.screenHalfWidth - textHalfWidth)
        event.stopPropagation();

    }

    getRandomOperator() {
        const operator = ['+', '-', 'x', ':']
        return operator[Phaser.Math.Between(0, 3)]
    }

    generateQuestion() {
        let question1 = Phaser.Math.Between(1, 20);
        let question2 = Phaser.Math.Between(1, 20);
        let operator = this.getRandomOperator();

        switch (operator) {
            case '+':
                this.question[0] = `${question1} + ${question2}`;
                this.question[1] = question1 + question2;
                break;

            case '-':
                this.question[0] = `${question1} - ${question2}`;
                this.question[1] = question1 - question2;
                break;

            case 'x':
                this.question[0] = `${question1} x ${question2}`;
                this.question[1] = question1 * question2;
                break;

            case ':':
                this.question[0] = `${question1} : ${question2}`;
                this.question[1] = question1 / question2;
                break;

            default:
                break;
        }
        console.log('question', this.question[0])

        this.questionText.setText(this.question[0]);
    }


    checkAnswer(){
        if(this.number == this.question[1]){
            alert('You winn!')
        }
    }


}