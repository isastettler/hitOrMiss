/** @type {import("../typings/phaser")} */
/*At some point, the typings will
be officially added to the official release so that all you'll have to do is do:
npm install @types/phaser
But this hasn't happened yet!*/

import "phaser";
import config from "./config/config";

import MainScene from "./scenes/MainScene";
import IntroScene from "./scenes/IntroScene";
import GameOver from "./scenes/GameOver";
import WinnerScene from "./scenes/WinnerScene";

class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.scene.add("MainScene", MainScene);
        this.scene.add("IntroScene", IntroScene)
        this.scene.add("GameOver", GameOver);
        this.scene.add("WinnerScene", WinnerScene);
        this.scene.start("IntroScene");
    }
}

window.onload = function () {
    window.game = new Game();
}
