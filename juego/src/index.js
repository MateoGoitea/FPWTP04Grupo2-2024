import Play from "./scenes/Play.js";
//import GameOver from "../scenes/GameOver.js";
import BonusTrack from "./scenes/BonusTrack.js";

const config = {
    type: Phaser.AUTO,
    backgroundColor: 0x944ad0,

    width: 800,
    height: 600,

    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    },

    //scene: Play
    //scene: [Play,GameOver]
    scene : [Play,BonusTrack]
    //scene : BonusTrack
};

let game = new Phaser.Game(config);