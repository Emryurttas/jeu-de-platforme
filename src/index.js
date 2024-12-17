import Phaser from "phaser";
import config from "./config";
import Level1 from "./scene/Level1";

const game = new Phaser.Game(config);

game.scene.add("Level1", Level1);
game.scene.start("Level1");
