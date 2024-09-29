class BonusTrack extends Phaser.Scene{

    constructor(){
        super('BonusTrack');
        this.jugador=null;
        this.cursors=null;
    }

    preload(){
        this.load.image('espacio', '../juego/public/resources/img/espacio.jpg');
        this.load.image('nave', '../juego/public/resources/img/naveespacial.png');

        this.cursors = this.input.keyboard.createCursorKeys();
      
    }

    create(){
        //ajusta la imagen al tamaño determinado en la variable config del index.js
        this.add.image(400,300,'espacio').setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);
        
        this.jugador = this.physics.add.sprite(400,550, 'nave');
        this.jugador.setCollideWorldBounds(true);
    }

    gameOver(jugador) {
        this.physics.pause(); // Pausar el juego
        jugador.setTint(0xff0000); // Cambiar color para indicar el choque
        console.log('Game Over');  
    }

    movePlayer(){
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

    update(){
       this.movePlayer();
    }
    
}
export default BonusTrack;