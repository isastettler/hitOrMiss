import "phaser";

import Avatar from "../entities/Avatar";
import Bird from "../entities/Bird";
import Shit from "../entities/Shits";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    //PRELOAD IS THE PLACE TO LAOD ALL YOUR FILES
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

    create(){
        this.add.image(0, 0, "grass").setScale(1.3);
        this.physics.world.setBounds(0, 0, 800, 600);
        createAvatar(this, 300, 300, "avatar");
        createBird(this, "bird");
        createShit(this, "bubble");
        //add keyboard controls
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })

    }
    update(){
        //check on keyboard controls for movement update
        if(this.avatar){
            this.avatar.update(this.cursors);
        }
    }
}

//ADD ALL FUNCTIONS USED IN THE MAINSCENE
function createAvatar(scene, x, y, sprite) {
    createAvatarAnimations(scene, "avatar");
    scene.avatar = new Avatar(scene, x, y, sprite);
    scene.avatar.anims.play("stand")
}
function createBird(scene, sprite) {
    createBirdAnimations(scene, "bird");
    let y = Math.ceil(Math.random() * 100 + 50);
    scene.bird = new Bird(scene, 790, y, sprite).setSize(0.1, 0.1);    
}
function createShit(scene, sprite){
    createShitAnimation(scene, "bubble");
    let newShit = new Shit(scene, 30, 30, sprite);
    newShit.anims.play("shit", true);
}
function createBirdAnimations(scene, sprite){
    scene.anims.create({
        key: "flyingRight",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 3,
            end: 5
        }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: "flyingLeft",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 6,
            end: 8
        }),
        frameRate: 3,
        repeat: -1
    })
}
function createAvatarAnimations(scene, sprite){
    scene.anims.create({
        key: "stand",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 0,
            end: 0
        })
    });
    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 4,
            end: 7
        }),
        frameRate: 4,
        repeat: -1
    });
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 8, 
            end: 11
        }),
        frameRate: 4,
        repeat: -1
    });
}

function createShitAnimation(scene, sprite){
    scene.anims.create({
        key: "shitHits",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 1,
            end: 5
        }),
        frameRate: 5,
        repeat: 1
    })
    scene.anims.create({
        key: "shit",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 0,
            end: 0
        })
    })
}