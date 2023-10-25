import Phaser from "phaser";

export default class LayoutPractice extends Phaser.Scene {
    constructor() {
        super(`Layout practice`);
    }

    init() {
        // we do not have the game object to store to the var prope
    }

    preload() {
        // we have to pass 2 parameters
        /* 
            the first paramater for the key or the name of your file
            second parameter is just for the file path
        */
        const imageAsset = [
            {
                key: 'playerRed',
                path: '/images/Red.png'
            },
            {
                key: 'playerCyan',
                path: '/images/Cyan.png'
            },
            {
                key: 'playerOrange',
                path: '/images/Orange.png'
            },
            {
                key: 'playerGreen',
                path: '/images/Green.png'
            },
            {
                key: 'playerPink',
                path: '/images/Pink.png'
            },

        ]
        // console.log("key 1:",imageAsset[0].key)
        const mapPath = '/images/Maps.png'
        this.load.image('bg', mapPath);
        this.load.image('', mapPath);
        this.load.image('bg', mapPath);
       
        for(let i = 0; i<imageAsset.length; i++){
            // console.log('key data:', imageAsset[i].key);
            this.load.image(imageAsset[i].key, imageAsset[i].path)
        }

    }

    create() {
        this.add.image(960, 540, 'bg');
        // this.add.image(600, 400, 'playerRed');
    }

}