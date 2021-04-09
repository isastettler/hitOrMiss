import "phaser";

export default class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.anims.play("flyingRight", true);
        this.velocityX = Math.ceil(Math.random() * 150 + 50);
        this.setVelocityX(this.velocityX);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.velocityX = this.velocityX * -1;
                let currentKey = this.anims.currentAnim.key === "flyingRight" ? "flyingLeft" : "flyingRight";
                this.anims.play(currentKey);
                this.setVelocityX(this.velocityX * -1)
            }
            }, this);
    }
}