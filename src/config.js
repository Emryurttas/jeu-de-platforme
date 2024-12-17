
import Phaser from "phaser";
import Title from "./scene/Title.js";
import Level1 from "./scene/Level1.js";

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
        scene: [Title, Level1],
    },
};
