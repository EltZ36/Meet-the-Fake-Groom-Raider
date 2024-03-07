class Bride extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bride')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        this.setImmovable() 
        //player lives = 3
        //add in the scene.existing.this() 
    }

    update(){
    }
}