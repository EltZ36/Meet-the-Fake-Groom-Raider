class Bride extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        
        //animation order: 12121213 <- order 10fps and set the tint to 0xA020F0 with collision 
        super(scene, x, y, 'atlas', 'bride00.png')
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