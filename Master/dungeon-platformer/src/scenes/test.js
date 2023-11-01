// this scene for the test one

// directive for using the phaser
import Phaser from "phaser";

// inheritance from the phaser class parent
// we have to use export default in order to this class can be accessed anywhere.
const imageAsset=[
    {
        key:'',
        path:'',
        x:0,
        y:0,
        isStatic : true
    }
]
export default class Test extends Phaser.Scene{
    constructor(){
        //for the name of the scene
        //  this suppose for configuration that we can switch to another scene.
        super(`test`);

    }

    init(){

    }

    update(){

    }

    preload(){
        // if you want to load the images
        this.load.image('map', 'images/Maps.png');
        this.load.image('playerRed', 'images/Red.png');
        this.load.image('playerPink', 'images/Pink.png');
        this.load.image('playerOrange', 'images/Orange.png');
        this.load.image('playerCyan', 'images/Cyan.png')
    }

    // this for creating the object that can be rendered to the browser;

    create(){
        // for map
        this.add.image(960, 540, 'map');
        //player
        this.add.image(600, 400, 'playerRed')
        this.add.image(400, 650, 'playerOrange')

    }
}
