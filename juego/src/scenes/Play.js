class Play extends Phaser.Scene{
    constructor(){
        super("Play");
        this.jugador=null;
        this.cursors=null;
        
    }

    preload(){
        this.load.image('cielo', '../juego/public/resources/img/cielo.jpg');
        this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', {frameWidth:50 ,frameHeight:46});
        this.load.image('meteoro', '../juego/public/resources/img/meteoro.png');
        this.load.image('asteroide', '../juego/public/resources/img/asteroide.png');

        this.load.audio('playAudio', '../juego/public/resources/audio/play.mp3');
    }

    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200); 
    }

    gameOver(jugador) {
        this.physics.pause(); // Pausar el juego
        jugador.setTint(0xff0000); // Cambiar color para indicar el choque
        console.log('Game Over');
        
        this.playAudio.stop();
        this.scene.start('GameOver',{puntaje:this.puntaje});
    }
 
    bonusTrack(){
        this.playAudio.stop();
        this.scene.start('BonusTrack');
    }

    create(){
        this.puntaje=0;
        this.textoDePuntaje=0;
        
        this.add.image(400,300,'cielo');

        //audio
        this.playAudio = this.sound.add('playAudio');
        const soundConfig = {
            volume: 1,
            loop: true
        };
        this.playAudio.play(soundConfig);

        this.jugador = this.physics.add.sprite(400,550, 'nave',1);
        this.jugador.setCollideWorldBounds(true);

        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({delay:1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);

        //asteroide que ser utilizara para enviar al bonus track
        this.meteoroSpecial = this.physics.add.sprite(200,0,'asteroide');
        this.meteoroSpecial.setCollideWorldBounds(true);


        //colision entre el jugador y el asteroide
        this.physics.add.overlap(this.jugador,this.meteoroSpecial,this.bonusTrack,null,this);
       

        this.textoDePuntaje = this.add.text(16,16,'Puntaje: 0', {fontFamily: 'impact', fontSize:'32px', fill:'#fff'});


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

    update(){
        //Movimiento del jugador
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);

        this.jugador.anims.play('normal', true);

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
        }

        this.puntaje += 1;
        this.textoDePuntaje.setText('Puntaje: '+this.puntaje);
    }
}
export default Play;