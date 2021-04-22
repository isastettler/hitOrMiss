import "phaser"

export default class WinnerScene extends Phaser.Scene{
    constructor(){
        super("WinnerScene")
    }
    create(){
        let text = this.add.text(220, 130, `Congratulations!\n\nYou kept yourself out of shit`, {align: "center"});
    }
}