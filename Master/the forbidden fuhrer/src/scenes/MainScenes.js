import Phaser from "phaser";
import { loadAsset } from "./ImageAsset";
import { heroAnimation, playerAnimation } from "./animation";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super(`main-scene`)
    }

    init() {
        this.player = 'heheeh';
        this.hero = 'sds';

    }


    preload() {

        loadAsset.forEach(x => {
            console.log(x);
            if (!x.isDynamic) {
                this.load.image(x.keyName, x.path);
            }
            else {
                this.load.spritesheet(x.keyName, x.path, {
                    frameWidth: x.frameWidth,
                    frameHeight: x.frameHeight
                })
            }
        })

    }

    create() {
        // this.createPlayer();
        // this.player.anims.play('player-attack', true);

        this.createHero();
        this.hero.anims.play('hero-standby-front', true);
    }



    createHero() {
        this.hero = this.add.sprite(900, 600, 'hero').setScale(4);

        heroAnimation.forEach(x => {
            this.anims.create({
                key: x.keyname,
                frames: this.anims.generateFrameNumbers('hero', {
                    start: x.frameStart,
                    end: x.frameEnd
                }),
                frameRate: x.frameRate,
                repeat: x.repeat
            })
        })
    }





    createPlayer() {
        this.player = this.add.sprite(700, 600, 'player');
        playerAnimation.forEach(x => {
            this.anims.create({
                key: x.keyname,
                frames: this.anims.generateFrameNumbers('player', {
                    start: x.frameStart,
                    end: x.frameEnd
                }),
                frameRate: x.frameRate,
                repeat: x.repeat
            })
        })
    }

    update() {

    }
}