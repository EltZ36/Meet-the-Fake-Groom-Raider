class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.player = new Player(this, 400, 500)
        this.bride = new Bride(this, 200, 500)
        this.enemy = new Enemy(this, 650, 495).setScale(1.2, 1.2)
        /*
        //make sure that the bullet is firing based on the player's position 
        this.bullet = new Projectile(this.player.x, this.player.y, bullet)
        this.flower = new Projectile('flower') 
        */ 
        //https://phasergames.com/how-to-jump-in-phaser-3/ 
        this.ground = this.physics.add.sprite(0, 600, 'ground')
        this.ground.setImmovable()
        this.physics.add.collider(
            this.player,
            this.ground
        )
        //this.enemy.setScale(1.2, 1.2)
        //flashing up arrow with the character to indicate moving and then remove it afterwards
        //add in the arcade style text and whatnot to this 
        //add in a collider for the flowers and the bride 
        //add in collider for the flowers and you too  
        //collider for bullets to the enemy 
        //move to the next scene/level if the enemy hp gets low enough and gameover if you have 0 lives.
        //bride needs to move the sign up and down 
    }

    update(){
        this.player.update()
        if(keyFire.isDown()){
            console.log('Firing')
            //fireBullet()
        }
    }

    /*fireBullet()
        have the player fire with f in the update and call on this function 
        create a bullet with the projectile class and then add a collider? 
        this.bullet = new Projectile(this.player.x, this.player.y, 'bullet')
        this.bullet.setVelocityX(200)
        //not sure if this collider will work properly at all 
        this.physics.add.collider(this.bride, this.bullet, () =>{
            this.bullet.destroy()
            this.bride.setLives(this.bride.getLives() - 1)
        })
    */

    //maybe have a move character function for it? But it only needs to run once in the entire scene and it needs to be done every time the scene is called
    /*cutscene(){

    }*/ 
}