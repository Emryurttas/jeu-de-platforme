import Phaser from "phaser";
import config from "./config";
import Title from "./scene/Title";

const game = new Phaser.Game(config);

game.scene.add("Title", Title);
game.scene.start("Title");
