import Phaser from "phaser";
import StoneGroup from "../object/StoneGroup.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }
    preload() {
        StoneGroup.preload(this);
    }

    create() {
        this.add.text(400, 50, "Niveau 1").setOrigin(0.5);

        this.stoneGroup = new StoneGroup(this);

        this.stoneGroup.addTiles(2,3,3);

        this.stoneGroup.children.iterate((tile) => {
            tile.refreshBody();
        });
    }
}
