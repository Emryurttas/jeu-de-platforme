import TileGroup from "./TileGroup.js";

export default class StoneGroup extends TileGroup{
    constructor(scene) {
        super(scene, 'stone', 64, 64);
    }
    static preload(scene) {
        scene.load.image('stone', 'imj/stone.png');
    }
}