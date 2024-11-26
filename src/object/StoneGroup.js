import TileGroup from "./TileGroup.js";

export default class StoneGroup extends TileGroup{
    constructor(scene) {
        super(scene, 'stone', 64, 64);
    }
}