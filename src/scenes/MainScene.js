import "phaser";

import Avatar from "../entities/Avatar";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    preload(){
        this.load.spritesheet("avatar", "/assets/avatar.png", {
            frameWidth: 40,
            frameHeight: 50
        });
        this.load.spritesheet("bubble", "/assets/pink_bubble.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("grass", "/assets/grass_background.png")
    }

    createAvatar(scene, x, y, sprite) {
        scene.avatar = new Avatar(scene, x, y, sprite);
    }

    create(){
        console.log("mainScene is created!")
        this.add.image(0, 0, "grass").setScale(1.3);
        this.createAvatar(this, 300, 300, "avatar");
    }
    update(){}
}
