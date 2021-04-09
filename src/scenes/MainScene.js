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
        this.load.spritesheet("bird", "/assets/bird.png", {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("bubble", "/assets/pink_bubble.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("poop", "/assets/poop.png")
        this.load.image("grass", "/assets/background.png")
    }
    onEvent(){
        createShit(this, "bubble", this.birdCoordinates);
    }

    create(){
        this.add.image(300, 110, "grass").setScale(0.5);
        this.physics.world.setBounds(-10, 0, 620, 300);
        createAvatar(this, 300, 250, "avatar");
        createBird(this, "bird");
        this.birdCoordinates = this.bird.getBounds();
        console.log("birdCoordinates-->", this.birdCoordinates)
        this.timer = this.time.addEvent({
			delay: 1000,
			callback: this.onEvent,
			callbackScope: this,
			repeat: -1
		});
        this.score = this.add.text(50, 30, `you got hit: ${this.avatar.hitCount}`)
        this.shits = this.add.group();
        this.physics.add.collider(
			this.avatar,
			this.shits,
			onCollition,
            null,
            this
		);
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

        if(this.birdCoordinates){
            this.birdCoordinates = this.bird.getBounds();
        }
    }
}

//ADD ALL FUNCTIONS USED IN THE MAINSCENE
function createAvatar(scene, x, y, sprite) {
    createAvatarAnimations(scene, "avatar");
    scene.avatar = new Avatar(scene, x, y, sprite);
    scene.avatar.anims.play("stand")
    scene.avatar.hitCount = 0;
    scene.avatar.setPushable(false);
}
function createBird(scene, sprite) {
    createBirdAnimations(scene, "bird");
    let y = Math.ceil(Math.random() * 100 + 50);
    scene.bird = new Bird(scene, 790, y, sprite).setSize(0.1, 0.1);    
}
function createShit(scene, sprite, coordinates){
    createShitAnimation(scene, "bubble");
    let y = coordinates.y + 48;
    let x = coordinates.x + 24;
    console.log(x, y);
    let newShit = new Shit(scene, x, y, sprite).setScale(.5);
    newShit.anims.play("shit", true);
    scene.shits.add(newShit);
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
async function onCollition(avatar, shit){
    shit.anims.play("shitHits");
    avatar.hitCount += 1;
        this.score.setText(`you got hit: ${avatar.hitCount}`)
    await sleep(1000)
    shit.destroy();
}
async function sleep(delay) {
    return new Promise(resolve => setTimeout(() => resolve(true), delay));
}