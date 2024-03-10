export const imageAsset = [

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

// array to store motion from the player
export const playerAnimation = [
    {
        key: 'left',
        startFrame: 0,
        endFrame: 3,
        isStatic: false,
        repeat: -1,
        frame: 10
    },
    {
        key: 'front',
        startFrame: 4,
        endFrame: null,
        isStatic: true,
        repeat: null,
        frame: 15
    },
    {
        key: 'right',
        startFrame: 5,
        endFrame: 8,
        isStatic: false,
        repeat: -1,
        frame: 10
    },
]