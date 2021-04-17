export default {
    type: Phaser.AUTO,

    width: 600,
    height: 300,
    render: {
        // pixelArt: true,
    },
    scale: {
        parent: 'hitormiss',
        autoCenter: true,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        },
    },
    dom: {
        createContainer: true,
    },
    scene: [],
}