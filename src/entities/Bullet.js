import "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setVelocityX(this.scene.avatar.facingRight ? 50 : -50)
        this.setVelocityY(-300)
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.destroy();
                }
            }, this);
    };
}