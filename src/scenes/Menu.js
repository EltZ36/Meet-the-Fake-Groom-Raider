class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    //load in the texture atlas as well as the sound 
    preload(){
        this.load.image('flower', './assets/img/flower.png')
        this.load.image('player', './assets/img/groom.png')
        this.load.image('enemy', './assets/img/enemy.png')
        this.load.image('bride',  './assets/img/bride.png')
        this.load.image('arrow', './assets/img/arrow.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('ground', './assets/img/ground.png')
    }

    //start creating the sprites and stuff 
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.text(50, 50, 'this is the menu')
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('playScene')
        }
    }

    //if you got hit, reduce the number of lives you have and this goes for both the enemy and the player to make it easier on me
    gotHit(){

    }
}