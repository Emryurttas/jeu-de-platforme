import Phaser from "phaser";
import Title from "./scene/Title.js";
import Level1 from "./scene/Level1.js";
import Level2 from "./scene/Level2.js";
import GameOver from "./scene/GameOver.js";

export default {
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
        scene: [Title, Level1, Level2, GameOver],
    },
};
