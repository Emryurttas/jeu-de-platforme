import StoneGroup from "../object/StoneGroup.js";
import Player from "../object/Player.js";
import Background from "../object/Background.js";
import Elevator from "../object/Elevator.js";
import LadderGroup from "../object/LadderGroup.js";
import Level from "./Level.js";

export default class Level2 extends Level {
    constructor() {
        super("Level2");
    }

    preload() {
        super.preload();
        StoneGroup.preload(this);
        Player.preload(this);
        Background.preload(this);
        Elevator.preload(this);
        LadderGroup.preload(this);
    }

    create() {
        super.create();

        this.initScene(15, 280, { x: 0, y: 0, width: 1472, height: 640 });

        this.background = new Background(this);
        this.layers.bg.add(this.background.tileSprites);

        this.stoneGroup = new StoneGroup(this);
        this.stoneGroup.addTiles(0, 8, 15);
        this.stoneGroup.addTiles(6, 3, 3);
        this.stoneGroup.addTiles(12, 3, 2);

        this.stoneGroup.children.entries.forEach(child => {
            this.layers.back.add(child);
        });

        this.stoneGroup.children.iterate((tile) => {
            tile.refreshBody();
        });

        this.physics.add.collider(this.player, this.stoneGroup);

        this.ladderGroup = new LadderGroup(this);
        this.ladderGroup.addTiles(4, 3, 1, 4);
        this.ladderGroup.addTiles(8, 3, 1, 2);
        this.ladderGroup.children.entries.forEach(child => {
            this.layers.back.add(child);
        });

        this.ladderGroup.children.iterate((tile) => {
            tile.refreshBody();
        });

        this.elevator = new Elevator(this, "Level1");
        this.elevator.back.setPosition(64, 7*64);
        this.elevators.push(this.elevator);
        this.layers.back.add(this.elevator.back);
        this.layers.front.add(this.elevator.front);
        this.physics.add.existing(this.elevator.back, true);

        this.elevator2 = new Elevator(this, "GameOver");
        this.elevator2.back.setPosition(13*64, 2*64);
        this.elevators.push(this.elevator2);
        this.layers.back.add(this.elevator2.back);
        this.layers.front.add(this.elevator2.front);
        this.physics.add.existing(this.elevator2.back, true);

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setBounds(0, 0, 1472, 640);

        const fromSceneKey = this.scene.settings.data.from;
        console.log('Scene venant de :', fromSceneKey);

        if (fromSceneKey === 'Level1') {
            this.elevator.moveOut(this.player);
        }
    }
}
