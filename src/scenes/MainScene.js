import "phaser";

import Avatar from "../entities/Avatar";

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
        this.load.image("grass", "assets/grass_background.png")
    }

    createAvatar(scene, x, y, sprite) {
        scene.avatar = new Avatar(scene, x, y, sprite);
    }

    create(){
        this.add.image(0, 0, "grass");
        this.createAvatar(this, 300, 300, "avatar");
    }
    update(){}
}
