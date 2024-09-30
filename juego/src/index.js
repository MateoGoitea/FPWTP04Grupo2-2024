import Menu from "./scenes/Menu.js";
import Play from "./scenes/Play.js";
import GameOver from "./scenes/GameOver.js";
import BonusTrack from "./scenes/BonusTrack.js";
import Victoria from "./scenes/Victoria.js";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#30303e',
	scale:{
			mode:Phaser.Scale.FIT,
			autoCenter:Phaser.Scale.CENTER_BOTH,
			width: 800,
			height: 600,
			},	
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    },

    scene: [Menu,Play,GameOver,BonusTrack,Victoria]
};

let game = new Phaser.Game(config);
