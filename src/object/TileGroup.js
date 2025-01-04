import Phaser from "phaser";

export default class TileGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene, tileName, tileWidth, tileHeight, offsetX = 0, offsetY = 0) {
        super(scene.physics.world, scene);
        this.tileName = tileName;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    addTiles(x, y, width = 1, height = 1) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const tile = this.create(
                    (x + i) * this.tileWidth + this.offsetX,
                    (y + j) * this.tileHeight + this.offsetY,
                    this.tileName
                );
                tile.setOrigin(0, 0);
            }
        }
        return this;
    }
}
