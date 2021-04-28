import "phaser";

export default class IntroScene extends Phaser.Scene{
    constructor() {
        super("IntroScene");
    }
    preload(){
        this.load.image("bg", "/assets/background.png")
    }
    create(){
        this.add.image(300, 110, "bg").setScale(0.5);
        this.startGameButton = this.add.text(490, 270, "start game")
        console.log(this.startGameButton)
        let text = this.add.text(80, 80, `How to not be shitty\n\nuse arrow LEFT and RIGHT to get away from shit\n\nif you get hit 10 times, you lose\n\nif you make it to 1 min,\n\nstart shooting the birds using arrow UP`, {align: "center"});
        this.startGameButton.setInteractive()
        this.startGameButton.on("pointerdown", () => {
            this.scene.launch("MainScene")
            this.scene.stop();
        })
    }
}