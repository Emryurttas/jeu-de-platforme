import Phaser from "phaser";

export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }
    create() {
        this.cameras.main.fadeIn(500);
        this.titleText = this.add.text(400, 200, 'Platformer').setOrigin(0.5);

        this.instructionText = this.add.text(400, 400, 'START').setOrigin(0.5);

        this.tweens.add({
            targets: this.instructionText,
            scaleX: 2,
            scaleY: 2,
            ease: 'Elastic.easeOut',
            duration: 1000,
            repeat: -1
        });

        this.input.once('pointerdown', () => {
            this.scene.start('Level1');
        });
    }
}