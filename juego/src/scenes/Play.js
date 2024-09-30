class Play extends Phaser.Scene{
    constructor(){
        super("Play");
        this.jugador=null;
        this.cursors=null;
        this.asx = Phaser.Math.Between(0, 800); 
        
    }

    preload(){
        this.load.image('cielo', '../juego/public/resources/img/cielo.jpg');
        this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', {frameWidth:50 ,frameHeight:46});
        this.load.image('meteoro', '../juego/public/resources/img/meteoro.png');
        this.load.image('asteroide', '../juego/public/resources/img/asteroide.png');
        
        this.load.spritesheet({
            	key:'naveB',
				url: '../juego/public/resources/img/spritenaveB.png',
				frameConfig: {
					frameWidth: 50,
					frameHeight: 46,
					startFrame:0,
					endFrame: 5
					
					}
				});
        
    }

    create(){
        this.puntaje=0;
        this.textoDePuntaje=0;
        
        this.add.image(400,300,'cielo');
        this.jugador = this.physics.add.sprite(400,550, 'naveB',1);
        
        this.jugador.setCollideWorldBounds(true);
        
        

        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({delay:1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);
		

        //asteroide que ser utilizara para enviar al bonus track
        const v = Phaser.Math.Between(0, 800); 
        this.meteoroSpecial = this.physics.add.sprite(v ,30,'asteroide');
        this.meteoroSpecial.setCollideWorldBounds(true);


        //colision entre el jugador y el asteroide
        this.physics.add.overlap(this.jugador,this.meteoroSpecial,this.bonusTrack,null,this);
       

        this.textoDePuntaje = this.add.text(16,16,'Puntaje: 0', {fontFamily: 'impact', fontSize:'32px', fill:'#fff'});


      /*  this.anims.create({
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
        });*/
        
        ///////////// Animaciones NavecitaB ////////////////////
       
       
        const reposo = {
				key:"reposo",
				frames: this.anims.generateFrameNumbers('naveB', {frames:[2,3]}),
				frameRate:24,
				repeat:-1
				}
			const izquierda = {
				key:"izquierda",
				frames: this.anims.generateFrameNumbers('naveB', {frames:[0,1]}),
				frameRate:24,
				repeat:-1
				}
			const derecha = {
				key:"derecha",
				frames: this.anims.generateFrameNumbers('naveB', {frames:[4,5]}),
				frameRate:24,
				repeat:-1
				}
				
			this.anims.create(reposo);
			this.anims.create(izquierda);
			this.anims.create(derecha);
        ///////////////////////////////////////////////////////////////////////////
        
        
    }
    
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200); 
    }

    gameOver(jugador) {
		this.sound.stopAll(); ///// Detiene la musique que se ejecute.
		
        this.physics.pause(); // Pausar el juego
        jugador.setTint(0xff0000); // Cambiar color para indicar el choque
        console.log('Game Over');

        this.scene.start('GameOver',{puntaje:this.puntaje});
    }

    
    bonusTrack(){
		
        this.sound.stopAll();
        this.scene.start('BonusTrack', {puntaje: this.puntaje});
    }

    movePlayer(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);

       // this.jugador.anims.play('normal', true);
       /* this.jugador.anims.play('reposo', true);
  
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
				
			}
		generarPuntaje (jugador){
			puntaje +=1;
			this.puntajeTexto.setText('puntaje: ' + this.puntaje);
		}
				
        
        
        /////////////////////////////////////////////////////////////////////////
        
       


    update(){

        this.movePlayer();

        this.puntaje += 1;
        this.textoDePuntaje.setText('Puntaje: '+this.puntaje);
    }
}
export default Play;
