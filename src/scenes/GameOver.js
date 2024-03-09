class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    create(){
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.add.bitmapText(200, 200, 'arcadeFont', 'Press M or R to restart',10)
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