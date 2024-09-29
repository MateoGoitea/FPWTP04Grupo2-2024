class Menu extends Phaser.Scene{
    constructor(){
        super ("Menu");
    }

    preload(){
        this.load.image('menu', '../juego/public/resources/img/menu.png');
    }

    create(){
        this.add.image(400,300,'menu');

        this.add.text(300,150,'SPACE GAME', {fontFamily: 'impact' ,fontSize:'100px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('Play');
        })
    }
}
export default Menu;