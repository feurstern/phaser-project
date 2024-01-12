export const imageAsset = [
    {
        keyName: 'bg',
        path: 'img/bg_layer1.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'fight-bg',
        path: 'img/fight-bg.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'tile',
        path: 'img/tile.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'startBtn',
        path: 'img/start_button.png',
        isStatic: true,
        frameWidth: 0,
        frameHeight: 0
    },
    {
        keyName: 'player',
        path: 'img/warrior1.png',
        isStatic: false,
        frameWidth: 80,
        frameHeight: 80
    },
    {
        keyName: 'enemy',
        path: 'img/warrior2.png',
        isStatic: false,
        frameWidth: 80,
        frameHeight: 80
    },
    {
        keyName: 'numbers',
        path: 'img/numbers.png',
        isStatic: false,
        frameWidth: 131,
        frameHeight: 71.25
    },
    {
        keyName: 'slash',
        path: 'img/slash.png',
        isStatic: false,
        frameWidth: 42,
        frameHeight: 88
    }

]

export const playerAnimation = [
    {
        keyName: `player-standby`,
        frameStart: 15,
        frameEnd: 19,
        frameRate: 10,
        repeat: -1
    },
    {
        keyName: `player-attack`,
        frameStart: 10,
        frameEnd: 14,
        frameRate: 10,
        repeat: 0
    },
    {
        keyName: `player-hit`,
        frameStart: 5,
        frameEnd: 9,
        frameRate: 10,
        repeat: 0
    },
    {
        keyName: `player-die`,
        frameStart: 0,
        frameEnd: 5,
        frameRate: 10,
        repeat: 0
    },
]


export const enemyAnimation = [
    {
        keyName: `enemy-standby`,
        frameStart: 15,
        frameEnd: 19,
        frameRate: 10,
        repeat: -1
    },
    {
        keyName: `enemy-attack`,
        frameStart: 10,
        frameEnd: 14,
        frameRate: 10,
        repeat: 0
    },
    {
        keyName: `enemy-hit`,
        frameStart: 5,
        frameEnd: 9,
        frameRate: 10,
        repeat: 0
    },
    {
        keyName: `enemy-die`,
        frameStart: 0,
        frameEnd: 5,
        frameRate: 10,
        repeat: 0
    },
]