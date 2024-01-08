import Phaser from "phaser";


export default class Object extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, config){
        super(scene,x, y, texture);
        //config is an object has some properties


        this.scene = scene;
        this.speed = config.speed;

        this.rotationVal = config.rotation;

    }
    
    spawn(x){
        this.setPosition(x,-5);
        this.setActive(true);
        this.setVisible(true);
    }
    
    die(){
        this.destroy()
    }
    update(time){
        this.setVelocityY(this.speed);
        this.rotation = this.rotationVal;
        // check the condition when the enemy off the screen, it will automatically destroy()
        this.y > this.scene.scale.height ? this.die() : 0

    }
}