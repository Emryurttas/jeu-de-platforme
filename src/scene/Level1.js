import Phaser from "phaser";
import Elevator from "../object/Elevator.js";
import StoneGroup from "../object/StoneGroup.js";
import LavaGroup from "../object/LavaGroup.js";
import Player from "../object/Player.js";
import Background from "../object/Background.js";
import Level from "./Level.js";

export default class Level1 extends Level {
    constructor() {
        super({ key: "Level1" });
    }

    preload() {
        StoneGroup.preload(this);
        LavaGroup.preload(this);
        Player.preload(this);
        Background.preload(this);
        Elevator.preload(this);
    }

    create() {
        this.add.text(400, 50, "Niveau 1").setOrigin(0.5);

        this.background = new Background(this);

        this.stoneGroup = new StoneGroup(this);
        this.stoneGroup.addTiles(0, 8, 4);
        this.stoneGroup.addTiles(8, 8, 14);
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
        this.physics.add.overlap(this.player, this.lavaGroup, () => {this.player.death();});

        this.elevator = new Elevator(this);
        this.elevator.back.setPosition(21 * 64, 7 * 64);

        this.elevator.back.body.setSize(this.elevator.back.width, this.elevator.back.height);


        this.physics.add.existing(this.elevator.back, true);

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setBounds(0, 0, 1472, 640);

        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
        });

        this.handleInput();
    }
}
