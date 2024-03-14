//probably have multiple enemies with different states and skins based on this class to make it easier on me
class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'enemy00.png')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setImmovable()
        this.scene = scene 
        this.lives = 1
    }

    update(){
    }

    setLives(lives){
        if(this.lives < 0){
            this.lives = 0
        }
        else{
            this.lives = lives 
        }
    }

    getLives(){
        return this.lives 
    }

    reset(){
        this.x = 900
        this.y = 473
        this.setVelocityX(0)
    }
}