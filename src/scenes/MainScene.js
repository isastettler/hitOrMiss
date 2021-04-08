import "phaser";

import Avatar from "../entities/Avatar";
import Bird from "../entities/Bird";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    preload(){
        this.load.spritesheet("avatar", "/assets/avatar.png", {
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.spritesheet("bubble", "/assets/pink_bubble.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("bird", "/assets/bird.png", {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.image("grass", "/assets/grass_background.png")
    }

    createAvatar(scene, x, y, sprite) {
        scene.createAvatarAnimations("avatar");
        scene.avatar = new Avatar(scene, x, y, sprite);
        scene.avatar.anims.play("stand")
    }
    createBird(scene, sprite) {
        scene.createBirdAnimations("bird");
        let y = Math.ceil(Math.random() * 100 + 50);
        scene.bird = new Bird(scene, 800, y, sprite);
        scene.bird.setVelocity(-50, 0)
    }
    createBirdAnimations(sprite){
        this.anims.create({
            key: "flyingLeft",
            frames: this.anims.generateFrameNumbers(sprite, {
                start: 3,
                end: 5
            }),
            frameRate: 3,
            repeat: -1
        });
    }
    createAvatarAnimations(sprite){
        this.anims.create({
            key: "stand",
            frames: this.anims.generateFrameNumbers(sprite, {
                start: 0,
                end: 0
            })
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers(sprite, {
                start: 4,
                end: 7
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers(sprite, {
                start: 8, 
                end: 11
            }),
            frameRate: 4,
            repeat: -1
        });
    }

    create(){
        this.add.image(0, 0, "grass").setScale(1.3);
        this.createAvatar(this, 300, 300, "avatar");
        this.createBird(this, "bird");

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })

    }
    update(){
        if(this.avatar){
            this.avatar.update(this.cursors);
        }
    }
}
