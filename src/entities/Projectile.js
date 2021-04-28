import "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite)
    };
}