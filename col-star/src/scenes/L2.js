import Phaser from "phaser";
import { playerAnimation, imageAsset } from "./asset";

export default class Level2 extends Phaser.Scene {
    constructor() {
        super(`level-2`)
    }

    init() {

    }


    preload() {
        imageAsset.forEach(x => {
            if (x.isStaticImage) {
                this.load.image(x.key, x.path);
            }
            else if (!x.isStaticImage) {
                this.load.spritesheet(x.key, x.path, {
                    frameHeight: 48,
                    frameWidth: 32
                })
            }
        })
    }


}
