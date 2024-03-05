class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this)
        this.scene = scene 
        //player lives = 3
        //add in the scene.existing.this() 
    }

    update(){
        //add in jumping for the character and then a fire button too 
        //jumping is done with either space bar or up arrow with fire being f or maybe a mouse click instead to make it easier 
    }

    //checklives() <- check the lives of the player and return it 
}