/// we have to create template
import Phaser from "phaser";

export default class collectingStarScene extends Phaser.Scene {
    constructor() {
        // this is for the name of the scene that we're going to use
        super(`collecting-star-scene`);
    }

    init() {
        this.platforms = undefined;
        // create new var to store the player properties
        this.player = undefined;

        this.stars = undefined;
        // we create this.properties for storing the key

        this.cursor = undefined;

        this.titleGame = undefined;
        this.score = 0;
    }

    // load the asset from public folder
    preload() {
        // we have to pass two parameter
        // 1st the name file that we're going to use
        // 2nd parameter for the path of the file

        // static image, it's just only for one image, it doesn't haveanimation
        const imageAsset = [
            {
                key: 'bomb',
                path: 'images/bomb.png',
            },
            {
                key: 'sky',
                path: 'images/sky.png',
            },
            {
                key: 'star',
                path: 'images/star.png',
            },
            {
                key: 'ground',
                path: 'images/platform.png',
            },
        ];

        imageAsset.forEach((data, index) => {
            this.load.image(data.key, data.path);
        })
        // load the main character, consit of more than one images(animaton)
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
        //    this.add.image(200,100, 'ttt');

        // console.log('platform:', this.platforms);

        // this is for the physics
        this.platforms = this.physics.add.staticGroup();


        // we want to render the platform to the browser
        // 3 parameter, x : number, y :number, the name of file : 'string'
        this.platforms.create(15, 50, 'ground');
        this.platforms.create(340, 200, 'ground');
        this.platforms.create(200, 450, 'ground');
        this.platforms.create(750, 400, 'ground');

        // this for bottom ground
        this.platforms.create(400, 570, 'ground').setScale(2).refreshBody();

        /// add the player spirtesheet to browser or to the game with gravitiy
        this.player = this.physics.add.sprite(300, 500, 'player');
        this.player.setCollideWorldBounds(true)

        // we add collider so the player won't pass through the platform or the ground

        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 100,
            setXY: { x: 2, y: 0, stepX: 10 }
        })

        this.physics.add.collider(this.stars, this.platforms);
        // add the bounce effect whenever the start is just collide with the ground or the p;atform
        this.stars.children.iterate(function (child) {
            child.setBounceY(0.7);
        })

        //define to detect the key when it's being pressed
        this.cursor = this.input.keyboard.createCursorKeys();

        // for move left animation(dynamic)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        // move right animation(dynamic)
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        // idle animation(static)
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 15
        })

        // overlap for between the player object and star object
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);


        // creating a text to show

        this.titleGame = this.add.text(15, 15, 'My game', { fontSize: '40px' })
    }

    update() {
        const moveLeft = this.cursor.left.isDown;
        const moveRight = this.cursor.right.isDown;
        const jump = this.cursor.space.isDown;

        if (moveLeft) {
            // alert('The left arrow key is pressed!')
            this.player.setVelocityX(-200)
            this.player.anims.play('left', true)
        }
        else if (moveRight) {
            // alert('The right arrow is pressed!')
            this.player.setVelocityX(200)
            this.player.anims.play('right', true)
        }
        else if (jump) {
            // alert('The space key is pressed!')
            this.player.setVelocityY(-200)
            this.player.anims.play('turn')
        }
    }

    collectStar(player, star) {
        star.destroy()
        this.score+=10;
        console.log('The current score:', this.score)
    }
    gameOver(player,bomb){
    }


}