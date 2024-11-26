import Phaser from "phaser";

export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }
    create() {
        this.titleText = this.add.text(400, 200, 'Platformer').setOrigin(0.5);

        this.instructionText = this.add.text(400, 400, 'Click').setOrigin(0.5);

        this.tweens.add({
            targets: this.instructionText,
            scaleX: 2,
            scaleY: 2,
            ease: 'Elastic.easeOut',
            duration: 1000,
            repeat: -1
        });
    }
}