import Phaser from "phaser";

export default class TileGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, tileName, tileWidth,tileHeight) {
        super(scene, tileName, tileWidth,tileHeight);
        this.tileName = tileName;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

    }

    addTiles(x, y, width = 1, height = 1) {

    }
}