class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){
        this.physics.world.setBounds(0,0, 0, 530, false, false, false, true)
        //player input 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        //sprites needed: bride, player/groom, enemy 
        this.player = new Player(this, 400, 500)
        this.bride = new Bride(this, 200, 500)
        this.enemy = new Enemy(this, 650, 495).setScale(1.2, 1.2)
        //set the world bounds for this instead of a rectangle. 
        //https://phasergames.com/how-to-jump-in-phaser-3/ 
        this.ground = this.physics.add.sprite(0, 600, 'ground')
        this.ground.setImmovable()
        this.physics.add.collider(
            this.player,
            this.ground
        )
        //switch to texture atlas soon 
        //flashing up arrow with the character to indicate moving and then remove it afterwards
        this.arrowInstructions = this.add.sprite(400, 430, 'arrow').play('jumpControl')
        this.jumpInstructions = this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.arrowInstructions.destroy()
            },
            repeat: -1
        })
        /*this.throwTimer = this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.throwFlower()
            },
            repeat: -1
        })*/
        //add in the arcade style text and whatnot to this 
        //bride needs to move the sign up and down 
    }

    update(){
        this.player.update()
        this.bullet_firing = false 
        //is there a way to set a timer and make sure that the player can't fire and just spam? 
        //destroy the arrow when the jump button is pressed 
        if(keyUP.isDown){
            this.arrowInstructions.destroy()
        }
        if(Phaser.Input.Keyboard.JustDown(keyFire)){
            this.fireBullet()
            this.sound.play('gunshot')
        }
        if(this.enemy.getLives() == 0 || this.player.getLives() == 0){
            this.scene.start('gameOverScene')
        }
    }

    //shoot out a bullet with f
    fireBullet(){
        //have the player fire with f in the update and call on this function 
        //create a bullet with the projectile class and then add a collider
        //add in a flag variable for the bullet to make sure you can't just spam the bullet 
        this.bullet = new Projectile(this, this.player.x, this.player.y, 0, 'bullet')
        this.bullet.setVelocityX(200)
        //collider for the enemy and the bullet 
        this.physics.add.collider(this.enemy, this.bullet, (enemy, bullet) =>{
            bullet.destroy()
            enemy.setLives(enemy.getLives() - 1)
        })
    }

    //for the enemy thowing the flower 
    throwFlower(){
        //make a new flower and timer for the flowers
        //collider for bride and player/groom
        //add a delay somehow? 
        this.flower = new Projectile(this, this.enemy.x, this.enemy.y, 0, 'flower').setScale(0.5)
        this.flower.setPushable(false)
        this.flower.setVelocityX(-200)  
        this.physics.add.collider(this.flower, this.bride, (flower, bride) =>{
            flower.destroy()
        })
        //collider for flower and the player 
        this.physics.add.collider(this.flower, this.player, (flower, player) =>{
            flower.destroy() 
            player.setLives(player.getLives() - 1)
            }) 
    }

    //maybe have a move character function for it? But it only needs to run once in the entire scene and it needs to be done every time the scene is called
    /*cutscene(){

    }*/ 
}