/// we have to create template
import Phaser from "phaser";

export default class collectingStarScene extends Phaser.Scene {
    constructor() {
        // this is for the name of the scene that we're going to use
        super(`collecting-star-scene`);
    }

    init(){
        this.platforms= undefined;
        //create player
        this.player = undefined;
        this.star = undefined;
    }

    // load the asset from public folder
    preload() {
        // we have to pass two parameter
        // 1st the name file that we're going to use
        // 2nd parameter for the path of the file

        this.load.image('bomb', 'images/bomb.png');
        this.load.image('sky', 'images/sky.png');
        this.load.image('star', 'images/star.png');
        this.load.image('ground', 'images/platform.png');

        // load the main character

        this.load.spritesheet('player', 'images/dude.png',
            {
                frameWidth: 32,
                frameHeight: 48,
            }
        )
    }
    
    // create an object to render to browser
    create(){
        // we have to use add method

        /*
            whenever you want to render the game object to the browser
            you have to use the 'this.add.image''s method, and this method
            contain 3 parameters
            first parameter is for the x axis
            second paramter for the y axis
            third paramater for the name of that file that we created before
        */ 
       // we render the sky to browsaer
        this.add.image(400, 300, 'sky');

        console.log('platform:', this.platforms);

        // this is for the physics
        this.platforms = this.physics.add.staticGroup();


        // we want to render the platform to the browser
        // 3 parameter, x : number, y :number, the name of file : 'string'
        this.platforms.create(15,50,'ground');
        this.platforms.create(350, 200, 'ground');
        this.platforms.create(200,450, 'ground');
        this.platforms.create(700, 400, 'ground');
        // create bottom platform for the ground
        this.platforms.create(400, 570, 'ground').setScale(2).refreshBody();
        this.player = this.physics.add.sprite(200,450, 'player');
        // this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.platforms, this.player);

        this.star = this.physics.add.group({
            key :'star',
            repeat: 20,
            setXY :{x:50, y:0, stepX:50}
        })
        this.physics.add.collider(this.star, this.platforms);
    }
}