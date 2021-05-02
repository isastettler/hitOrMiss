export default {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    scale: {
        max: {
            width: 600,
            height: 400
        },
        parent: 'hitormiss',
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        },
    },
    dom: {
        createContainer: true,
    },
    scene: [],
}