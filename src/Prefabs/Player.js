class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        //this.setImmovable(true)
        this.scene = scene 
        this.lives = 3
        //player lives = 3
        //add in the scene.existing.this() 
        this.isJumping = false 
        this.isFiring = false 
        this.setPushable(false)
        this.body.setGravityY(300)
    }

    update(){
        //add in jumping for the character and then a fire button too 
        //jumping is done with either space bar or up arrow with fire being f or maybe a mouse click instead to make it easier 
        //jumping based on tutorial by https://phasergames.com/how-to-jump-in-phaser-3/  
        //could swap this to += instead of velocity 
        if(this.y >= 499){
            this.isJumping = false
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.isJumping == false){
            this.body.setVelocityY(-300)
            //this.body.setGravityY(10)
            this.isJumping = true 
            this.scene.sound.play('jump')
        }
    }

    //getters and setters for the black box approach/cleaner way to access the lives 
    setLives(lives){
        this.lives = lives 
    }

    getLives(){
        return this.lives 
    }
}