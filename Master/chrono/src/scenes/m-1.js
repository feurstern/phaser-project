import Phaser from "phaser";
import { imageAsset } from "./MathAsset";
import { playerAnimation, enemyAnimation, assetAnimation } from "./Animation";

export default class MathFigther1 extends Phaser.Scene {
    constructor() {
        super(`math-scene-1`)

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

        // the actual number for validation
        this.number = 0;
        // the temporary array to store the number;
        this.numberArray = [];
        // end pr


        // storing the text of the question
        this.question = undefined;
        // storing the answer key of the question
        this.answerKey = undefined;


        this.score = 0;
        this.scoreLabel = undefined;

        this.timer = 10;
        this.timerLabel = undefined;
        this.countDown = 'sdsds';





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
            // console.log('the question text:', this.questionText);
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

        this.questionText = this.add.text(this.gameScreenHalfWidth, this.resultText.y + 40, `0`, {
            fontSize: '24px',
            fill: "red"
        });


        this.scoreLabel = this.add.text(10, 30, `the score : ${this.score}`, {
            fontSize: '18px',
            fill: 'red'
        })

        this.timerLabel = this.add.text(200, 30, `current time : ${this.timer}`, {
            fontSize: '18px',
            fill: "red"
        })

        this.input.on('gameobjectdown', this.addNumber, this);

        this.generateQuestion();

        this.countDown = this.time.addEvent({
            delay: 1000,
            callback: this.gameOver,
            callbackScope: this,
            loop: true
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
        this.button8 = this.add.image(this.gameScreenHalfWidth, this.button5.y + heightDifference, 'numbers', 7).setInteractive().setData(`value`, 8);
        this.button0 = this.add.image(this.gameScreenHalfWidth, this.button8.y + heightDifference, 'numbers', 10).setInteractive().setData(`value`, 0);

        // right
        this.button3 = this.add.image(this.gameScreenHalfWidth + widthDifference, startPosY, 'numbers', 2).setInteractive().setData(`value`, 3);
        this.button6 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button3.y + heightDifference, 'numbers', 5).setInteractive().setData(`value`, 6);
        this.button9 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button6.y + heightDifference, 'numbers', 8).setInteractive().setData(`value`, 9);
        this.buttonOk = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button9.y + heightDifference, 'numbers', 11).setInteractive().setData(`value`, `ok`);

    }


    addNumber(pointer, object, event) {

        let value = object.getData(`value`);

        // we check if the value is a string
        if (isNaN(value)) {
            // the button delete and ok will go to this script
            // or process

            // when the user click del button
            if (value == 'del') {
                // delete the last element of the array
                this.numberArray.pop();

                // when got nothing or when the array is empty we set default number to 0
                this.numberArray.length < 1 ? this.numberArray[0] = 0 : 0 // we just do nothing

            }
            // when the user click button ok
            else if (value == 'ok') {

                // alert('You pressed the ok button');
                this.checkAnswer();

                // we generat the question again
                this.generateQuestion();

                this.numberArray = [];
                this.numberArray[0] = 0;
                // the script answer validation here

            }

        }
        // if the value is a number
        else {
            // if the array has only one element which is 0, replace it with a new number
            if (this.numberArray.length == 1 && this.numberArray[0] == 0) {
                // redeclare or replace the number 0 to the selected one
                // console.log('it goes here');
                this.numberArray.shift();
                this.numberArray.push(value);
            }
            // for storting the array and limit the array
            else if (this.numberArray.length < 10) {
                // if the array length is no more than 9
                // then we push the value to the temporary array
                this.numberArray.push(value);
            }
        }

        // Join the array elemets into a sting and convert it into into integer
        this.number = parseInt(this.numberArray.join(''));

        // redeclare or override the result text
        this.resultText.setText(this.number);

    }


    generateQuestion() {
        // this will get random number start from 0 - 50
        let firstNumber = Math.floor(Math.random() * 50);
        let secondNumber = Math.floor(Math.random() * 50);
        let operator = ["+", "-", "/", "*"];
        let getRandomOperator = operator[Phaser.Math.Between(0, 3)];

        // checking the operator for set the question and answer key based on math operator
        switch (getRandomOperator) {
            case "+":
                // set the string for displaying to the game or to the player
                this.question = `${firstNumber} + ${secondNumber}`; // it has string, because we're using template literal
                // set the answer key for checking or to validate the player answer
                this.answerKey = firstNumber + secondNumber; // it has number data type
                break;

            case "*":
                this.question = `${firstNumber} x ${secondNumber}`;
                this.answerKey = firstNumber * secondNumber;
                break;

            case "-":
                // if the secondNumber > firstNumber
                if (firstNumber < secondNumber) {
                    // then we rearrange the order, to avoid the negative value
                    this.question = `${secondNumber} - ${firstNumber}`;
                    this.answerKey = secondNumber - secondNumber;

                }
                else {
                    this.question = `${firstNumber} - ${secondNumber}`;
                    this.answerKey = firstNumber - secondNumber;

                }
                break;

            case "/":
                //  this code below for redeclaring the variable until both division is number not decimal;
                do {
                    firstNumber = Math.floor(Math.random() * 50);
                    secondNumber = Math.floor(Math.random() * 50);
                }
                // we will stop until the result of the both of variable is number
                while (!Number.isInteger(firstNumber / secondNumber)) {
                    this.question = `${firstNumber} :${secondNumber}`;
                    this.answerKey = firstNumber / secondNumber;
                }
        }// end of switch

        // we want to rerender the text from the question;
        this.questionText.setText(this.question);

    }


    checkAnswer() {
        if (this.answerKey == this.number) {
            alert('You are correct');

            this.score += 1;
            this.scoreLabel.setText(`the score : ${this.score}`)
        }
        else {
            alert('You are incorrect')
        }
    }

    gameOver() {
        this.timer--;
        this.timerLabel.setText(`current time : ${this.timer}`)
        // console.log('current time:', this.timer);

    }


    update() {

    }
} 