class Play extends Phaser.Scene{
    constructor(){
        super("Play");
        this.jugador=null;
        this.cursors=null;
        this.puntaje=0;
        this.textoDePuntaje=0;
    }

    preload(){
        this.load.image('cielo', '../public/resources/img/cielo.jpg');
        this.load.image('nave', '../public/resources/img/naveespacial.png');
        this.load.image('meteoro', '../public/resources/img/meteoro.png');
    }

    create(){
        this.add.image(400,300,'cielo');
        this.jugador = this.physics.add.sprite(400,550, 'nave');
        this.jugador.setCollideWorldBounds(true);

        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({delay:1000, callback:this.generarMeteoros, callbackScope:this, loop:true});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);


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
            
    update(){
        this.jugador.setVelocityX(0);
        if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(300);
        }
    }
}
export default Play;