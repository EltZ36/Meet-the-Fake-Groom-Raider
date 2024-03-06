class Projectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, velocity, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        this.hitStatus = false 
        this.fireStatus = false
        //player lives = 3
        //add in the scene.existing.this() 
    }

    checkHitStatus(){
        return this.hitStatus 
    }

    setHitStatus(currentHitStatus){
        this.hitStatus = currentHitStatus
    }

    checkFireStatus(){
        return this.fireStatus
    }

    getFireStatus(currentFireStatus){
        return this.fireStatus = currentFireStatus
    }
    
}