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
        this.load.image("poop", "/assets/poop.png")
        this.load.image("bg", "/assets/background.png")
        
    }
    
    create(){
        this.add.image(300, 110, "bg").setScale(0.5);
        this.physics.world.setBounds(-10, 0, 620, 275);
        createAvatar(this, 300, 250, "avatar");

        this.countdown = 30;
        this.text= this.add.text(50, 15, `${formatTime(this.countdown)}`)
        this.timedEvent = this.time.addEvent({delay: 1000, callback: onTime, callbackScope: this, loop: true})
    
    // TWEENS RUN IN CASE OF AVATAR HIT OR DIED
        this.avatar.flash = this.tweens.add({
            targets: this.avatar,
            alpha: 0.5,
            ease: 'Cubic.easeOut',  
            duration: 70,
            repeat: 5,
            yoyo: true,
            paused: true
        })
        this.avatar.die = this.tweens.add({
            targets: this.avatar,
            props: {
                y: {value: 170, ease: 'Linear'}
            },
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: 0,
            paused: true
        })
        createBird(this, "bird");
        this.birdCoordinates = this.bird.getBounds();
        this.timer = this.time.addEvent({
			delay: 1000,
			callback: onEvent,
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
            let y = this.avatar.getBounds().y
            if(y > 300){
                this.physics.pause();
            }
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
    let y = coordinates.y + 48;
    let x = coordinates.x + 24;
    let newShit = new Shit(scene, x, y, sprite).setScale(.2);
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

function onCollition(avatar, shit){
    avatar.hitCount += 1;
    this.score.setText(`you got hit: ${avatar.hitCount}`)
    if(avatar.hitCount === 2){
        avatar.die.play()
        avatar.died()
        this.timedEvent.paused = true;
        this.scene.launch("GameOver")
    } else {
        avatar.flash.play();
        shit.destroy();
    }
}

function onEvent(){
    createShit(this, "poop", this.birdCoordinates);
}

function onTime(){
    this.countdown--;
    if(this.countdown === 0){
        this.scene.launch("WinnerScene");
        this.physics.pause();
        this.timedEvent.paused = true;
    }
    this.text.setText(`${formatTime(this.countdown)}`)
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds/60);
    let restSeconds = seconds % 60;
    restSeconds = restSeconds.toString().padStart(2, "0")
    return `${minutes}:${restSeconds}`
}
