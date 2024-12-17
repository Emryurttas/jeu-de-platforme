import Phaser from "phaser";
import StoneGroup from "../object/StoneGroup.js";
import LavaGroup from "../object/LavaGroup.js";
import Player from "../object/Player.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }

    preload() {
        StoneGroup.preload(this);
        LavaGroup.preload(this);
        Player.preload(this);
    }

    create() {
        this.add.text(400, 50, "Niveau 1").setOrigin(0.5);

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
        this.lavaGroup.addTiles(4, 8, 4)

        this.stoneGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
        this.lavaGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
        this.player = new Player(this, 40, 280);
    }
}
