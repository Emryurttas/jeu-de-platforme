import Phaser from "phaser";

export default class Background extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.scene = scene;

        this.tileSprite = scene.add.tileSprite(0, 0, 1472, 640, "bg");
        this.tileSprite.setOrigin(0, 0);
        this.tileSprite.setScrollFactor(0);

        scene.cameras.main.on("followupdate", () => {
            this.tileSprite.setTilePosition(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY);
        });
    }
    static preload(scene) {
        scene.load.image("bg", "/img/bg.png");
    }
}
