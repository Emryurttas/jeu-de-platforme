import Phaser from "phaser";

export const urls = ["img/bg.png", "img/dust1.png", "img/dust2.png"];

export default class Background extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.scene = scene;
        this.tileSprites = [];

        urls.forEach((url, index) => {
            const imageName = url.split('/').pop().split('.')[0];
            const tileSprite = this.scene.add.tileSprite(0, 0, 1472, 640, imageName);
            tileSprite.setOrigin(0, 0);
            tileSprite.setScrollFactor(0);
            tileSprite.setTilePosition(0, 0);
            this.tileSprites.push(tileSprite);

            this.scene.cameras.main.on("followupdate", () => {
                const parallax = this.scene.cameras.main.scrollX * (1 + (index * 0.2));
                tileSprite.setTilePosition(parallax, this.scene.cameras.main.scrollY);
            });
        });
    }

    static preload(scene) {
        urls.forEach((url) => {
            const imageName = url.split('/').pop().split('.')[0];
            console.log(`Préchargement de l'image: ${imageName}`);
            scene.load.image(imageName, url);
        });
    }
}
