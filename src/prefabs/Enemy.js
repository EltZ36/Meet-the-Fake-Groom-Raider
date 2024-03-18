//probably have multiple enemies with different states and skins based on this class to make it easier on me
class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'enemy00.png')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setImmovable()
        this.scene = scene 
        this.lives = 1
        this.deathNumber = 0
        this.skinNumber = 1
    }

    update(){
    }

    getLives(){
        return this.lives 
    }

    getDeathNumber(){
        return this.deathNumber
    }

    getSkinNumber(){
        return this.skinNumber
    }

    setDeathNumber(number){
        this.deathNumber = number
    }

    setSkinNumber(number){
        this.skinNumber = number
        if(this.skinNumber == 1){
            this.setTexture('atlas', 'enemy00.png')
        }
        else if(this.skinNumber == 2){
            this.setTexture('atlas', 'butler00.png')
        }
    }

    setLives(lives){
        if(this.lives < 0){
            this.lives = 0
        }
        else{
            this.lives = lives 
        }
    }

    reset(){
        this.setLives(1)
        this.setVelocityX(0)
        this.x = 900
        this.y = 473
        this.setTexture('atlas', 'enemy00.png')
        //this.setDeathNumber(this.getDeathNumber + 1)
        //this.skinNumber = Phaser.Math.Between(1, 3)
        this.animationTimer = this.scene.time.addEvent({
            delay: 4000, 
            callback: () => {
            this.anims.resume()
            }
        })
    }
}