class Play02 extends Phaser.Scene{
//de momento se accede presionando el espacio en la escena Play
    constructor(){
        super("Play02");
        this.player = null;
        this.cursors = null;
        this.fireBall = null;
    }

    preload(){
        //son la misma imagen solo que una está volteada para que el layer no se vea cortado
        this.load.image('fondoLayer01','../juego/public/resources/img/fondoLayer01.jpg');
        this.load.image('fondoLayer02','../juego/public/resources/img/fondoLayer02.jpg');

        //player
        this.load.image('player','../juego/public/resources/img/naveHorizontal.png');

        //fireBall
        this.load.image('fireBall','../juego/public/resources/img/fireBall.png');
    }

    create(){
        //almacenan las imagenes en una variable
        this.fondoLayer01 = this.add.image(0,300,'fondoLayer01').setOrigin(0,0.5);
        this.fondoLayer02 = this.add.image(800,300,'fondoLayer02').setOrigin(0,0.5);

        //crea al player
        this.player = this.physics.add.sprite(400, 550, 'player');
        this.player.setCollideWorldBounds(true);

        //fireBall
        this.fireBall = this.physics.add.sprite(400,500, 'fireBall');
        
        //inputs
        this.cursors = this.input.keyboard.createCursorKeys();

    }



    update(){
        //mueve las imagenes hace la izquierda
        this.fondoLayer01.x -= 2;
        this.fondoLayer02.x -= 2;

        //reposiciona las imagenes si salen de la pantalla
        if(this.fondoLayer01.x <= -780){
            this.fondoLayer01.x = this.fondoLayer02.x + this.fondoLayer02.width ;
        }
        if(this.fondoLayer02.x <= -780){
            this.fondoLayer02.x = this.fondoLayer01.x + this.fondoLayer01.width ;
        }


        //movimiento del player
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
        }
    }
}  
export default Play02;