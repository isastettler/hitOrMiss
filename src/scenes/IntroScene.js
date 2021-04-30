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
        let text = this.add.text(80, 80, `use arrow LEFT and RIGHT to get away from shit\n\nshoot birds with Z\n\nif you get hit 10 times, you lose`, {align: "center"});
        this.startGameButton.setInteractive()
        this.startGameButton.on("pointerdown", () => {
            this.scene.launch("MainScene")
            this.scene.stop();
        })
    }
}