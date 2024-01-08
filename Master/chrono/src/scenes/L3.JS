import Phaser from "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(2);
    }

    // this how the laser works when it send the projectile
    fire(x, y) {
        this.setPosition(x, y -50);
        this.setActive(true);
        this.setVisible(true);
    }

    die() {
        this.destroy();

    }


    hitEnemy(laser, enemy){
        laser.die();
        enemy.die();
    }

    update(time) {
        this.setVelocityY(-200);
        this.y < -1 ? this.die() : 0;
    }
}