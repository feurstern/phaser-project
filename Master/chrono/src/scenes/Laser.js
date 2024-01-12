import Phaser from "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(2);

    }
    //FIRE(this.player.x, this.plaayer.y)
    fire(x, y) {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);

    }

    die() {
        this.destroy();
    }

    update(time) {
        this.setVelocityY(-200);
        this.y < 0 ? this.die() : 0;

    }
}