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
            up: Phaser.Input.Keyboard.KeyCodes.UP,
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

        this.keys.up.on("down", () => this.handleClimbUp());
        this.keys.down.on("down", () => this.handleClimbDown());
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

    handleClimbUp() {
        if (this.ladderGroup && this.ladderGroup.children) {
            this.ladderGroup.children.entries.forEach(ladder => {
                if (this.physics.world.overlap(this.player, ladder)) {
                    if (this.keys.up.isDown && this.keys.down.isDown) {
                        this.player.climbStop();
                    }
                    else if (this.keys.up.isDown && !this.keys.down.isDown) {
                        this.player.climbUp(ladder);
                    }
                    else if (!this.keys.up.isDown && this.keys.down.isDown) {
                        this.player.climbDown(ladder);
                    }
                    else if (this.keys.up.isUp && this.keys.down.isUp) {
                        this.player.climbStop();
                    }
                }
            });
        }
    }
    handleClimbDown() {
        if (this.ladderGroup && this.ladderGroup.children) {
            this.ladderGroup.children.entries.forEach(ladder => {
                if (this.physics.world.overlap(this.player, ladder)) {
                    if (this.keys.up.isDown && this.keys.down.isDown) {
                        this.player.climbStop();
                    }
                    else if (this.keys.down.isDown && !this.keys.up.isDown) {
                        this.player.climbDown(ladder);
                    }
                    else if (!this.keys.down.isDown && this.keys.up.isDown) {
                        this.player.climbUp(ladder);
                    }
                    else if (this.keys.up.isUp && this.keys.down.isUp) {
                        this.player.climbStop();
                    }
                }
            });
        }
    }
}
