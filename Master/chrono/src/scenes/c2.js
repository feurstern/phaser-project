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

        this.correctAnswer = false;


        this.playerAttack = false;
        this.enemyAttack = false;

        this.score = 0;
        this.scoreLabel = undefined;

        // set the duration for the player to answer the question;
        this.timer = 10;
        this.timerLabel = undefined;
        this.countDown = undefined;

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
        this.physics.add.overlap(this.player, this.enemy, this.spriteHit, this, null)
        this.physics.add.overlap(this.enemy, this.player, this.spriteHit, this, null)
        this.createTimer();
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
            this.generateQuestion();
            this.createTextLabel()

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

        this.input.on(`gameobjectdown`, this.addNumber, this);

        this.countDown = this.time.addEvent({
            delay: 1000,
            callback: this.gameOver,
            callbackScope: this,
            loop: true
        })

        // this.input.on('gameobjectdown', this.generateQuestion, this)
    }

    createButtonNumber() {
        const startPosY = this.scale.height - 246;
        const widthDifference = 131;
        const heightDifference = 71.25;

        // middle button
        this.button2 = this.add.image(this.screenHalfWidth, startPosY, 'numbers', 1).setInteractive().setData(`value`, 2);
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
            if (value == 'del') {
                // set default number to 0
                this.numberArray.pop();
                if (this.numberArray.length < 1) {
                    this.numberArray[0] = 0;
                    // console.log('deleted')
                }

            }

            if (value == 'ok') {

                this.checkAnswer()
                this.numberArray = []
                this.numberArray[0] = 0
                this.generateQuestion();
            }


        }
        else {
            // to check whether the amount of number 
            if (this.numberArray.length == 1 && this.numberArray[0] == 0) {
                // we reassign the value 
                this.numberArray.shift();
                this.numberArray.push(value);
                console.log('Number added!', value, 'length: ', this.numberArray.length)
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
                if (question1 < question2) {
                    this.question[0] = `${question2} - ${question1}`;
                    this.question[1] = question2 - question1;

                }
                else {
                    this.question[0] = `${question1} - ${question2}`;
                    this.question[1] = question1 - question2;
                }
                break;

            case 'x':
                this.question[0] = `${question1} x ${question2}`;
                this.question[1] = question1 * question2;
                break;

            case ':':
                let number = 0;
                do {
                    question1 = Phaser.Math.Between(0, 50);
                    question2 = Phaser.Math.Between(0, 50);
                    // number = question1/ question2;
                    // console.log('number:', number);
                }
                while (!Number.isInteger(question1 / question2)) {
                    this.question[0] = `${question1} / ${question2}`;
                    this.question[1] = question1 / question2
                }
                // if (question1 < question2) {
                //     this.question[0] = `${question2} : ${question1}`;
                //     this.question[1] = question2 / question1;

                // }
                // else{
                //     this.question[0] = `${question1} : ${question2}`;
                //     this.question[1] = question1 / question2;

                // }
                break;

            default:
                break;
        }
        // console.log('question', this.question[0])

        this.questionText.setText(this.question[0]);
    }


    checkAnswer() {
        if (this.number == this.question[1]) {
            alert('You winn!')
            this.correctAnswer = true;
            this.score += 1;
            this.scoreLabel.setText(`score : ${this.score}`)
            this.timer = 10;
            
        }
        else {
            alert('the answer is incorrect')
            this.correctAnswer = false;
        }

    }

    createAttakSlash(x, y, frame, velocity, flip = false) {
        this.slash.setPosition(x, y).setActive(true)
            .setVisible(true)
            .setFrame(frame)
            .setFlipX(flip)
            .setVelocityX(velocity);
    }

    createAttackMovement() {
        if (this.correctAnswer === true && !this.playerAttack) {
            this.player.anims.play('player-attack', true);
            this.time.delayedCall(500, () => {
                this.createAttakSlash(this.player.x + 100, this.player.y, 4, 600)
                console.log('player attack!')
            })
            this.playerAttack = true
            // this.correctAnswer = undefined
        }

        if (this.correctAnswer === undefined) {
            this.player.anims.play('player-standby', true);
            this.enemy.anims.play('enemy-standby', true);
        }

        if (this.correctAnswer === false & !this.enemyAttack) {
            this.enemy.anims.play('enemy-attack', true);
            this.time.delayedCall(500, () => {
                this.createSlash(this.enemy.x - 60, this.enemy.y, 2, -600, true);
                console.log('enemy attack!', this.correctAnswer)
            })

            this.enemyAttack = true;
        }
    }

    spriteHit(slash, sprite) {
        slash.x = 0;
        slash.y = 0;
        slash.setActive(false);
        slash.setV = isible(false);
        if (sprite.text.key == 'player') {
            sprite.anims.play('player-hit', true)
            console.log('player get hit!')
        }
        else {
            sprite.anims.play('enemey-hit', true)
            console.log('enemy get hit!')
        }
        this.time.delayedCall(500, () => {
            this.playerAttack = false;
            this.enemyAttack = false;
            this.correctAnswer = undefined
        })
    }

    createTextLabel() {
        this.scoreLabel = this.add.text(250, 30, `score : ${this.score}`, {
            fontSize: '20px',
            color: "black"
        });
    }

    createTimer() {
        this.timerLabel = this.add.text(20, 10, `Time :${this.timer}`, {
            fill: 'white',
            backgroundColor: 'black'
        }).setDepth(1)
    }

    gameOver() {
        this.timer--;
        this.timer < 0 ? alert('the game has ended!') : 0
    }

    update() {
        // this.generateQuestion();
        this.createAttackMovement()
        this.starGame = true ? this.timerLabel.setText(`Time : ${this.timer}`) : 0;
        // this.scoreLabel.setText(`score : ${this.score}`);
    }


}


// notes
// this.number is the  user answer

