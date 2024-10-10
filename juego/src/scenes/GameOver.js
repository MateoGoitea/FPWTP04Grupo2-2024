class GameOver extends Phaser.Scene{
	
	
    constructor(){
        super ('GameOver');
    }

    init(data){
        this.puntaje = data.puntaje;
    }
    
    preload(){
		
		this.load.audio('mderrota', '../juego/public/resources/audio/stones.mp3');
		this.load.image('espacio2', '../juego/public/resources/img/espacio.jpg');
		this.load.image('espacio1', '../juego/public/resources/img/cielo.jpg');
		this.load.image('restos1', '../juego/public/resources/img/restos2.png');
		this.load.image('restos2', '../juego/public/resources/img/restos1.png');
		this.load.image('restos3', '../juego/public/resources/img/restos3.png');
		
	}

    create(){
		
		this.mderrota = this.sound.add("mderrota");
			let musicaConfig = {
				mute: false,
				volume: 0.3,
				rate: 1,
				detune: 0,
				seek: 0,
				loop: false,
				delay: 0
				};
			this.mderrota.play(musicaConfig);
		
		this.add.image(400,300,'espacio1').setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);
		this.restos1 = this.add.image(400,300, 'restos1').setScale(0.5);
		this.restos2 = this.add.image(400,200, 'restos2');
		this.restos3 = this.add.image(400,300, 'restos3');
		
		
        this.add.text(400,200,'Game Over', {fontFamily: 'impact', fontSize:'64px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,300,'Puntaje: '+this.puntaje, {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para volver a jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        
        
        this.input.keyboard.once('keydown-SPACE', () =>{
			this.sound.stopAll(); ///// Detiene la musique que se ejecute.

			if (this.puntaje <=2000){
				this.scene.start('Play');
			}
			if(this.puntaje >=2000){
				this.scene.start('Play02');
			}
            
        })
    }
   //////////////////// Animación Fondo ///////////////////////////// 
    update(){
		this.restos1.x -= 0.03;
		this.restos2.x += 0.1;
		this.restos3.x -= 0.2;
		this.restos3.z -= 0.2;
		
	}
	/////////////////////////////////////////////////////////////


}
export default GameOver;

