class Menu extends Phaser.Scene{
    constructor(){
        super ("Menu");
    }

    preload(){
        this.load.image('menu', '../juego/public/resources/img/menu.png');
    }

    create(){
        this.add.image(400,300,'menu');

        this.add.text(330,150,'SPACE GAME', {fontFamily: 'impact' ,fontSize:'100px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(50,550,'Usa los cursores del teclado para esquivar los meteoros y encuentra el nivel extra', {fontFamily: 'impact', fontSize: '18px', fill: '#fff'});

        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('Play');
        })
    }
}
export default Menu;
