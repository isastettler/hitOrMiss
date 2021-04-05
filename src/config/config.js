export default {
    type: Phaser.AUTO,

    width: 800,
    height: 600,
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
    audio: {
        disableWebAudio: true,
        noAudio: false
    },
}