class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    //load in the texture atlas as well as the sound 
    preload(){
        //load images
        this.load.image('flower', './assets/img/flower.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('cane', './assets/img/cane.png')
        //atlas 
        this.load.atlas('atlas', './assets/img/allAssets.png', './assets/img/allAssets.json')
        //audio 
        this.load.audio('gunshot', './assets/audio/gunshot.wav')
        this.load.audio('jump', './assets/audio/jump.wav')
        //bitmap font from https://www.dafont.com/8-bit-1-6.font#null 
        this.load.bitmapFont('arcadeFont', './assets/font/arcadeFont.png', './assets/font/arcadeFont.xml')
        this.load.bitmapFont('redArcadeFont', './assets/font/redArcadeFont.png', './assets/font/redArcadeFont.xml')
    }

    //start creating the sprites and stuff 
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        //add in the menu image
        let titleScreen = this.add.image(-50,-20, 'atlas', 'titleScreen.png').setOrigin(0,0)
        let controlsScreen = this.add.image(0, 0, 'atlas', 'controlsScreen.png').setOrigin(0,0).setVisible(false)
        let creditsScreen = this.add.image(0,0, 'atlas', 'creditsScreen.png').setOrigin(0,0).setVisible(false)
        //add in the button over the image and make it interactive
        let controlsButton = this.add.image(100, 575, 'atlas', 'controlsButton.png').setScale(0.9)
        let creditsButton = this.add.image(700, 570, 'atlas', 'creditButton.png').setScale(0.9)
        //change the color and make the square more rough 
        let controlsBackButton = this.add.image(693, 578, 'atlas', 'backButton.png').setVisible(false)
        let creditsBackButton = this.add.image(726, 577, 'atlas', 'backButton.png').setVisible(false)
        controlsButton.setInteractive().on('pointerdown', () =>{
            controlsButton.setVisible(false)
            creditsButton.setVisible(false)
            controlsBackButton.setVisible(true)
            //make credits button and control button uninteractable 
            controlsScreen.setVisible(true)
            titleScreen.setVisible(false)
        })
        creditsButton.setInteractive().on('pointerdown', () => {
            controlsButton.setVisible(false)
            creditsButton.setVisible(false)
            creditsBackButton.setVisible(true)
            //make credits button and control button uninteractable 
            creditsScreen.setVisible(true)
            titleScreen.setVisible(false)
        })
        controlsBackButton.setInteractive().on('pointerdown', () => {
            controlsButton.setVisible(true)
            creditsButton.setVisible(true)
            creditsBackButton.setVisible(false)
            controlsScreen.setVisible(false)
            //make the credits and control button uninteractable 
            titleScreen.setVisible(true)
            controlsBackButton.setVisible(false)
        })
     creditsBackButton.setInteractive().on('pointerdown', () => {
            controlsButton.setVisible(true)
            creditsButton.setVisible(true)
            controlsBackButton.setVisible(false)
            creditsScreen.setVisible(false)
            //make the credits and control button uninteractable 
            titleScreen.setVisible(true)
            creditsBackButton.setVisible(false)
        })
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
        //idle animations 
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
            key: 'enemyDressIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'enemy0',
                suffix: '.png',
                frames: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,3,0,1]
            }), 
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'butlerIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'butler0',
                suffix: '.png',
                frames: [0,1,0,1,0,1,2,3,0,1]
            }),
            frameRate: 8,
            repeat: -1
        })
        /*this.anims.create({
            key: 'oldManIdle',
            frames: this.anims.generateFrameNames('atlas', {
                prefix: 'oldMan0',
                suffix: '.png',
                frames: [0,1,9,1,9,1,2,3,0,1]
            }),
            frameRate: 8,
            repeat: -1
        })*/
        //needs credits as well. 
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('playScene')
        }
    }
}