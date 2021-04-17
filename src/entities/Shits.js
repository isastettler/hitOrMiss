import "phaser";

export default class Shit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setVelocityY(60);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.destroy();
                }
            }, this);
    }
}