import Phaser from "phaser";

export default class TileGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, tileName, tileWidth, tileHeight) {
        super(scene);
        this.tileName = tileName;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    addTiles(x, y, width = 1, height = 1) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.create(
                    x * this.tileWidth + (i * this.tileWidth),
                    y * this.tileHeight + (j * this.tileHeight),
                    this.tileName
                );
            }
        }
        return this;
    }
}
