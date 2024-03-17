class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    create(){
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        let endScreen = this.add.image(0,0,'atlas', 'GameOver.png').setOrigin(0, 0)
        let restartButton = this.add.image(230, 550, 'atlas', 'restartButton.png')
        let menuButton = this.add.image(600, 540, 'atlas', 'menuButton.png')
        let currentscoreText = this.add.bitmapText(300, 360, 'arcadeFont', '000000000', 40)
        let highScoreText = this.add.bitmapText(400, 430, 'arcadeFont', '000000000', 40)
        //this.oninput 
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyMENU)){
            this.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.start('playScene')
        } 
    }
}