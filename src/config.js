import Phaser from "phaser";

export default {
    type: Phaser.AUTO,
    physics: { default: "arcade" },
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
};
