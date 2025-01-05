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

        this.isClimbing = false;

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
        scene.load.image("particle", "/img/particle.png");
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

    death() {
        this.scene.input.enabled = false;
        this.body.setEnable(false);

        const playerCenterX = this.x + this.width / 2;
        const playerCenterY = this.y + this.height / 2;

        this.scene.add.particles(playerCenterX, playerCenterY, "particle", {
            lifespan: { min: 300, max: 600 },
            speed: { min: 100, max: 300 },
            scale: { start: 0.8, end: 0.5 },
            quantity: 30,
            frequency: 20,
            angle: { min: 0, max: 360 },
            rotate: { min: -180, max: 180 },
            gravityY: 100,
            alpha: { start: 0.9, end: 0 },
            color: [0xFF6347, 0xFF4500, 0xFFD700, 0xFFFFFF],
            blendMode: Phaser.BlendModes.ADD,
            emitting: true,
        });

        this.setVisible(false);
        this.body.setCollideWorldBounds(false);
        this.scene.physics.world.disable(this);

        this.scene.time.delayedCall(2000, () => {
            this.scene.input.enabled = true;
            this.scene.scene.restart();
        });
    }

    climbUp(ladders) {
        this.ladderGroup = ladders;
        this.body.setAllowGravity(false);
        this.body.setVelocityY(0);
        this.isClimbing = true;
        this.scene.tweens.add({
            targets: this.body.velocity,
            y: -200,
            duration: 300,
        });
    }

    climbDown(ladders) {
        this.ladderGroup = ladders;
        this.body.setAllowGravity(false);
        this.body.setVelocityY(0);
        this.isClimbing = true;
        this.scene.tweens.add({
            targets: this.body.velocity,
            y: 200,
            duration: 300,
        });
    }
}
