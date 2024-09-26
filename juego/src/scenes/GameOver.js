class GameOver extends Phaser.Scene{
    constructor(){

    }

    init(data){
        this.puntaje = data.puntaje;
    }

    create(){


        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('Play');
        })
    }
}
export default GameOver;

