import Phaser from "phaser";
import Player from "../object/Player.js";

export default class Level extends Phaser.Scene {
    constructor(key) {
        super({ key: key });
        this.elevators = [];

    }
    create() {
        this.layers = {
            bg: this.add.layer(),
            back: this.add.layer(),
            player: this.add.layer(),
            front: this.add.layer(),
        };

    }

    preload() {
        Player.preload(this);
    }

    initScene(xPlayer, yPlayer, levelBound) {
        this.player = new Player(this, xPlayer, yPlayer);
        this.layers.player.add(this.player);

        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
        });

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
        this.elevators.forEach((elevator) => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, elevator.back.x, elevator.back.y);

            if (distance < 50 && this.player.body.onFloor()) {
                elevator.moveIn(this.player);
            }
        });
    }

    setBounds(x, y, width, height) {
        this.cameras.main.setBounds(x, y, width, height);
        this.physics.world.setBounds(x, y, width, height);
    }
}
