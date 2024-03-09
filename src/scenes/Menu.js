class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    //load in the texture atlas as well as the sound 
    preload(){
        //load images
        this.load.image('flower', './assets/img/flower.png')
        this.load.image('player', './assets/img/groom.png')
        this.load.image('enemy', './assets/img/enemy.png')
        this.load.image('bride',  './assets/img/bride.png')
        this.load.spritesheet('arrow', './assets/img/arrow.png', {
            frameWidth: 32,
            frameHeight: 64
        })
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('ground', './assets/img/ground.png')
        this.load.audio('gunshot', './assets/audio/gunshot.wav')
        this.load.audio('jump', './assets/audio/jump.wav')
        //bitmap font from https://www.dafont.com/8-bit-1-6.font#null 
        this.load.bitmapFont('arcadeFont', './assets/font/arcadeFont.png', './assets/font/arcadeFont.xml')
    }

    //start creating the sprites and stuff 
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.bitmapText(50, 200, 'arcadeFont', 'this is the menu. Press space to start the game.', 20)
        this.anims.create({
            key: 'jumpControl',
            frames: this.anims.generateFrameNumbers('arrow', {start: 0, end: 2}),
            frameRate: 3,
            repeat: -1
        })
        //needs credits as well. 
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