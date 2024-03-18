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
        //code snippet from paddle parkour 
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(points > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', points.toString());
                highScore = points;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } 
        else {
            //console.log('No high score stored. Creating new.');
            highScore = points;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }
        let currentScoreText = this.add.bitmapText(300, 360, 'arcadeFont', `${points}`, 38)
        let highScoreText = this.add.bitmapText(400, 430, 'arcadeFont', `${highScore}`, 38)
        //this.oninput 
        menuButton.setInteractive().on('pointerdown', () =>{
            this.scene.start('menuScene')
        })
        restartButton.setInteractive().on('pointerdown', () =>{
            this.scene.start('playScene')
        })
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