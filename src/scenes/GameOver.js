import "phaser";

export default class GameOver extends Phaser.Scene{
    constructor() {
        super("GameOver")
    }
    create(){
       let text = this.add.text(250, 150, "Game Over");
    }
}