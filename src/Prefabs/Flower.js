class Flower extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scene = scene 
        //player lives = 3
        //add in the scene.existing.this() 
    }

    update(){
    }
}