//probably have multiple enemies with different states and skins based on this class to make it easier on me
class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'enemy00.png')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setImmovable()
        this.scene = scene 
        this.lives = 3
        this.deathNumber = 0
        this.skinNumber = 1
        this.invincible = false 
    }

    update(){
        //set it to yellow if invincible and then remove it after it isn't 
        if(this.invincible == true){
            this.setTint(0xFFFF00)
            this.scene.time.addEvent({
                delay: 6000,
                callback: () => {
                    this.setTint(0xFFFFFF)
                },
                repeat: 0
            })
        }
    }

    //getters and setters for the skin and death number which are level increases basically
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
        //set it to the correct skin and play the right animation for the skins 
        this.skinNumber = number
        if(this.skinNumber == 1){
            this.setTexture('atlas', 'enemy00.png')
            this.animationTimer = this.scene.time.addEvent({
                delay: 4000, 
                callback: () => {
                    this.anims.play('enemyDressIdle')
                }
            })
        }
        else if(this.skinNumber == 2){
            this.setTexture('atlas', 'butler00.png')
            this.animationTimer = this.scene.time.addEvent({
                delay: 4000, 
                callback: () => {
                    this.anims.play('butlerIdle')
                }
            })
        }
        else if(this.skinNumber == 3){
            this.setTexture('atlas', 'oldMan00.png')
            this.animationTimer = this.scene.time.addEvent({
                delay: 4000, 
                callback: () => {
                    this.anims.play('oldManIdle')
                }
            })
        }
    }

    setLives(lives){
        //make sure we don't get negative lives 
        if(this.lives < 0){
            this.lives = 0
        }
        else{
            this.lives = lives 
        }
    }

    //reset all the enemy stats and get the random skin after it dies 
    reset(){
        this.setVelocityX(0)
        this.setVisible(true)
        this.x = 900
        this.y = 473
        this.setDeathNumber(this.getDeathNumber() + 1)
        var random = Phaser.Math.Between(1, 3)
        this.setSkinNumber(random)
        this.invincible = true 
        this.invincibleTimer = this.scene.time.addEvent({
            delay: 6000, 
            callback: () => {
                this.invincible = false 
            }
        })
    }
}