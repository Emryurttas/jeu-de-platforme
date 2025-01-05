import Elevator from "../object/Elevator.js";
import StoneGroup from "../object/StoneGroup.js";
import LavaGroup from "../object/LavaGroup.js";
import Player from "../object/Player.js";
import Background from "../object/Background.js";
import Level from "./Level.js";

export default class Level1 extends Level {
    constructor() {
        super("Level1");
    }

    preload() {
        super.preload();

        StoneGroup.preload(this);
        LavaGroup.preload(this);
        Player.preload(this);
        Background.preload(this);
        Elevator.preload(this);
    }

    create() {
        super.create();

        this.initScene(40, 280, { x: 0, y: 0, width: 1472, height: 640 });

        this.background = new Background(this);
        this.layers.bg.add(this.background.tileSprites);

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

        this.stoneGroup.children.entries.forEach(child => {
            this.layers.back.add(child);
        });


        this.lavaGroup = new LavaGroup(this);
        this.lavaGroup.addTiles(4, 8, 4);

        this.lavaGroup.children.entries.forEach(child => {
            this.layers.back.add(child);
        });

        this.stoneGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
        this.lavaGroup.children.iterate((tile) => {
            tile.refreshBody();
        });

        this.physics.add.collider(this.player, this.stoneGroup);
        this.physics.add.overlap(this.player, this.lavaGroup, () => {this.player.death();});

        this.elevator = new Elevator(this, "Level2");

        this.elevator.back.setPosition(21 * 64, 7 * 64);
        this.elevator.front.setPosition(21 * 64, 7 * 64);

        this.elevators.push(this.elevator);

        this.layers.back.add(this.elevator.back);
        this.layers.front.add(this.elevator.front);

        this.elevator.back.body.setSize(this.elevator.back.width, this.elevator.back.height);
        this.physics.add.existing(this.elevator.back, true);

        this.elevator.back.refreshBody();
        this.elevator.front.refreshBody && this.elevator.front.refreshBody();


        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setBounds(0, 0, 1472, 640);

    }
}
