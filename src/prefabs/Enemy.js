//probably have multiple enemies with different states and skins based on this class to make it easier on me
class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'enemy01.png')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setImmovable()
        this.scene = scene 
        this.lives = 10
    }

    update(){
    }

    setLives(lives){
        this.lives = lives 
    }

    getLives(){
        return this.lives 
    }
}