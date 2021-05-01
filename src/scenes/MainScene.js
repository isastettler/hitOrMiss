import "phaser";

import Avatar from "../entities/Avatar";
import Bird from "../entities/Bird";
import Bullet from "../entities/Bullet";
import Shit from "../entities/Shits";
import Explosion from "../entities/Explosion";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    //PRELOAD IS THE PLACE TO LAOD ALL YOUR FILES
    preload(){
        this.load.spritesheet("avatar", "/assets/avatar.png", {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("bird", "/assets/bird.png", {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("bullet", "/assets/bullet.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("explosion", "/assets/explosion.png", {
            frameWidth: 55,
            frameHeight: 55
        })
        this.load.image("poop", "/assets/poop.png")
        this.load.image("bg", "/assets/background.png")
        
    }
    
    create(){
        this.add.image(300, 110, "bg").setScale(0.5);
        this.physics.world.setBounds(-10, 0, 620, 270);
        createAvatar(this, 300, 275);

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
                paused: true
            })
        // CREATE THE COUNTDOWN 
        this.countdown = 150;
        this.birdCount = 0;
        this.text= this.add.text(50, 15, `${formatTime(this.countdown)}`)
        this.score = this.add.text(50, 30, `you got hit: ${this.avatar.hitCount}\nyou killed: ${this.birdCount} birds`)
        this.timedEvent = this.time.addEvent({delay: 1000, callback: onTime, callbackScope: this, loop: true})
        // CREATE GROUPS TO ADD EACH CRAETED BIRD/BIRDSHIT/BULLET
        this.birds = this.add.group();
        this.shits = this.add.group();
        this.bullets = this.add.group();

        createBird(this, "bird");
        this.poops = Phaser.Math.Between(500, 1000);
        this.birds.getChildren().forEach(bird => {
            bird.timer = this.time.addEvent({
                delay: this.poops,
                callback: onEvent,
                callbackScope: this,
                repeat: -1
            });
        })
        //ADD COLLITON BETWEEN BIRDSHITS AND AVATAR
        this.physics.add.collider(
			this.avatar,
			this.shits,
			onCollition,
            null,
            this
		);
        this.physics.add.collider(
            this.birds,
            this.bullets,
            onBulletHit,
            null,
            this
        )
        //ADD KEYBOARD CONTROLLS FOR NAVIGATION
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.Z,
        })  
        this.nextShotAt = 0;
        this.shotDelay = 500;   

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
        if(this.cursors.up.isDown){
            createBullet(this, this.avatar.x, this.avatar.y)
        }
    }
}

//ADD ALL FUNCTIONS USED IN THE MAINSCENE
function createAvatar(scene, x, y) {
    createAvatarAnimations(scene, "avatar");
    scene.avatar = new Avatar(scene, x, y, "avatar").setSize(20, 30);
    scene.avatar.anims.play("stand-left")
    scene.avatar.hitCount = 0;
    scene.avatar.setPushable(false);
}
function createBird(scene) {
    createBirdAnimations(scene, "bird");
    let y = Phaser.Math.Between(10, 100) + 50
    // let y = Math.ceil(Math.random() * 100 + 50);
    let newBird = new Bird(scene, 790, y, "bird").setSize(15, 5);
    scene.birds.add(newBird)    
}
function createShit(scene, sprite, coordinates){
    let y = coordinates.y + 48;
    let x = coordinates.x + 24;
    let newShit = new Shit(scene, x, y, sprite).setScale(0.2);
    scene.shits.add(newShit);
}
function createBullet(scene, x, y){
    if(scene.nextShotAt > scene.time.now){
        return;
    }
    scene.nextShotAt = scene.shotDelay + scene.time.now
    y = y - 10;
    x = scene.avatar.facingRight ? x + 20 : x - 20;
    let newBullet = new Bullet(scene, x, y, "bullet").setScale(0.2, 0.2)
    scene.bullets.add(newBullet)

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
        key: "stand-right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 56,
            end: 56
        })
    });
    scene.anims.create({
        key: "stand-left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 48,
            end: 48
        })
    });
    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 24,
            end: 31
        }),
        frameRate: 4,
        repeat: -1
    });
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 16, 
            end: 23
        }),
        frameRate: 4,
        repeat: -1
    });
    scene.anims.create({
        key: "shoot-right",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 40,
            end: 44,
        }),
        frameRate: 6,
        repeat: 1
    })
    scene.anims.create({
        key: "shoot-left",
        frames: scene.anims.generateFrameNumbers(sprite, {
            start: 32,
            end: 36,
        }),
        frameRate: 6,
        repeat: 1
    })
}
function createExplosionAnimation(scene) {
    scene.anims.create({
        key: "explosion",
        frames: scene.anims.generateFrameNumbers("explosion", {
            start: 0,
            end: 4,
        }),
        frameRate: 10,
    })
}

function onCollition(avatar, shit){
    avatar.hitCount += 1;
    this.score.setText(`you got hit: ${this.avatar.hitCount}\nyou killed: ${this.birdCount} birds`)
    if(avatar.hitCount === 10){
        shit.destroy();
        avatar.die.play()
        avatar.died()
        this.timedEvent.paused = true;
        this.scene.launch("GameOver")
    } else {
        avatar.flash.play();
        shit.destroy();
    }
}

function onBulletHit(bird, bullet){
    createExplosionAnimation(this)
    this.birdCount++;
    this.score.setText(`you got hit: ${this.avatar.hitCount}\nyou killed: ${this.birdCount} birds`)
    this.explosion = new Explosion(this, bird.x, bird.y, "explosion").setScale(.5)
    bird.destroy();
    bullet.destroy();
    createBird(this);
    createBird(this);
}

function onEvent(){
    this.birds.getChildren().forEach(bird => {
        createShit(this, "poop", bird.getBounds());
    })
}

function onTime(){
    this.countdown--;
    if(this.countdown % 15 === 0){
        createBird(this, "bird")
    }
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
