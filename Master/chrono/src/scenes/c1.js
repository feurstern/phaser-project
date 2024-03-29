import Phaser from "phaser";
import FallingObject from "./FallingObject";
import Laser from "./L1";
import GameOver from "./go";
import GameOverScene from "./Gameover";

const assetImage = [
    {
        key: 'bg',
        path: 'sd/bg_layer1.png',
        isBackground: true,
        isStatic: true,
    },
    {
        key: 'cloud',
        path: 'sd/cloud.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'enemy',
        path: 'sd/enemy.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'explosion',
        path: 'sd/explosion.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'gameover',
        path: 'sd/gameover.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'hand',
        path: 'sd/handsanitizer.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'laserbolt',
        path: 'sd/laser-bolts.png',
        isBackground: false,
        isStatic: false,
        isProjectile: true,
    },
    {
        key: 'left-btn',
        path: 'sd/left-btn.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'replay',
        path: 'sd/replay.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'right-btn',
        path: 'sd/right-btn.png',
        isBackground: false,
        isStatic: true,
    },
    {
        key: 'player',
        path: 'sd/ship.png',
        isBackground: false,
        isStatic: false,
        isProjectile: false,
    },
    {
        key: 'shoot-btn',
        path: 'sd/shoot-btn.png',
        isBackground: false,
        isStatic: true,
    },

]

const playerAnimation = [
    {
        key: 'left',
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player',
        isStatic: false
    },
    {
        key: 'right',
        startFrame: 1,
        endFrame: 2,
        spriteName: 'player',
        isStatic: false
    },
    {
        key: 'tur',
        startFrame: '0',
        endFrame: null,
        spriteName: 'player',
        isStatic: true
    }
]


export default class Testing1 extends Phaser.Scene {
    constructor() {
        super(`test1`);
    }

    init() {
        this.cloud = undefined;
        this.leftBtn = '';
        this.rightBtn = '';
        this.shootBtn = '';
        this.player = 'f';

        this.enemy = '2';
        this.enemySpeed = 20;

        this.laser = '';
        this.laserFired = 10;
        // this.time = time;

        this.scoreText = 'ds';
        this.score = 0;


        this.playerLifeStatus = '';
        this.playerLife = 3
        this.handsanitizer = '';

    }


    preload() {
        assetImage.forEach((data) => {
            if (data.isStatic) {
                this.load.image(data.key, data.path);
                if (data.key === 'enemy') {
                    console.log(data)
                }
            }
            else if (!data.isStatic && !data.isProjectile) {
                // console.log('load data:', data)
                this.load.spritesheet(data.key, data.path, {
                    frameWidth: 66,
                    frameHeight: 66
                })
            }

            else if (!data.isStatic && data.isProjectile) {
                console.log('data 3:', data);
                this.load.spritesheet(data.key, data.path, {
                    frameWidth: 16,
                    frameHeight: 16
                })
            }
        })

        this.load.audio('laser', 'music/laser-gun.mp3');
        this.load.audio('kill', 'music/blood.mp3');
        
    }



    create() {

        const screenHeight = this.scale.height;
        const screenWidth = this.scale.width;

        this.add.image(screenWidth, screenWidth, 'bg');
        this.createCloud();
        this.createButton();
        this.createPlayer();
        this.createEnemy();

        this.createLaser();
        // this.hitEnemy(Laser, FallingObject);
        this.createTime();
        //whenever you want to implement collision
        this.physics.add.overlap(this.laser, this.enemy, this.hitEnemy, null, this)
        this.createScoreText();

        // for detecting the collision between enemy and the playeer
        this.physics.add.overlap(this.player, this.enemy, this.playerCollision, null, this)
        this.createSanitizer();


        // create collision between game and hand sanitier
        this.physics.add.overlap(this.player, this.handsanitizer, this.handsanitizerCollision, null, this);
    }


    createCloud() {
        this.cloud = this.physics.add.group({
            key: 'cloud',
            repeat: 14
        })
        Phaser.Actions.RandomRectangle(this.cloud.getChildren(), this.physics.world.bounds)

    }

    moveCloud() {
        this.cloud.children.iterate(c => {
            c.setVelocityY(55);

            c.y > this.scale.height ? (
                c.y = 0,
                c.x = Phaser.Math.Between(10, 400)
            ) : 0
        })
    }

    createButton() {

        let leftBtn = this.add.image(50, 550, 'left-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        let rightBtn = this.add.image(leftBtn.x + leftBtn.displayWidth, 550, 'right-btn').setInteractive().setDepth(0.5).setAlpha(0.8);
        let shootBtn = this.add.image(340, 550, 'shoot-btn').setInteractive().setDepth(0.5).setAlpha(0.5)

        // console.log(rgih)
        leftBtn.on('pointerdown', () => {
            this.leftBtn = true;
            console.log('press left')
        })

        leftBtn.on('pointerup', () => {
            this.leftBtn = false;
        })

        rightBtn.on('pointerdown', () => {
            this.rightBtn = true;
            console.log('press RIGHT')
        })

        rightBtn.on('pointerup', () => {
            this.rightBtn = false;
            console.log('unpressed right')
        })

        shootBtn.on('pointerdown', () => {
            this.shootBtn = true;
            console.log('press up')
        })

        shootBtn.on('pointerup', () => {
            this.shootBtn = false;
        })
    }


    createPlayer() {
        this.player = this.physics.add.sprite(200, 450, 'player');
        this.player.setCollideWorldBounds(true);
        playerAnimation.forEach(dt => {
            // start  isStatic
            if (dt.isStatic) {
                this.anims.create({
                    key: dt.key,
                    frames: [{
                        key: dt.spriteName, frame: dt.startFrame
                    }]
                })
            }
            // end of static
            else if (!dt.isStatic) {
                console.log(dt)
                this.anims.create({
                    key: dt.key,
                    frames: this.anims.generateFrameNumbers(dt.spriteName, { start: dt.startFrame, end: dt.endFrame })
                })
            }
        })

    }

    playerMovement() {
        if (this.leftBtn) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.setFlipX(false)
        }
        else if (this.rightBtn) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.setFlipX(true)
        }
        // console.log('time :', this.time)
        if ((this.shootBtn) && this.laserFired) {
            const laser = this.laser.get(0, 0, 'laserbolt');
            // console.log('shioot')
            laser ? (
                laser.fire(this.player.x, this.player.y),
                this.laserFired = 200,
                this.sound.play('laser') 
                
            )
                : 0

        }
    }

    createEnemy() {

        this.enemy = this.load.image(300, 200, 'enemy');
        this.enemy = this.physics.add.group({
            classType: FallingObject,
            maxSize: 17,
            runChildUpdate: true
        });
    }

    createTime() {
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callBack: this.spawnEnemy,
            callbackScope: true,
            loop: true
        })
    }

    spawnEnemy() {
        const config = {
            speed: 90,
            rotation: 5
        };

        const enemy = this.enemy.get(0, 0, 'enemy', config);
        // console.log('enemy:', enemy);
        const positionX = Phaser.Math.Between(50, 350);
        enemy ? enemy.spawn(positionX) : 0;
    }

    createLaser() {
        this.laser = this.physics.add.group({
            classType: Laser,
            maxSize: 10,
            runChildUpdate: true
        })
    }

    hitEnemy(laser, enemy) {
        this.sound.play('kill');
        laser.destroy();
        enemy.destroy();
        this.score += 10;
        this.life -= 1;
        
    }

    createScoreText() {
        this.scoreText = this.add.text(10, 10, 'Score:', {
            // when the text is not showing to the browser make sure that you type tthe name of colour correctly  + called the method inside create

            fontSize: '20px',
            fill: 'blue',
            backgroundColor: 'white'
        }).setActive().setDepth(1)

        this.playerLifeStatus = this.add.text(10, 45, `Life : ${this.playerLife}`, {
            fontSize: '20px',
            fill: 'red',
            backgroundColor: 'white'
        }).setActive().setDepth(1)
    }


    //decreaslife() 
    playerCollision(p, e) {
        e.destroy();
        
        this.playerLife--;
        // if your screen is black after losing the game make sure you have to type it correctly!
        this.playerLife === 2 ? p.setTint(0xff000) :
            this.playerLife === 1 ? p.setTint(0xff000).setAlpha(0.2)
                : this.scene.start(`game-over-scene`, {score : this.score})
    
    }

    createSanitizer() {
        // this.handsanitizer = this.add.image(0,0, 'hand');
        this.handsanitizer = this.physics.add.group({
            classType: FallingObject,
            // maxSize: 10,
            runChildUpdate: true
        })

        this.time.addEvent({
            delay: 5000,
            callBack: this.spawnHandSanitizer(),
            callbackScope: this,
            loop: true
        })
    }

    spawnHandSanitizer() {
        const config = {
            speed: 100,
            rotation: 1
        }

        const handsanitizer = this.handsanitizer.get(0, 0, 'hand', config)
        const positionX = Phaser.Math.Between(70, 330)
        if (handsanitizer) {
            handsanitizer.spawn(positionX);
        }

    }

    handsanitizerCollision(h, p) {
        // h.destroy();
        p.destroy();
        if (this.playerLife != 3) {
            this.playerLife += 1;
            // this.playerLifeStatus +=1;

        }
    }


    update() {
        this.moveCloud()
        this.playerMovement()
        this.spawnEnemy();


        // update the score whenever kill the enemy
        // when your score is not updating jsut check it whether yyou already called it or not
        this.scoreText.setText(`Score : ${this.score}`)
        this.playerLifeStatus.setText(`Life : ${this.playerLife}`)

        // console.log('time', this.time)
    }
}

