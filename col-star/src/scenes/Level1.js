import Phaser from "phaser";


const mainCharacter = 'player'

const imageAsset = [

    {
        key: 'bomb',
        path: '/images/bomb.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'player',
        path: '/images/dude.png',
        isStaticImage: false,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'platform',
        path: '/images/platform.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'sky',
        path: '/images/sky.png',
        isStaticImage: true,
        isBackground: true,
        x: 0,
        y: 0
    },

    {
        key: 'star',
        path: '/images/star.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
]

// array to store motion from the player
const playerAnimation = [
    {
        key: 'left',
        startFrame: 0,
        endFrame: 3,
        isStatic: false,
        repeat: -1,
        frame: 10
    },
    {
        key: 'front',
        startFrame: 4,
        endFrame: null,
        isStatic: true,
        repeat: null,
        frame: 15
    },
    {
        key: 'right',
        startFrame: 5,
        endFrame: 8,
        isStatic: false,
        repeat: -1,
        frame: 10
    },
]

const platformName = 'platform'
const platformGroup = [
    {
        x: 600,
        y: 350,
        key: platformName,
        isGround: false
    },
    {
        x: 200,
        y: 470,
        key: platformName,
        isGround: false
    },
    {
        x: 200,
        y: 200,
        key: platformName,
        isGround: false
    },
    {
        x: 400,
        y: 568,
        key: platformName,
        isGround: true
    },

]
// export 
export default class LevelOne extends Phaser.Scene {

    init() {
        //  to srore properties of the game object
        this.platform = undefined;
        this.player = '';
        this.star = 1;
        this.cursor = false;
        this.score = 0;
      
    }

    preload() {
        // to load the assset

        // we have to use loop, while do while, for loop. map, foreach
        imageAsset.forEach((data) => {
            // console.log(data);
            if (data.isStaticImage) {
                this.load.image(data.key, data.path)
                console.log(data)
            }
            else {
                this.load.spritesheet(data.key, data.path, { frameHeight: 48, frameWidth: 32 })
            }
        })

    }

    create() {
        // render the asset to browser, we can do some changes to the properties
        this.add.image(400, 300, 'sky');
        this.platform = this.physics.add.staticGroup();

        platformGroup.forEach((data) => {
            if (data.isGround) {
                this.platform.create(data.x, data.y, data.key).setScale(2).refreshBody()
            }
            else {
                this.platform.create(data.x, data.y, data.key);
            }
        })

        this.createPlayer();
        this.spawnStar();

        this.cursor = this.input.keyboard.createCursorKeys();

        this.createPlayerAnimation();
    }

    // additional method outside from the pas
    createPlayer() {
        this.player = this.physics.add.sprite(400, 450, 'player')
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);
    }

    createPlayerAnimation() {
        // i  = iteration
        console.log('player left animation', playerAnimation[0].key);
        // for (let i = 0; i < playerAnimation.length; i++) {
        //     //
        //     if (playerAnimation[i].isStatic) {
        //         this.anims.create({
        //             key: playerAnimation[i].key,
        //             frames: [{ key: mainCharacter, frame: playerAnimation[i].startFrame }],
        //             frameRate: playerAnimation[i].frame
        //         })
        //     }
        //     else {
        //         this.anims.create({
        //             key: playerAnimation[i].key,
        //             frames: this.anims.generateFrameNumbers(mainCharacter, { start: playerAnimation[i].startFrame, end: playerAnimation[i].endFrame }),
        //             frameRate : playerAnimation[i].frame,
        //             repeat: playerAnimation[i].repeat
        //         })
        //     }
        // }

        playerAnimation.forEach((data) => {
            if (data.isStatic) {
                this.anims.create({
                    key: data.key,
                    frames: [{ key: mainCharacter, frame: 4 }],
                    frameRate: data.frame
                })
            }
            else {
                 console.log('current range', data.startFrame, 'end :', data.endFrame)
                this.anims.create({
                    key: data.key,
                    frames: this.anims.generateFrameNumbers(mainCharacter, { start: data.startFrame, end: data.endFrame }),
                    frameRate: data.frame,
                    repeat: data.repeat
                })
            }
        })
    }

    spawnStar() {

        this.star = this.physics.add.group({
            key: 'star',
            repeat: 20,
            setXY: { x: 40, y: 0, stepX: 65 }
        })
        this.physics.add.collider(this.star, this.platform)

        this.star.children.iterate((e) => {
            e.setBounceY(0.7);
        })

        this.physics.add.overlap(this.player, this.star, this.collectStar, null, this)

    }

    collectStar(player, star){
        star.destroy();
        this.score+=1;
        console.log('score:', this.score);
    }

    playerMovement() {
        let moveLeft = this.cursor.left.isDown;
        let moveRight = this.cursor.right.isDown;
        let jump = this.cursor.space.isDown;

        if (moveLeft) {
            // console.log('You pressed left arrow')
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (moveRight) {
            // console.log('You press right arrow')
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else if (jump) {
            // console.log('You press space bar');
            this.player.setVelocityY(-200)
        }

    }

    update() {
        this.playerMovement();
    }
}