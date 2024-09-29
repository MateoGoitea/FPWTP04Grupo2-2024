class GameOver extends Phaser.Scene{
    constructor(){
        super ('GameOver');
    }

    init(data){
        this.puntaje = data.puntaje;
    }

    create(){
        this.add.text(400,200,'Game Over', {fontFamily: 'impact', fontSize:'64px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,300,'Puntaje: '+this.puntaje, {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para volver a jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        
        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('Play');
        })
    }


}
export default GameOver;

