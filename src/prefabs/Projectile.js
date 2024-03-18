class Projectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        this.hitStatus = false 
        this.fireStatus = false
        //this.setImmovable(true)
        //player lives = 3
        //add in the scene.existing.this() 
    }

    getHitStatus(){
        return this.hitStatus 
    }

    setHitStatus(currentHitStatus){
        this.hitStatus = currentHitStatus
    }

    getFireStatus(){
        return this.fireStatus
    }

    setFireStatus(currentFireStatus){
        return this.fireStatus = currentFireStatus
    }
    
}