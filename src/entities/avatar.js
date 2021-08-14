import Phaser from 'phaser';

export default class Avatar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.died = function (){
            this.setVelocityY(150);
            this.body.collideWorldBounds = false;
        };
        this.facingRight = false;
    }
    updateMovement(cursors){
        if (cursors.right.isDown || cursors === 'right'){
            this.facingRight = true;
            this.anims.play('right', true);
            this.setVelocityX(50);
        }
        else if ( cursors.left.isDown || cursors === 'left'){
            this.facingRight = false;
            this.anims.play('left', true);
            this.setVelocityX(-50);
        }
        else if (cursors.up.isDown){
            this.facingRight ? this.anims.play('shoot-right', true) : this.anims.play('shoot-left', true);
        }
        else {
            this.facingRight ?  this.anims.play('stand-right') : this.anims.play('stand-left', true);
            this.setVelocityX(0);
        }
    }
    update(cursors){
        this.updateMovement(cursors);
    }
}
