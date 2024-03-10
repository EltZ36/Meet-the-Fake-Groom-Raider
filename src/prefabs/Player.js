class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'player00.png')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        this.lives = 3 
        this.isFiring = false 
        this.setCollideWorldBounds(true)
        this.setImmovable(true)
        //this.setPushable(true)
        this.body.setGravityY(300)
    }

    update(){
        //add in jumping for the character and then a fire button too 
        //jumping is done with either space bar or up arrow with fire being f or maybe a mouse click instead to make it easier 
        //jumping based on tutorial by https://phasergames.com/how-to-jump-in-phaser-3/  
        //could swap this to += instead of velocity 
        //can change it to 480 instead
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y >= 470){
            this.body.setVelocityY(-300)
            this.scene.sound.play('jump')
        }
        //have it play the animation 
    }

    //getters and setters for the black box approach/cleaner way to access the lives 
    setLives(lives){
        this.lives = lives 
    }

    getLives(){
        return this.lives 
    }
}