class BonusTrack extends Phaser.Scene {

    constructor() {
        super('BonusTrack');
        this.jugador = null;
        this.cursors = null;
        this.grupoMonedas = null; 
        this.puntaje = 0; 
        this.textoDePuntaje = null;
        this.timer = null;
    }

    init(data) {
        this.puntaje = data.puntaje || 0; 
    }

    preload() {
        this.load.image('espacio', '../juego/public/resources/img/espacio.jpg');
        this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', { frameWidth: 50, frameHeight: 46 });
        this.load.spritesheet('moneda', '../juego/public/resources/img/monedas.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('bonusAudio', '../juego/public/resources/audio/bonus.mp3');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    generarMonedas() {
        const x = Phaser.Math.Between(0, 800); 
        const moneda = this.grupoMonedas.create(x, 0, 'moneda');
        moneda.setVelocityY(200);
        moneda.play('girar');
        moneda.setScale(0.7);
    }

    animacionPlayer() {
        this.anims.create({
            key: 'izquierda',
            frames: [{ key: 'nave', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'nave', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'derecha',
            frames: [{ key: 'nave', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'girar',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }

    create() {
        this.add.image(400, 300, 'espacio').setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.bonusAudio = this.sound.add('bonusAudio');
        const soundConfig = { volume: 1, loop: true };
        this.bonusAudio.play(soundConfig);

        this.jugador = this.physics.add.sprite(400, 550, 'nave', 1);
        this.jugador.setCollideWorldBounds(true);
        
        this.animacionPlayer();

        this.grupoMonedas = this.physics.add.group();
        this.time.addEvent({ delay: 500, callback: this.generarMonedas, callbackScope: this, loop: true });

        this.physics.add.collider(this.jugador, this.grupoMonedas, this.collectCoin, null, this);

        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });

     
        this.time.delayedCall(10000, this.endBonusTrack, [], this);

    }

    collectCoin(jugador, moneda) {
        moneda.destroy();
        this.puntaje += 500; 
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
    }

    endBonusTrack() {
        this.bonusAudio.stop();
        
        this.scene.start('Play', { puntaje: this.puntaje });
    }

    update() {
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play('normal', true);

        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300);
            this.jugador.anims.play('izquierda', true);
        } 
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);
            this.jugador.anims.play('derecha', true);
        }
        else if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300);
        }

        
    }
}

export default BonusTrack;
