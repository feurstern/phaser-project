import Phaser from "phaser";
import { imageAsset } from "./MathAsset";

export default class MathFigther extends Phaser.Scene {
    constructor() {
        super(`math-scene`)

    }

    init() {
        this.gameScreenHalfWidth = this.scale.width / 2;
        this.gameScreenHalfHeight = this.scale.height / 2;
        this.player = 0;
        this.enemy = 0;
        this.slash = 0;
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
        let tile = this.add.image(230, fightBackground.height -30, 'tile')


        this.createPlayer();
        this.createEnemy();
        this.createSlash();
        // create collision for the tile and the player
        this.physics.add.collider(this.player, tile);
    }

    createPlayer(){
        this.player = this.add.sprite(this.gameScreenHalfWidth - 150, this.gameScreenHalfHeight - 40, 'player')
    }

    createEnemy(){
        this.enemy = this.add.sprite(this.gameScreenHalfWidth + 150, this.gameScreenHalfHeight -40, 'enemy' ).setFlipX(true)
    }

    createSlash(){
        this.slash = this.physics.add.sprite(200, 240, 'slash')
        .setActive(false)
        .setVisible(true)
        .setGravityY(-500)
        .setCollideWorldBounds(true)
        .setDepth(1)
        .setOffset(0, -10)
    }

    update() {

    }
} 