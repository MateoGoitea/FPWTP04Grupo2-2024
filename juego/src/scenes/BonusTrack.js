class BonusTrack extends Phaser.Scene{

    constructor(){
        super('BonusTrack');
        this.jugador=null;
        this.cursors=null;
    }

    preload(){
        this.load.image('espacio', '../juego/public/resources/img/espacio.jpg');
        this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', {frameWidth:50 ,frameHeight:46});

        this.cursors = this.input.keyboard.createCursorKeys();
      
    }

    create(){
        //ajusta la imagen al tamaño determinado en la variable config del index.js
        this.add.image(400,300,'espacio').setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);
        
        this.jugador = this.physics.add.sprite(400,550, 'nave',1);
        this.jugador.setCollideWorldBounds(true);

        this.animacionPlayer();
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
    }

    movePlayer(){
        this.jugador.setVelocityX(0);

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
    }

    update(){
       this.movePlayer();
    }

}
export default BonusTrack;