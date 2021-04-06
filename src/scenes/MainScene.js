import "phaser";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    preload(){
        this.load.spritesheet("avatar", "assets/avatar.png", {
            frameWidth: 32,
            frameHeight: 38
        });
        this.load.spritesheet("bubble", "assets/pink_bubble.png", {
            frameWidth: 20,
            frameHeight: 20
        });
    }
    create(){}
    update(){}
}
