import TileGroup from "./TileGroup.js";

export default class StoneGroup extends TileGroup {
    constructor(scene) {
        super(scene, "lava", 64, 64);
    }
    static preload(scene) {
        scene.load.image("lava", "/img/lava.png");
    }
}
