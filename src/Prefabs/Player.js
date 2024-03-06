class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        //player lives = 3
        //add in the scene.existing.this() 
        this.isJumping = false 
    }

    update(){
        //add in jumping for the character and then a fire button too 
        //jumping is done with either space bar or up arrow with fire being f or maybe a mouse click instead to make it easier 
        //jumping based on tutorial by https://phasergames.com/how-to-jump-in-phaser-3/  
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.isJumping == false){
            this.body.setVelocityY(-500)
            this.body.setGravityY(10)
            this.isJumping = true 
            this.timer = this.scene.time.addEvent({
                delay: 500, 
                callback: () => {
                    this.body.setVelocityY(600)
                    this.isJumping = false
                },
                callbackScope: this,
                loop: false
            });
        }
        /*if(Phaser.Input.Keyboard.JustDown(keyUP) != true && this.isJumping == true){
            this.body.setVelocityY(300)
            this.isJumping = false 
        }*/
    }

    //checklives() <- check the lives of the player and return it 
}