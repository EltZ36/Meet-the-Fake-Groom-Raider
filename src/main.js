/*name: Elton Zeng
game from: 120Z mouse groom raider clip link: https://www.youtube.com/watch?v=qwDvvJmP2g0 
for the game, I did not include any audio or background music given that it is difficult to discern what is what. I decided to just use my own sounds and see if it fit correctly. 
Components: physics system (collison), bitmap text/text objects, animation managers, texture atlas, tweens, timers, user input (mouse and keyboard)

Code I borrowed from:
Paddle Parkour for the score system in lines 13 - 32 and are on lines 9 - 33 on paddle parkour of gameOver.js 
For the pointerdown events, I used the example on phaser 3: https://labs.phaser.io/edit.html?src=src/input\pointer\down%20event.js 
For the animation complete/repeat on lines 107 - 109, I used https://labs.phaser.io/edit.html?src=src\animation\on%20complete%20event.js as a reference
For the debug settings in Play.js in lines 10 - 11, 172 - 180, I got from https://phaser.discourse.group/t/turn-on-off-debug-at-runtime/3681/2 from StinofSin on September 2021
*/ 
let config = {
    type: Phaser.WEBGL,  
    width: 800, 
    height: 640,
    backgroundColor: '#89cff0', 
    render:{
        pixelArt: true 
    }, 
    physics:{
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play, GameOver],
    multiTexture: true,
}
//for the arrow keys and pressing space to start the game
let game = new Phaser.Game(config)
//include the mouse click too 
let keySPACE, keyUP, keyDOWN, keyFIRE, keyRESET, keyMENU, mouseFIRE
//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore
let points 
let newHighScore = false