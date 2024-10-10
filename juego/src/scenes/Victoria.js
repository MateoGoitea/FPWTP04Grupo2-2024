class Victoria extends Phaser.Scene{
	
	
    constructor(){
        super ('Victoria');
        
        this.mvictoria=null;
    }

    init(data){
        this.puntaje = data.puntaje;
        this.bossLife=300;
    }
    
    preload(){
		
		this.load.audio('mvictoria', '../juego/public/resources/audio/theVictory.mp3');

		this.load.image('espacio', '../juego/public/resources/img/espacio.jpg');
		this.load.image('planeta', '../juego/public/resources/img/planeta1.png');
		this.load.image('neb1', '../juego/public/resources/img/neb1.png');
		this.load.image('neb2', '../juego/public/resources/img/neb2.png');
		
	}

    create(){
		
		this.mvictoria = this.sound.add("mvictoria");
			let mConfig = {
				mute: false,
				volume: 0.3,
				rate: 1,
				loop: false,
				};
			this.mvictoria.play(mConfig);
		
		this.add.image(400,300,'espacio').setDisplaySize(this.sys.game.config.width,this.sys.game.config.height).setScale(2.5);
		this.planeta = this.add.image(400,200, 'planeta').setScale(1.5);
		this.neb1 = this.add.image(400,300, 'neb1');
		this.neb2 = this.add.image(400,300, 'neb2');
		
		
        this.add.text(400,200,'Ud. a derrotado al Maligno', {fontFamily: 'impact', fontSize:'48px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,300,'Puntaje: '+this.puntaje, {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para volver a jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        
        
        this.input.keyboard.once('keydown-SPACE', () =>{
			this.sound.stopAll(); ///// Detiene la musique que se ejecute.
			this.bossLife=300;
			this.puntaje=0;
			this.scene.start('Play');
        })
    }
   //////////////////// Animación Fondo ///////////////////////////// 
    update(){
		this.neb1.x += 0.1;
		this.neb1.y += 0.1;
		this.neb2.x -= 0.1;
		this.neb2.y -= 0.1;
		this.planeta.y += 0.02;
		this.planeta.x -= 0.01;
		//this.neb1.y -= 0.2;
		//this.neb2.y -= 0.2;
		
	}
	/////////////////////////////////////////////////////////////

}
export default Victoria;

