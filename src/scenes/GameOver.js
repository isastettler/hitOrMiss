import "phaser";

export default class GameOver extends Phaser.Scene{
    constructor() {
        super("GameOver")
    }
    create(){
       let text = this.add.text(220, 130, `Game Over\n\nYou are full of shit`, {align: "center"});
    }
}