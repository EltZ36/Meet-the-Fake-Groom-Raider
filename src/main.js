let config = {
    type: Phaser.AUTO, 
    width: 800, 
    height: 640,
    backgroundColor: '#89cff0', 
    physics:{
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play, GameOver]
}
//for the arrow keys and pressing space to start the game
let game = new Phaser.Game(config)
//include the mouse click too 
let keySPACE, keyUP, keyDOWN, keyFire, keyRESET, keyMENU
//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore
let points 
let newHighScore = false