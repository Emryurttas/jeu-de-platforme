import Phaser from "phaser";


export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }

    create() {
        this.add.text(400, 300, 'Niveau 1').setOrigin(0.5);
    }
}