import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.world.enable(this);


        this.setOrigin(0, 0);

        this.body.setGravityY(1000);

        this.setSize(40, 40);
        this.body.setCollideWorldBounds(true);

        this.#createAnims();
    }

    #createAnims() {
        this.anims.create({
            key: 'stand',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
            frameRate: 20,
            repeat: -1
        });
    }

    static preload(scene) {
        scene.load.spritesheet("player", "/img/player.png", { frameWidth: 40, frameHeight: 40 });
    }
    #move(velocity) {
        if (this.moveTween) {
            this.moveTween.destroy();
        }
        this.moveTween = this.scene.tweens.add({
            targets: this.body.velocity,
            x: velocity,
            duration: 300,
        });
    }
    moveRight() {
        this.#move(300);
        this.anims.play('right', true);
        this.setFlipX(false);
    }
    moveLeft() {
        this.#move(-300);
        this.anims.play('right', true);
        this.setFlipX(true);
    }
    halt(){
        if (this.moveTween) {
            this.moveTween.destroy();
        }
        this.moveTween = this.scene.tweens.add({
            targets: this.body.velocity,
            x: 0,
            duration: 300,
        });
        this.anims.play('stand', true);
    }
    jump() {
        if (this.body.onFloor()) {
            this.body.setVelocityY(-600);
            this.anims.play('stand', true);
        }
    }
}
