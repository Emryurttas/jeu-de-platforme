import Phaser from "phaser";
import config from "./config";
import Title from "./scene/Title.js";
import Level1 from "./scene/Level1.js";
import Level2 from "./scene/Level2.js";

const game = new Phaser.Game(config);

game.scene.add("Title", Title);
game.scene.add("Level1", Level1);
game.scene.add("Level2", Level2);

game.scene.start("Level2");
