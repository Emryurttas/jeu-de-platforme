import Phaser from "phaser";

export default class Elevator extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.scene = scene;
        this.back = this.create(21 * 64, 7 * 64, "elevator").setOrigin(0, 0);
        this.#createAnims();
    }

    static preload(scene) {
        scene.load.spritesheet("elevator", "img/elevator.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    #createAnims() {
        this.scene.anims.create({
            key: "open",
            frames: this.scene.anims.generateFrameNumbers("elevator", {
                start: 0,
                end: 3,
            }),
            frameRate: 20,
            repeat: 0,
        });
    }
    moveIn(player) {
        this.scene.input.keyboard.enabled = false;
        player.halt();

        this.back.anims.play("open");

        const elevatorCenterX = this.back.x + this.back.width / 5;
        const elevatorCenterY = this.back.y + this.back.height / 3;

        player.setDepth(this.back.depth + 1);
        this.scene.tweens.add({
            targets: player,
            x: elevatorCenterX,
            y: elevatorCenterY,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                player.body.setAllowGravity(true);
                this.scene.input.keyboard.enabled = true;
                this.scene.scene.restart();
            }
        });
    }
}
