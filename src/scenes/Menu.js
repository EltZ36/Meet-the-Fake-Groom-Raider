class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    //load in the texture atlas as well as the sound 
    preload(){
        //load images
        this.load.image('flower', './assets/img/flower.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('ground', './assets/img/ground.png')
        //atlas 
        this.load.atlas('atlas', './assets/img/allAssets.png', './assets/img/allAssets.json')
        //audio 
        this.load.audio('gunshot', './assets/audio/gunshot.wav')
        this.load.audio('jump', './assets/audio/jump.wav')
        //bitmap font from https://www.dafont.com/8-bit-1-6.font#null 
        this.load.bitmapFont('arcadeFont', './assets/font/arcadeFont.png', './assets/font/arcadeFont.xml')
    }

    //start creating the sprites and stuff 
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.bitmapText(50, 200, 'arcadeFont', 'this is the menu. Press space to start the game.', 20)
        //create the arrow animation 
        this.anims.create({
            key: 'jumpControl',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'arrow0',
                suffix: '.png',
                start: 0,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'player0',
                suffix: '.png',
                start: 0,
                end: 1,
            }), 
            frameRate: 7, 
            repeat: -1 
        })
        this.anims.create({
            key: 'brideIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'bride0',
                suffix: '.png',
                frames: [2,1,0,1],
                //[2,1,0,1]
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'enemyIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'enemy0',
                suffix: '.png',
                frames: [0,1,0,1,2,3,2]
            }), 
            frameRate: 10,
            repeat: -1
        })
        //player idle
        //bride idle
        //enemy idle 
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