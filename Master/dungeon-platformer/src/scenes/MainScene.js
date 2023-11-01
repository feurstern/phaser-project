import Phaser from "phaser";

const playerSpritesheet = [
    {
        key:'',
        path:'',
        height : 0,
        width: 0
    },
]

export default class MainScene extends Phaser.Scene {

    init() {
        this.player = undefined;
    }

    preload() {
        this.load.spritesheet('playerRun', 'images/mainPlayer/_Run.png',
            {
                frameHeight: 24,
                frameWidth: 24
            }
        )
    }

    create() {
        this.createPlayer();
        this.add.text(15,15, 'Test hello nazi', {fontSize:'20px'})

    }

    createPlayer() {
        this.player = this.physics.add.sprite(100, 350, 'playerRun');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1

        })
    }
}