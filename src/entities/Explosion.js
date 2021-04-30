import "phaser";

export default class Explosion extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this)
        this.setTint(0x7E7E7E)
        this.tintFill = true;
        this.anims.play("explosion", true)
    }
}