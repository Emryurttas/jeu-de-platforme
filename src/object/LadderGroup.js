import TileGroup from "./TileGroup.js";

export default class LadderGroup extends TileGroup {
    constructor(scene) {
        super(scene, "ladder", 40, 64, 12, 0);
    }

    static preload(scene) {
        scene.load.image("ladder", "/img/ladder.png");
    }
}
