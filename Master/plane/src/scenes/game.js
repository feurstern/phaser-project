import Phaser from "phaser";
import Object from "./FallObkject";

const imageAsset =[
    {
        key: "bg",
        path: "image/bg_layer1.png",
        isStatic: true
    },
    {
        key: "enemy",
        path: "image/enemy.png",
        isStatic: true
    },
    {
        key: "laser",
        path: "image/laser-bolts.png",
        isStatic: false,
        isProjectile: true
    },
    {
        key: "right-btn",
        path: "image/right-btn.png",
        isStatic: true
    },
    {
        key: "left-btn",
        path: "image/left-btn.png",
        isStatic: true
    },
    {
        key: "shoot-btn",
        path: "image/shoot-btn.png",
        isStatic: true
    },
    {
        key: "explosion",
        path: "image/explosion.png",
        isStatic: true
    },
    {
        key: "replay",
        path: "image/replay.png",
        isStatic: true
    },
    {
        key: "player",
        path: "image/ship.png",
        isStatic: false,
        isProjectile: false
    },
    {
        key: "handsanitizer",
        path: "image/handsanitizer.png",
        isStatic: true
    },
    {
        key: "gameOver",
        path: "image/gameover.png",
        isStatic: true
    },
    {
        key: "cloud",
        path: "image/cloud.png",
        isStatic: true
    },
]

const playerAnim=[
    {
        key: "turn",
        isStatic: "false",
        startFrame: 0,
        endFrame: null,
        spriteName: 'player'
    },
    {
        key: "left",
        isStatic: "false",
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player'
    },
    {
        key: "right",
        isStatic: "false",
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player'
    },
]

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('game')
    }

    init(){
        this.leftBtn = '';
        this.rightBtn = '';
        this.shootBtn = 22323;
        this.cloud = '';
        this.player = '';
        this.speed = 160;
        this.cursors = null
        this.enemy = '';
        
    }

    preload(){
        imageAsset.forEach(dt =>{
            if(dt.isStatic){
                console.log('static', dt)
                this.load.image(dt.key, dt.path)
            }
            else if(!dt.isStatic && !dt.isProjectile){
                console.log('spritesheet load player', dt)
                this.load.spritesheet(dt.key, dt.path, {
                    frameWidth: 66,
                    frameHeight: 66,
                })

            }
            else if(!dt.isStatic && dt.isProjectile){
                console.log('spritesheet load laser', dt)
                this.load.spritesheet(dt.key, dt.path, {
                    frameWidth: 66,
                    frameHeight: 66,
                    
            })
        }
        })
    }
    

    create(){
        const screenHeight = this.scale.height
        const screenWidth = this.scale.width   
        this.add.image(screenWidth, screenHeight, 'bg')
        // this.createCloud()
        this.createButton()
        this.createPlayer()
        this.createEnemy()
        console.log('enemy', this.createEnemy());
        console.log('cloud', this.createCloud())
        this.cursors = this.input.keyboard.createCursorKeys()
        this.timeInterval();
    }

    createCloud(){
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 14
        })
        //this.cloud = this.add.image(50, 200, 'cloud')
        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds)
    }

    moveCloud(){
        this.cloud.children.iterate(e =>{
            e.setVelocityY(50)

            e.y > this.scale.height?(
                e.y = 0,
                e.x = Math.floor(Math.random() * this.scale.width)
            )
            :0
        })
    }

    createButton(){
        this.leftBtn = this.add.image(50, 500, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0.5);
        this.rightBtn = this.add.image(150, 500, 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.5);
        this.shootBtn = this.add.image(325, 500, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.5);
        //ui or ux usage
        this.leftBtn.on('pointerdown', ()=>{
            this.leftBtn = true;
        })
        this.leftBtn.on('pointerup', ()=>{
            this.leftBtn = false;
        })
        this.rightBtn.on('pointerdown', ()=>{
            this.rightBtn = true;
        })
        this.rightBtn.on('pointerup', ()=>{
            this.rightBtn = false;
        })
        this.shootBtn.on('pointerdown', ()=>{
            this.shootBtn = true;
        })
        this.shootBtn.on('pointerup', ()=>{
            this.shootBtn = false;
        })
    }
    createPlayer(){
        this.player = this.physics.add.sprite(200, 375, 'player');
        this.player.setCollideWorldBounds(true);

        playerAnim.forEach(data=>{
            if(data.isStatic){
                this.anims.create({
                    key: data.key,
                    frames: [{key: data.spriteName, frame: data.startFrame}],
                })
            }
            else if(!data.isStatic){
                this.anims.create({
                    key: data.key,
                    frames: this.anims.generateFrameNumbers(data.spriteName, {start: data.startFrame, end: data.endFrame})
                })
            }
        })
    }

    playerMovement(){
        const moveLeft = this.cursors.left.isDown
        const moveRight = this.cursors.right.isDown
        if(this.leftBtn || moveLeft){
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true)
            this.player.setFlipX(false)
        }
        else if(this.rightBtn || moveRight){
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true)
            this.player.setFlipX(true)
        }
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true)
        }
    }

    createEnemy(){
        this.enemy = this.add.image(0, 0, 'enemy')
        this.enemy = this.physics.add.group({
            classType : Object,
            maxSize : 12,
            runChildUpdate : true
        })
    }

    // crearting interval in order to spanwn enemy

    timeInterval(){

        const timerSpawn = 5000 // in milisecond

        this.time.addEvent({
            delay : Math.floor(Math.random() * timerSpawn),
            callback : this.spawnEnemy(),
            callbackScope : this,
            loop :true
        })

    }

    spawnEnemy(){
        let config ={
            speed: this.speed,
            rotation: 0.2,
        }
        // console.log('enemyspawn')
        let enemySpawn = this.enemy.get(0, 0, 'enemy', config)
        console.log('enemyspawn:', enemySpawn)
        const positionX = Math.floor(Math.random() * 390);

        enemySpawn ? enemySpawn.spawn(positionX) : 0
    }



    update(){
        this.moveCloud()
        this.playerMovement()
        this.spawnEnemy()
        // this.timeInterval();
    }
}