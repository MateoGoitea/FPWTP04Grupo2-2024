class Play extends Phaser.Scene{
    constructor(){
        super("Play");
        this.jugador=null;
        this.cursors=null;
        this.puntaje=0;
        this.textoDePuntaje=0;
    }

    preload(){
        this.load.image('cielo', '../juego/public/resources/img/cielo.jpg');
        this.load.image('nave', '../juego/public/resources/img/naveespacial.png');
        this.load.image('meteoro', '../juego/public/resources/img/meteoro.png');
        this.load.image('asteroides1', '../juego/public/resources/img/asteroides1.png');
    }

    create(){
        this.add.image(400,300,'cielo');
        this.jugador = this.physics.add.sprite(400,550, 'nave');
        this.jugador.setCollideWorldBounds(true);

        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({delay:1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);

        //asteroide que ser utilizara para enviar al bonus track
        this.meteoroSpecial = this.physics.add.sprite(200,0,'asteroides1');
        this.meteoroSpecial.setCollideWorldBounds(true);


        //colision entre el jugador y el asteroide
        this.physics.add.overlap(this.jugador,this.meteoroSpecial,this.bonusTrack,null,this);
       
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
    }

    
    bonusTrack(){
        this.scene.start('BonusTrack');
    }

    update(){
        this.jugador.setVelocityX(0);

        if (this.cursors.left.isDown) { //movimiento hacia la izquierda
        this.jugador.setVelocityX(-300);
        } 
        else if (this.cursors.right.isDown) { //movimiento hacia la derecha
        this.jugador.setVelocityX(300);
        }
        else if (this.cursors.up.isDown) {  //movimiento hacia arriba
            this.jugador.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {  //movimiento hacia abajo
            this.jugador.setVelocityY(300);
        }

    }
}
export default Play;