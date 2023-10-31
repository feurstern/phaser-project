import Phaser from "phaser";


const imageAsset = [

    {
        key: 'bomb',
        path: '/images/bomb.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'player',
        path: '/images/dude.png',
        isStaticImage: false,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'platform',
        path: '/images/platform.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
    {
        key: 'sky',
        path: '/images/sky.png',
        isStaticImage: true,
        isBackground: true,
        x: 0,
        y: 0
    },

    {
        key: 'star',
        path: '/images/star.png',
        isStaticImage: true,
        isBackground: false,
        x: 0,
        y: 0
    },
]

const platformName = 'platform'
const platformGroup = [
    {
        x: 600,
        y: 350,
        key: platformName,
        isGround: false
    },
    {
        x: 200,
        y: 470,
        key: platformName,
        isGround: false
    },
    {
        x: 200,
        y: 200,
        key: platformName,
        isGround: false
    },
    {
        x: 400,
        y: 568,
        key: platformName,
        isGround: true
    },

]
// export 
export default class LevelOne extends Phaser.Scene {

    init() {
        //  to srore properties of the game object
        this.platform = undefined;
        this.player = '';
        this.star = 1;
    }

    preload() {
        // to load the assset

        // we have to use loop, while do while, for loop. map, foreach
        imageAsset.forEach((data) => {
            // console.log(data);
            if (data.isStaticImage) {
                this.load.image(data.key, data.path)
                console.log(data)
            }
            else {
                this.load.spritesheet(data.key, data.path, { frameHeight: 48, frameWidth: 24 })
            }
        })

    }

    create() {
        // render the asset to browser, we can do some changes to the properties
        this.add.image(400, 300, 'sky');
        this.platform = this.physics.add.staticGroup();

        platformGroup.forEach((data) => {
            if (data.isGround) {
                this.platform.create(data.x, data.y, data.key).setScale(2).refreshBody()
            }
            else {
                this.platform.create(data.x, data.y, data.key);
            }
        })

        this.createPlayer();
        this.spawnStar();
    }

    // additional method outside from the pas
    createPlayer() {
        this.player = this.physics.add.sprite(400, 450, 'player')
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);
    }

    spawnStar() {

        this.star = this.physics.add.group({
            key: 'star',
            repeat: 20,
            setXY: { x: 40, y: 0, stepX: 65 }
        })
        this.physics.add.collider(this.star, this.platform)

        this.star.children.iterate((e) => {
            e.setBounceY(0.7);
        })

    }
}