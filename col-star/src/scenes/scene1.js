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
        this.cursor = undefined;
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

        this.cursor = this.input.keyboard.createCursorKeys();

        const playerFrame = [
            {
                key:'left',
                spriteName:'player',
                startFrame : 0,
                endFrame: 3,
                frameRate:20,
                repeat: -1,
                isStatic : false
            },
             {
                key:'turn',
                spriteName:'player',
                startFrame : 4,
                endFrame: null,
                frameRate:20,
                repeat: null,
                isStatic :true
            },
             {
                key:'right',
                spriteName:'player',
                startFrame : 5,
                endFrame: 8,
                frameRate:20,
                repeat: -1,
                isStatic : false
            },
        ]


        playerFrame.forEach((data)=>{
            if(data.isStatic){
                this.anims.create({
                    key: data.key,
                    frames : [{key: data.spriteName, frame: data.startFrame}],
                    frameRate : data.frameRate
                })
            }
            else{
                this.anims.create({
                    key:data.key,
                    frames: this.anims.generateFrameNumbers(data.spriteName, {start:data.startFrame, end: data.endFrame}),
                    frameRate : data.frameRate,
                    repeat: data.repeat
                })
            }
        })

    
    }


    update() {

        let moveLeft = this.cursor.left.isDown;
        let moveRight = this.cursor.right.isDown;
        let jump = this.cursor.up.isDown;
        let down = this.cursor.down.isDown;

        if (moveLeft) {
            this.player.setVelocity(-200, 200);
            this.player.anims.play('left', true);
            if(!moveLeft){
                this.player.anims.pause()
            }
        }
        else if(moveRight){
            this.player.setVelocityX(200,200);
            this.player.anims.play('right', true)
        }
        else if(jump){
            this.player.setVelocityY(-200)
            this.player.anims.play('turn', true)
        }
        else if(down){
            this.player.setVelocityY(200);
            this.player.anims.play('turn', true);
        }

        document.addEventListener('keyup', (e)=>{
            console.log('key:', e.key)
            if(e.key ==='ArrowLeft'){
                moveLeft = false;
            }
        })
    }


}