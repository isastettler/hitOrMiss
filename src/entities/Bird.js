import Phaser from "phaser";

export default class Bird extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, spriteKey, shits) {
		super(scene, x, y, spriteKey, shits);

		scene.add.existing(this);
		scene.physics.world.enable(this);
		this.anims.play("flyingRight", true);
		this.velocityX = Phaser.Math.Between(55, 200) + 50;
		this.setVelocityX(this.velocityX);
		this.setCollideWorldBounds(true);
		this.body.onWorldBounds = true;
		this.body.world.on(
			"worldbounds",
			function (body) {
				if (body.gameObject === this) {
					this.velocityX = this.velocityX * -1;
					let currentKey =
						this.anims.currentAnim.key === "flyingRight"
							? "flyingLeft"
							: "flyingRight";
					this.anims.play(currentKey);
					this.setVelocityX(this.velocityX * -1);
				}
			},
			this
		);
	}
}
