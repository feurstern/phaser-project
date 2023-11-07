import Phaser from "phaser";

const mainChar = 'player'

const imageAsset =[
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
        isBackground: '',
        x: 0,
        y: 0
    },
    {
        key: 'platform',
        path: 'images/platform.png',
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

const playerAnim = [
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
        frame: null
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
        isBase: false,
    },
    {
        x: 200,
        y: 470,
        key: platformName,
        isBase: false,
    },
    {
        x: 200,
        y: 200,
        key: platformName,
        isBase: false,
    },
    {
        x: 400,
        y: 568,
        key: platformName,
        isBase: true,
    },
]

export default class L1 extends Phaser.Scene{

    constructor(){
        super (`test`);
    }
    init(){
        //store properties
        this.platform = undefined;
        this.player = undefined;
        this.star = undefined;
        this.cursor = undefined;
    }

    preload(){
        //load asset
        imageAsset.forEach((data)=>{
            if(data.isStaticImage){
                this.load.image(data.key, data.path)
            }
            else{
                this.load.spritesheet(data.key, data.path, {frameHeight: 48, frameWidth: 32})
                console.log(data)
            }
        
        })
    }

    create(){
        //render asset in browser
        this.add.image(400,300,'sky');
        this.platform = this.physics.add.staticGroup();
        platformGroup.forEach((xyz) =>{
            if(xyz.isBase){
                this.platform.create(xyz.x, xyz.y, xyz.key).setScale(2).refreshBody()
            }
            else{
                this.platform.create(xyz.x, xyz.y, xyz.key);
            }
            this.createPlayer()
            this.spawnStar()
            this.cursor = this.input.keyboard.createCursorKeys()
            this.createPlayerAnim()
        })

    }
    createPlayer() {
        this.player = this.physics.add.sprite(400, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);
    }

    createPlayerAnim(){
        for(let i=0;i<playerAnim.length;i++){
            // console.log(i)
            if(playerAnim[i].isStatic){
                this.anims.create({
                    key: playerAnim[i].key,
                    frames: [{key: mainChar, frame: playerAnim[i].startFrame}],
                    frameRate: playerAnim[i].frame,
                    repeat: playerAnim[i].repeat
                })
            }
            else{
                this.anims.create({
                    key: playerAnim[i].key,
                    frames: this.anims.generateFrameNumbers(mainChar, {start: playerAnim[i].startFrame, end: playerAnim[i].endFrame}),
                    frameRate: playerAnim[i].frame,
                    repeat: playerAnim[i].repeat
                })
            }
        }
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
        console.log('is collide')
    }

    playerMove(){
        let moveLeft = this.cursor.left.isDown
        let moveRight = this.cursor.right.isDown
        let jump = this.cursor.space.isDown

        if(moveLeft){
            this.player.setVelocityX(-200)
            this.player.anims.play('left', true)
        }
        else if(moveRight){
            this.player.setVelocityX(200)
            this.player.anims.play('right', true)
        }
        else if(jump){
            this.player.setVelocityY(-200)
        }
    }
    update(){
        this.playerMove();
    }
}