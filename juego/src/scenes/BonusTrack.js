class BonusTrack extends Phaser.Scene{

    constructor(){
        super('BonusTrack');
        this.jugador=null;
        this.cursors=null;
        this.puntaje = 0;
        this.puntajeTexto=0;
        this.portal=null;
        this.portalg=null;

    }
           

    preload(){
		
		this.load.audio('ruido', '../juego/public/resources/audio/ruido.mp3');

        this.load.image('espacio', '../juego/public/resources/img/espacio.jpg');
        
        this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', {frameWidth:50 ,frameHeight:46});

        this.load.image('asteroide', '../juego/public/resources/img/asteroide.png');
        
        this.load.spritesheet({
            	key:'portal',
				url: '../juego/public/resources/img/portal.png',
				frameConfig: {
					frameWidth: 100,
					frameHeight: 100,
					startFrame:0,
					endFrame:2,
					repeat: -1
					}
				});

        this.cursors = this.input.keyboard.createCursorKeys();
        
     
    }
    
    init(data){
			this.puntaje = data.puntaje;
		}

    create(){
		

        //ajusta la imagen al tamaño determinado en la variable config del index.js
        this.add.image(400,300,'espacio').setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);
        
        const portalg = {
				key:"portal",
				frames: this.anims.generateFrameNumbers('portal', {frames:[0,1,2]}),
				frameRate:16,
				repeat:-1
				}
			this.anims.create(portalg);
			
			
        
        this.puntajeTexto = this.add.text(16,16,'Puntaje: 0', {fontFamily: 'impact', fontSize:'32px', fill:'#fff'});
        this.add.text(50,550,'ingresa al un portal', {fontFamily: 'impact', fontSize: '18px', fill: '#fff'});
        
        this.jugador = this.physics.add.sprite(400,550, 'nave',1);
        this.jugador.setCollideWorldBounds(true);
        
        this.animacionPlayer();

        this.grupoAsteroides = this.physics.add.group();
        this.grupoPortales = this.physics.add.group(); // Creando el grupo de meteoritos
        
        this.time.addEvent({delay:500, callback:this.generarAsteroides, callbackScope:this, loop:true});
		this.time.addEvent({ delay: 1500, callback: this.generarPortales, callbackScope: this, loop: true });

        this.physics.add.collider(this.jugador, this.grupoAsteroides, this.gameOver, null, this);
		this.physics.add.collider(this.jugador, this.grupoPortales, this.Victoria, null, this);

        
        
    }

	generarPuntaje (jugador){
			puntaje +=1;
			this.puntajeTexto.setText('Puntaje: ' + this.puntaje);
		}   
   
    generarAsteroides(){
        const x = Phaser.Math.Between(0, 800); 
        const asteroide = this.grupoAsteroides.create(x, 0, 'asteroide');
        asteroide.setVelocityY(200); 

        console.log("asteroide generado");    
    }    
    
    generarPortales(){
			const x = Phaser.Math.Between(0, 800); // Posición aleatoria en el eje X
			const portalg = this.grupoPortales.create(x,0, 'portal',);
			portalg.play("portal",true);
			portalg.setVelocityY(150); // Velocidad vertical hacia abajo
			}   
        

    animacionPlayer(){

        this.anims.create({
            key:'izquierda',
            frames: [{key:'nave', frame:0}],
            frameRate: 20
        });
        this.anims.create({
            key:'normal',
            frames: [{key:'nave', frame:1}],
            frameRate: 20
        });
        this.anims.create({
            key:'derecha',
            frames: [{key:'nave', frame:2}],
            frameRate: 20
        });
    }

    gameOver(jugador) {

        this.physics.pause(); // Pausar el juego
        jugador.setTint(0xff0000); // Cambiar color para indicar el choque
        console.log('Game Over');  

        this.scene.start('GameOver',{puntaje:this.puntaje});
    }
    
    Victoria(jugador, grupoPortales) {
			
			this.sound.stopAll();
			this.physics.pause();// Pausar el juego
			jugador.setTint(0xff0000);// Cambiar color para indicar el choque
			
			const rportal = this.sound.add('ruido');
			const soundConfig = {
				volume: 1,
				loop: false
				};
			rportal.play(soundConfig);
			
			this.scene.start('Victoria', {puntaje: this.puntaje});
			console.log('Gano');
			
			}

    movePlayer(){
        
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);

        /*this.jugador.anims.play('normal', true);

        if (this.cursors.left.isDown) { //movimiento hacia la izquierda
        this.jugador.setVelocityX(-300);
        this.jugador.anims.play('izquierda', true);
        } 
        else if (this.cursors.right.isDown) { //movimiento hacia la derecha
        this.jugador.setVelocityX(300);
        this.jugador.anims.play('derecha', true);
        }
        else if (this.cursors.up.isDown) {  //movimiento hacia arriba
            this.jugador.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {  //movimiento hacia abajo
            this.jugador.setVelocityY(300);
        }*/
        
         ////////////////// Navecita con Animación de llamitas /////////////////////////
        
				if (this.cursors.up.isDown){
					this.jugador.setVelocityY(-180);
				}
				if (this.cursors.down.isDown){
					this.jugador.setVelocityY(120);
				}
				
				if (this.cursors.left.isDown) {
					
					this.jugador.setVelocityX(-180); // Mover a la izquierda
					this.jugador.play("izquierda",true);
				}
											 
				else if (this.cursors.right.isDown) {
					this.jugador.setVelocityX(180); // Mover a la derecha
					this.jugador.play("derecha",true);
				}
				else {
					this.jugador.play("reposo",true);
				}
        
        
        /////////////////////////////////////////////////////////////////////////
    }
    
    

    update(){
		
		this.movePlayer();
		this.puntaje +=1;
		this.puntajeTexto.setText('puntaje: ' + this.puntaje);
		
		
    }

}
export default BonusTrack;
