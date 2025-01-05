import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.fadeIn(500);

        this.titleText = this.add.text(400, 200, 'Game Over', {
            fontSize: '64px',
            color: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.titleText,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            ease: 'Bounce.easeOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        this.instructionText = this.add.text(400, 300, 'Click to Restart', {
            fontSize: '32px',
            color: '#fff',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.instructionText,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Elastic.easeOut',
            duration: 1000,
            repeat: -1
        });

        this.input.once('pointerdown', () => {
            this.scene.start('Level1');
        });
    }
}
