class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){
        this.physics.world.setBounds(0,0, 0, 530, false, false, false, true)
        //player input 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        mouseFIRE = this.input.activePointer
        //sprites needed: bride, player/groom, enemy
        //set the scale of these to be larger later down the line
        this.player = new Player(this, 400, 500).setScale(1.2)
        this.bride = new Bride(this, 200, 458).setScale(1.5)
        this.enemy = new Enemy(this, 670, 473).setScale(1.5)
        //set the world bounds for this instead of a rectangle. 
        //https://phasergames.com/how-to-jump-in-phaser-3/ 
        this.ground = this.physics.add.sprite(0, 600, 'atlas', 'ground.png')
        this.ground.setImmovable()
        this.physics.add.collider(
            this.player,
            this.ground
        )
        //switch to texture atlas soon 
        //flashing up arrow with the character to indicate moving and then remove it afterwards
        this.topTitle= this.add.image(400,28, 'atlas', 'topTitle.png').setOrigin(0.5).setScale(0.8)
        this.titleText = this.add.bitmapText(80, 90, 'arcadeFont', 'GROOM RAIDER', 20)
        this.titleText.setTint(0xffff00)
        this.highScoreText = this.add.bitmapText(350, 90, 'arcadeFont', 'HIGHSCORE', 20)
        this.currentScoreText = this.add.bitmapText(100, 120, 'arcadeFont', '000000000', 20)
        this.highScoreNumber = this.add.bitmapText(350, 120, 'arcadeFont', '000000000', 20)
        this.lifeIcon = this.add.image(595, 110, 'atlas', 'livesFace.png').setScale(3)
        this.livesText = this.add.bitmapText(630, 100, 'arcadeFont', 'X3', 50)
        this.arrowInstructions = this.add.sprite(390, 390, 'atlas', 'arrow00.png').play('jumpControl')
        this.jumpInstructions = this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.arrowInstructions.destroy()
            },
            repeat: -1
        })
        //grader mode for this as I plan to make this much faster 
        this.throwTimer = this.time.addEvent({
            delay: 2800,
            callback: () => {
                this.throwFlower()
            },
            repeat: -1
        })
        this.player.anims.play('playerIdle')
        this.bride.anims.play('brideIdle')
        this.enemy.anims.play('enemyIdle')
        //from https://labs.phaser.io/edit.html?src=src/input\pointer\down%20event.js
        this.input.on('pointerdown', function (pointer)
        {
            this.fireBullet()
            this.sound.play('gunshot')
        }, this); 
        //add in the arcade style text and whatnot to https://www.dafont.com/8-bit-1-6.font#nullhttps://www.dafont.com/8-bit-1-6.font#nullthis 
    }

    update(){
        this.player.update()
        this.bullet_firing = false 
        //is there a way to set a timer and make sure that the player can't fire and just spam? 
        //destroy the arrow when the jump button is pressed 
        if(keyUP.isDown){
            this.arrowInstructions.destroy()
        }
        if(Phaser.Input.Keyboard.JustDown(keyFIRE)){
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
        this.bullet = new Projectile(this, this.player.x + 43, this.player.y-20, 'bullet').setScale(0.5)
        //this.bullet = new Projectile(this, this.player.x, this.player.y, 'bullet')
        this.bullet.setVelocityX(300)
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
        //this.flower = new Projectile(this, this.enemy.x, this.enemy.y, 0, 'atlas', 'flower.png')
        //this.flower = new Projectile(this, 400, 400, 'atlas', 'flower.png')
        this.flower = new Projectile(this, this.enemy.x, this.enemy.y, 'flower').setScale(1.5)
        this.flower.setPushable(false)
        this.flower.setVelocityX(-300)  
        this.physics.add.collider(this.flower, this.bride, (flower, bride) =>{
            flower.destroy()
            bride.setTint(0xA020F0)
            this.time.addEvent({
                delay: 800,
                callback: () => {
                    bride.setTint(0xFFFFFF)
                },
                repeat: 0
            })
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