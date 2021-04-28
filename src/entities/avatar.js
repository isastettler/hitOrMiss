import "phaser";

export default class Avatar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.died = function (){
            this.setVelocityY(150)
            this.body.collideWorldBounds = false
        }
        this.avatarFacingRight = false;
    }
    updateMovement(cursors){
        if(cursors.right.isDown){
            this.avatarFacingRight = true;
            this.anims.play("right", true)
            this.setVelocityX(30);
        }
        else if(cursors.left.isDown){
            this.avatarFacingRight = false;
            this.anims.play("left", true)
            this.setVelocityX(-30)
        }
        else if(cursors.up.isDown){
            this.avatarFacingRight ? this.anims.play("shoot-right", true) : this.anims.play("shoot-left", true)
        }
        else {
            this.avatarFacingRight ?  this.anims.play("stand-right") : this.anims.play("stand-left", true)
            this.setVelocityX(0)
        }
    }
    update(cursors){
        this.updateMovement(cursors);
    }
}