import Phaser from 'phaser'

export default class mathfighterscene extends Phaser.Scene {
    constructor() {
        super('math-fighter-scene')
    }

    init() {
        this.player = undefined
        this.startGame = false
        this.questionText = undefined
        this.resultText = undefined
        this.enemy = undefined
        this.slash = undefined
        this.gameHalfWidth = this.scale.width * 0.5;
        this.gameHalfHeight = this.scale.height * 0.5;
        this.gameScreenHalfWidth = this.scale.width * 0.5;
        this.gameScreenHalfHeight = this.scale.height * 0.5;
        this.button1 = undefined
        this.button2 = undefined
        this.button3 = undefined
        this.button4 = undefined
        this.button5 = undefined
        this.button6 = undefined
        this.button7 = undefined
        this.button8 = undefined
        this.button9 = undefined
        this.buttonDel = undefined
        this.buttonOk = undefined
        this.number = 0
        this.numberArray = []

    }
    preload() {
        this.load.image('background', 'images/bg_layer1.png')
        this.load.image('replay', 'images/replay.png')
        this.load.spritesheet('player', 'images/warrior1.png', {
            frameHeight: 80,
            frameWidth: 80
        })
        this.load.image('tile', 'images/tile.png')
        this.load.spritesheet('enemy', 'images/warrior2.png', {
            frameHeight: 80,
            frameWidth: 80
        })
        this.load.image('start_button', 'images/start_button.png')
        this.load.spritesheet('slash', 'images/slash.png', {
            frameHeight: 88,
            frameWidth: 42
        })
        this.load.spritesheet('numbers', 'images/numbers.png', {
            frameHeight: 71.25,
            frameWidth: 131
        })
        this.load.image('gameover', 'images/gameover.png')
        this.load.image('fight-bg', 'images/fight-bg.png')
        this.load.image('start-btn', 'images/start_button.png')
    }

    create() {
        this.add.image(240, 320, 'background')
        const fight_bg = this.add.image(240, 160, 'fight-bg')
        const tile = this.physics.add.staticImage(240, fight_bg.height - 40, 'tile')

        this.player = this.physics.add.sprite(
            this.gameHalfWidth - 150,
            this.gameHalfHeight - 50, 'player')
            .setBounce(0.2)
            .setOffset(-20, -10)
        this.physics.add.collider(this.player, tile)

        this.enemy = this.physics.add.sprite(
            this.gameHalfWidth + 150,
            this.gameHalfHeight - 50, 'enemy')
            .setBounce(0.2)
            .setOffset(-20, -10)
            .setFlipX(true)
        this.physics.add.collider(this.enemy, tile)

        this.slash = this.physics.add.sprite(240, 60, 'slash')
            .setActive(false)
            .setVisible(false)
            .setGravityY(-500)
            .setOffset(0, - 10)
            .setDepth(1)
            .setCollideWorldBounds(true)

        this.createstartButton()



    }

    update() { }

    createAnimation() {
        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers
                ('player', { start: 15, end: 19 }),
            frameRate: 10,
        })


        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers
                ('player', { start: 10, end: 14 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'player-die',
            frames: this.anims.generateFrameNumbers
                ('player', { start: 0, end: 4 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'enemy-stadby',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'enemy-standby',
            frames: this.anims.generateFrameNumbers
                ('enemy', { start: 15, end: 19 }),
            frameRate: 10,
        })


        this.anims.create({
            key: 'enemy-attack',
            frames: this.anims.generateFrameNumbers
                ('enemy', { start: 10, end: 14 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'enemy-die',
            frames: this.anims.generateFrameNumbers
                ('enemy', { start: 0, end: 4 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'enemy-standby',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
            frameRate: 10,
        })
    }

    gameStart() {
        this.startGameme = true
        this.player.anims.play('player-standby', true)
        this.enemy.anims.play('enemy-standby', true)
        this.resultText = this.add.text(this.gameHalfWidth, 200, '0', { fontSize: '32px', color: '#000' })
        this.questionText = this.add.text(this.gameHalfWidth, 100, '0', { fontSize: '32px', color: '#0000' })
        this.input.on('gameobjectdown', this.addNumber, this)
    }

    createstartButton() {
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight + 181, 'start-btn').setInteractive()

        start_button.once('pointerdown', () => {
            this.gameStart();
            start_button.destroy();
            this.createNumberButtons();
        }, this)

    }

    createNumberButtons() {
        const widthDifference = 131;
        const heightDifference = 71.25;

        const startPosY = this.scale.height - 230;

        // left side
        this.button1 = this.add.image(this.gameScreenHalfWidth - widthDifference, startPosY, 'numbers', 0).setInteractive().setData(`value`, 1);
        this.button4 = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button1.y + heightDifference, 'numbers', 3).setInteractive().setData(`value`, 4);
        this.button7 = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button4.y + heightDifference, 'numbers', 6).setInteractive().setData(`value`, 7);
        this.buttonDel = this.add.image(this.gameScreenHalfWidth - widthDifference, this.button7.y + heightDifference, 'numbers', 9).setInteractive().setData(`value`, 'del');

        // middle

        this.button2 = this.add.image(this.gameScreenHalfWidth, startPosY, 'numbers', 1).setInteractive().setData(`value`, 2);
        this.button5 = this.add.image(this.gameScreenHalfWidth, this.button2.y + heightDifference, 'numbers', 4).setInteractive().setData(`value`, 5);
        this.button8 = this.add.image(this.gameScreenHalfWidth, this.button5.y + heightDifference, 'numbers', 7).setInteractive().setData(`value`, 8);
        this.button0 = this.add.image(this.gameScreenHalfWidth, this.button8.y + heightDifference, 'numbers', 10).setInteractive().setData(`value`, 0);

        // right
        this.button3 = this.add.image(this.gameScreenHalfWidth + widthDifference, startPosY, 'numbers', 2).setInteractive().setData(`value`, 3);
        this.button6 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button3.y + heightDifference, 'numbers', 5).setInteractive().setData(`value`, 6);
        this.button9 = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button6.y + heightDifference, 'numbers', 8).setInteractive().setData(`value`, 9);
        this.buttonOk = this.add.image(this.gameScreenHalfWidth + widthDifference, this.button9.y + heightDifference, 'numbers', 11).setInteractive().setData(`value`, 'ok')
    }

    addNumber(pointer, object, event) {
        let value = object.getData('value');
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

                alert('You pressed the ok button');

                // the script answer validation here

            }

        }
        // if the value is a number
        else {
            // if the array has only one element which is 0, replace it with a new number
            if (this.numberArray.length == 1 && this.numberArray[0] == 0) {
                // redeclare or replace the number 0 to the selected one
                this.numberArray = value;
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




        this.number = parseInt(this.numberArray.join(''))
        this.resultText.setText(this.number)
        const textHalfWidth = this.resultText.width * 0.5
        this.resultText.setX(this.gameHalfWidth - textHalfWidth)

    }
    getOperator() {
        const operator = ['+', '-', 'x', ':']
        return operator[Phaser.Math.Between(0, 3)]
    }
}