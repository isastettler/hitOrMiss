import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene{
    constructor() {
        super('GameOver');
    }
    preload(){
        this.load.image('play', '/assets/buttons/play.png');
    }
    create(){
       this.add.text(220, 130, `Game Over\n\nYou are full of shit`, {align: 'center'});
       let playAgainButton = this.add.image(520, 270, 'play').setScale(0.8);
       playAgainButton.setInteractive();
       playAgainButton.on('pointerdown', () => {
        this.scene.stop();
        this.scene.launch('MainScene');
        });
    }
}
