/// we have to create template
import Phaser from "phaser";

export default class collectingStarScene extends Phaser.Scene {
    constructor() {
        // this is for the name of the scene that we're going to use
        super(`collecting-star-scene`);
    }

    init() {
        this.platforms = undefined;
        //create player
        this.player = undefined;
        this.star = undefined;
        this.cursor = undefined;
        this.scoreText = undefined;
        this.score = 0;
    }

    // load the asset from public folder
    preload() {
        // we have to pass two parameter
        // 1st the name file that we're going to use
        // 2nd parameter for the path of the file

        this.load.image('bomb', 'images/bomb.png');
        this.load.image('sky', 'images/sky.png');
        this.load.image('star', 'images/star.png');
        this.load.image('ground', 'images/platform.png');

        // load the main character

        this.load.spritesheet('player', 'images/dude.png',
            {
                frameWidth: 32,
                frameHeight: 48,
            }
        )
    }

    // create an object to render to browser
    create() {
        // we have to use add method

        /*
            whenever you want to render the game object to the browser
            you have to use the 'this.add.image''s method, and this method
            contain 3 parameters
            first parameter is for the x axis
            second paramter for the y axis
            third paramater for the name of that file that we created before
        */
        // we render the sky to browsaer
        this.add.image(400, 300, 'sky');

        console.log('platform:', this.platforms);

        // this is for the physics
        this.platforms = this.physics.add.staticGroup();


        // we want to render the platform to the browser
        // 3 parameter, x : number, y :number, the name of file : 'string'
        this.platforms.create(15, 50, 'ground');
        this.platforms.create(350, 200, 'ground');
        this.platforms.create(200, 450, 'ground');
        this.platforms.create(700, 400, 'ground');
        // create bottom platform for the ground
        this.platforms.create(400, 570, 'ground').setScale(2).refreshBody();
        this.player = this.physics.add.sprite(200, 450, 'player');
        this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.platforms, this.player);

        this.star = this.physics.add.group({
            key: 'star',
            repeat: 20,
            setXY: { x: 50, y: 0, stepX: 50 }
        })
        this.physics.add.collider(this.star, this.platforms);

        const playerAnimationFrame = [
            {
                key: 'left',
                spriteName: 'player',
                startFrame: 0,
                endFrame: 3,
                frameRate: 10,
                repeat: -1,
                isStatic: false

            },
            {
                key: 'turn',
                spriteName: 'player',
                startFrame: '4',
                endFrame: null,
                frameRate: 20,
                repeat: null,
                isStatic: true

            },

            {
                key: 'right',
                spriteName: 'player',
                startFrame: 5,
                endFrame: 8,
                frameRate: 10,
                repeat: -1,
                isStatic: false
            },
        ];

        this.cursor = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(16,16, 'The score: 0', {fontSize: '32px',});

        playerAnimationFrame.forEach((data, index) => {
            if (data.isStatic) {
                this.anims.create({
                    key: data.key,
                    frames: [{ key: data.spriteName, frame: data.startFrame }],
                    frameRate: data.frameRate
                })
            }
            else {
               this.anims.create({
                    key:data.key,
                    frames: this.anims.generateFrameNumbers(data.spriteName, {start:data.startFrame, end: data.endFrame}),
                    frameRate : data.frameRate,
                    repeat: data.repeat
                })
                console.log('left right', index+1)
                
            }
            // this.
            this.physics.add.overlap(this.player, this.star, this.collectStar, null, this)
        })
    }
    
    update(){
        const moveLeft = this.cursor.left.isDown;
        const moveRight = this.cursor.right.isDown
        const jump = this.cursor.space.isDown;

        if(moveLeft){
            this.player.setVelocityX(-200);
            this.player.anims.play('left');
            
        }
        else if(moveRight){
            this.player.setVelocityX(200);
            this.player.anims.play('right', true)
        }
        else if(jump){
            this.player.setVelocityY(-200)
            this.player.anims.play('turn')
        }

        if(this.score>50){
            this.physics.pause();
            this.add.text(300,300, 'You winn', {fontSize:'58px'})
        }
    }
    collectStar(player,star){
        star.destroy()
        this.score+=10;
        this.scoreText.setText('Score:', this.score);
        console.log(this.score)

    }
}