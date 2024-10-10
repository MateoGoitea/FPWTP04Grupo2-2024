class Play02 extends Phaser.Scene{
//de momento se accede presionando el espacio en la escena Play
    constructor(){
        super("Play02");
        this.jugador = null;
        this.cursors = null;
        this.fireBall = null;
        this.boss = null;
        this.bossLife = 300;
    }
     init(data) {
        //this.puntaje = data.puntaje || 0; 
        this.puntaje = data.puntaje; 
    }

    preload(){
        //son la misma imagen solo que una está volteada para que el layer no se vea cortado
        this.load.image('fondoLayer01','../juego/public/resources/img/fondoLayer01.jpg');
        this.load.image('fondoLayer02','../juego/public/resources/img/fondoLayer02.jpg');

        //fireBall
        this.load.image('fireBall','../juego/public/resources/img/fireBall.png');
    
        //player y balas
        this.load.spritesheet('nave02', '../juego/public/resources/img/spritenave02.png', { frameWidth: 50, frameHeight: 46 });
        this.load.image('balaHorizontal', '../juego/public/resources/img/balaHorizontal.png ')

        this.load.image('enemigo', '../juego/public/resources/img/enemigo.png');

        this.load.spritesheet('boss', '../juego/public/resources/img/boss.png', { frameWidth: 190, frameHeight: 560 })
    }

    generarEnemigos() {
        const y = Phaser.Math.Between(0, 600);
        const enemigo = this.grupoEnemigos.create(this.sys.game.config.width, y, 'enemigo');
        enemigo.setVelocityX(-200);
    }

    eliminarEnemigo(bala,enemigo){
        bala.destroy();
        enemigo.destroy();
        this.puntaje +=10;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);

    }

    gameOver(jugador) {
        this.physics.pause();
        jugador.setTint(0xff0000);
        console.log('Game Over');
        //this.playAudio.stop();
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }

    mostrarBoss(){
        //this.textoDePuntaje = this.add.text(16, 50, 'BOSS: ' + this.bossLife, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        this.textoDeJefe = this.add.text(16, 50, 'BOSS: ' + this.bossLife, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        //el boss entra lentamente a la pantalla, seguramente hay una forma menos tosca de hacerlo pero es lo q se me ocurrio xd
        this.boss.setVelocityX(-100);
    }

    danarBoss(bala){
        bala.destroy();
        
        this.bossLife -= 1;
        this.puntaje +=1;
        
        this.textoDeJefe.setText('BOSS: ' + this.bossLife);
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
    }
    
    
    victoria() {
        
        //this.playAudio.stop();
        this.sound.stopAll();
        this.scene.start('Victoria', { puntaje: this.puntaje });

    }
			
			

    create(){
		this.bossLife=300;
        //almacenan las imagenes en una variable
        this.fondoLayer01 = this.add.image(0,300,'fondoLayer01').setOrigin(0,0.5);
        this.fondoLayer02 = this.add.image(800,300,'fondoLayer02').setOrigin(0,0.5);
        
        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });

        //creacion jugador
        this.jugador = this.physics.add.sprite(10, 300, 'nave02', 1);
        this.jugador.setCollideWorldBounds(true);

        //creacion de los inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        //creacion enemigos
        this.grupoEnemigos = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarEnemigos, callbackScope: this, loop: true });

        //control colision
        this.physics.add.collider(this.jugador, this.grupoEnemigos, this.gameOver, null, this);

        //animacion del jugador
        this.anims.create({
            key: 'down',
            frames: [{ key: 'nave02', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'default',
            frames: [{ key: 'nave02', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'nave02', frame: 0 }],
            frameRate: 20
        });


        //boss
        this.boss = this.physics.add.sprite(900, 300, 'boss', 0);
        this.boss.setCollideWorldBounds(true);
    
            //animacion
        this.anims.create({
            key: 'defaultBoss',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.boss.anims.play('defaultBoss', true);

        //el delay se cambiara a 3000 para q el boss aparezca 30 seg despues de entrar al nivel, esta en 500 para testear
        this.time.addEvent({ delay: 500, callback: this.mostrarBoss, callbackScope: this, loop: false });
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

        //controles del jugador
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play('default', true);

        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300);
        } 
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);
        }
        else if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300);
            this.jugador.anims.play('down', true);
        }
        else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300);
            this.jugador.anims.play('up', true);
        }
        
        if(this.cursors.z.isDown){
            this.bala = this.physics.add.image(this.jugador.x + 20, this.jugador.y, 'balaHorizontal');
            this.bala.setVelocityX(600);

            //this.physics.add.collider(this.bala, this.grupoMeteoros, this.destruirMeteoro, null, this);

            this.physics.add.collider(this.bala, this.boss, this.danarBoss, null, this);

            //balas y enemigos
            this.physics.add.collider( this.bala ,this.grupoEnemigos, this.eliminarEnemigo, null, this);
            

            //destruye la bala cuando sale de la pantalla para que no ocupe memoria
            if(this.bala.y >= this.sys.game.config.width){
                this.bala.destroy();
            }
        }
        
        //boss
            // control de posicion x del boss para q se quede quieto al entrar a escena
        if (this.boss.x <= 700){
            this.boss.setVelocityX(0);
        }
        
        
        
        if (this.bossLife== 0){
			
		console.log('Gano');
		this.victoria();
		}

        
    }
}  
export default Play02;
