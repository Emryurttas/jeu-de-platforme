import Phaser from "phaser";
import StoneGroup from "../object/StoneGroup.js";
import LavaGroup from "../object/LavaGroup.js";
import Player from "../object/Player.js";
import Background from "../object/Background.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }

    preload() {
        StoneGroup.preload(this);
        LavaGroup.preload(this);
        Player.preload(this);
        Background.preload(this);
    }

    create() {
        this.add.text(400, 50, "Niveau 1").setOrigin(0.5);

        this.background = new Background(this);

        this.stoneGroup = new StoneGroup(this);
        this.stoneGroup.addTiles(0, 8, 4);
        this.stoneGroup.addTiles(8, 8, 5);
        this.stoneGroup.addTiles(2, 7, 1);
        this.stoneGroup.addTiles(4, 6, 1);
        this.stoneGroup.addTiles(6, 5, 3);
        this.stoneGroup.addTiles(3, 1, 3);
        this.stoneGroup.addTiles(7, 3);
        this.stoneGroup.addTiles(9, 7, 1);
        this.stoneGroup.addTiles(11, 6, 1);

        this.lavaGroup = new LavaGroup(this);
        this.lavaGroup.addTiles(4, 8, 4);

        this.stoneGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
        this.lavaGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
        this.player = new Player(this, 40, 280);
        this.physics.add.collider(this.player, this.stoneGroup);

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setBounds(0, 0, 1472, 640);

        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        this.handleInput();
    }
    handleInput() {
        this.keys.left.on("down", () => this.handleMove());
        this.keys.left.on("up", () => this.handleMove());

        this.keys.right.on("down", () => this.handleMove());
        this.keys.right.on("up", () => this.handleMove());

        this.keys.space.on("down", () => this.handleJump());

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
    setBounds(x, y, width, height) {
        this.cameras.main.setBounds(x, y, width, height);
        this.physics.world.setBounds(x, y, width, height);
    }
}
