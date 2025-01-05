import Phaser from "phaser";

export default class Elevator extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, to, x = 21 * 64, y = 7 * 64) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.to = to
        this.back = this.create(x, y, "elevator").setOrigin(0, 0);
        this.front = this.create(x, y, "elevator", 0, false).setOrigin(0, 0);
        this.#createAnims();
        this.isElevatorOccupied = false;
    }
    static preload(scene) {
        scene.load.spritesheet("elevator", "img/elevator.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    #createAnims() {
        if (!this.scene.anims.exists("open")) {
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

        if (!this.scene.anims.exists("close")) {
            this.scene.anims.create({
                key: "close",
                frames: this.scene.anims.generateFrameNumbers("elevator", {
                    start: 4,
                    end: 7,
                }),
                frameRate: 20,
                repeat: 0,
            });
        }
    }
    moveIn(player) {
        if (this.isElevatorOccupied) {
            return;
        }
        this.isElevatorOccupied = true;
        this.scene.input.keyboard.enabled = false;
        player.halt();

        if (this.back && this.front) {
            if (this.back.anims && this.front.anims) {
                this.back.anims.play("open");
                this.front.anims.play("open");

                const elevatorCenterX = this.back.x + this.back.width / 5;
                const elevatorCenterY = this.back.y + this.back.height / 3;
                player.setDepth(this.back.depth + 1);
                this.scene.tweens.add({
                    targets: player,
                    x: elevatorCenterX,
                    y: elevatorCenterY,
                    duration: 2000,
                    ease: 'Linear',
                    onComplete: () => {
                        player.body.setAllowGravity(true);
                        this.scene.input.keyboard.enabled = true;

                        if (this.back && this.front) {
                            this.back.anims.playReverse("open");
                            this.front.anims.playReverse("open");
                        }

                        this.front.on('animationcomplete', () => {
                            this.isElevatorOccupied = false;

                            this.scene.data.set('to', this.to);
                            this.scene.scene.start(this.to, { from: this.scene.scene.key });
                        });
                    }});
            }
        }
    }

    moveOut(player) {
        this.scene.input.keyboard.enabled = false;
        player.halt();

        const elevatorCenterX = this.back.x + this.back.width / 5;
        const elevatorCenterY = this.back.y + this.back.height / 3;
        player.setPosition(elevatorCenterX, elevatorCenterY);

        this.back.setTexture("elevator", 3);
        this.front.setTexture("elevator", 4);

        this.front.anims.play("open");

        this.front.once('animationcomplete', () => {
            this.scene.input.keyboard.enabled = true;

            this.scene.time.delayedCall(1000, () => {
                this.back.anims.play("close");

                this.back.once('animationcomplete', () => {
                    this.back.setTexture("elevator", 0);
                    this.front.setTexture("elevator", 0);
                });
            });
        });
    }
}
