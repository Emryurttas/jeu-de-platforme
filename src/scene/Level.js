import Phaser from "phaser";
import Player from "../object/Player.js";

export default class Level extends Phaser.Scene {
    constructor(key) {
        super({ key: key });
        this.elevators = [];
    }

    preload() {
        Player.preload(this);
    }

    initScene(xPlayer, yPlayer, levelBound) {
        this.player = new Player(this, xPlayer, yPlayer);
        this.physics.add.collider(this.player, this.stoneGroup);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setBounds(levelBound.x, levelBound.y, levelBound.width, levelBound.height);

        this.handleInput();
    }


    handleInput() {
        this.keys.left.on("down", () => this.handleMove());
        this.keys.left.on("up", () => this.handleMove());

        this.keys.right.on("down", () => this.handleMove());
        this.keys.right.on("up", () => this.handleMove());

        this.keys.space.on("down", () => this.handleJump());
        this.keys.down.on("down", () => this.#handleInteract());
    }

    handleMove() {
        if (this.keys.left.isDown && this.keys.right.isDown) {
            this.player.halt();
        }
        else if (this.keys.left.isDown) {
            this.player.moveLeft();
        }
        else if (this.keys.right.isDown) {
            this.player.moveRight();
        }
        else {
            this.player.halt();
        }
    }

    handleJump() {
        if (this.keys.space.isDown) {
            this.player.jump();
        }
    }

    #handleInteract() {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.elevator.back.x, this.elevator.back.y);

        if (distance < 50 && this.player.body.onFloor()) {
            this.elevator.moveIn(this.player);
        }
    }

    setBounds(x, y, width, height) {
        this.cameras.main.setBounds(x, y, width, height);
        this.physics.world.setBounds(x, y, width, height);
    }
}
