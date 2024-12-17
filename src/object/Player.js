import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.world.enable(this);


        this.setOrigin(0, 0);

        this.body.setGravityY(1000);

        this.setSize(40, 40);
        this.setCollideWorldBounds(true);

    }
    static preload(scene) {
        scene.load.spritesheet("player", "/img/player.png", { frameWidth: 40, frameHeight: 40 });
    }
    #move(velocity) {
        this.moveTween = this.scene.tweens.add({
            targets: this.body.velocity,
            x: velocity,
            duration: 300,
        });
    }
    moveRight() {
        this.#move(300);
    }
    moveLeft() {
        this.#move(-300);
    }
    halt(){
        this.moveTween = this.scene.tweens.add({
            targets: this.body.velocity,
            x: 0,
            duration: 300,
        });
    }



}
