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
        //move the player and the bride back as well as adding in tweens 
        this.player = new Player(this, 360, 500).setScale(1.2).setSize(30)
        this.bride = new Bride(this, 180, 458).setScale(1.5)
        this.enemy = new Enemy(this, 900, 473).setScale(1.5)
        this.present = this.physics.add.sprite(710, 492, 'atlas', 'present01.png').setVisible(false).setImmovable(true)
        this.bullet = new Projectile(this, this.player.x + 43, this.player.y-20, 'bullet').setScale(0.5).setVisible(false)
        this.currentScore = 0
        //switch to texture atlas soon 
        //flashing up arrow with the character to indicate moving and then remove it afterwards
        this.livesText = this.add.bitmapText(630, 100, 'arcadeFont', `X${this.player.getLives()}`, 50)
        this.topTitle = this.add.image(400,28, 'atlas', 'topTitle.png').setOrigin(0.5).setScale(0.8)
        //title, high score, and curent score text 
        this.titleText = this.add.bitmapText(80, 90, 'redArcadeFont', 'GROOM RAIDER', 20)
        this.highScoreText = this.add.bitmapText(350, 90, 'arcadeFont', 'HIGHSCORE', 20)
        this.currentScoreText = this.add.bitmapText(100, 120, 'arcadeFont', '000000000', 20)
        this.highScoreNumber = this.add.bitmapText(350, 120, 'arcadeFont', '000000000', 20)
        this.lifeIcon = this.add.image(595, 110, 'atlas', 'livesFace.png').setScale(3)
        this.arrowInstructions = this.add.sprite(355, 400, 'atlas', 'arrow00.png').play('jumpControl')
        this.jumpInstructions = this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.arrowInstructions.destroy()
            },
            repeat: -1
        })
        this.player.anims.play('playerIdle')
        this.bride.anims.play('brideIdle')
        //from https://labs.phaser.io/edit.html?src=src/input\pointer\down%20event.js
        this.input.on('pointerdown', function (pointer)
        {
            this.fireBullet()
            this.sound.play('gunshot')
        }, this); 
        this.settings = {
            targets: this.enemy,
            loop: 0,
            tweens: [
                {
                    x: this.enemy.x - 190,
                    duration: 200,
                    ease: 'Linear'
                }
            ]
        }
        let enemystartTween = this.tweens.chain(this.settings)
        //add in the arcade style text and whatnot to https://www.dafont.com/8-bit-1-6.font#nullhttps://www.dafont.com/8-bit-1-6.font#nullthis 
        //set the world bounds for this instead of a rectangle. 
        //https://phasergames.com/how-to-jump-in-phaser-3/ 
        this.ground = this.physics.add.sprite(0, 600, 'atlas', 'ground.png')
        this.ground.setImmovable()
        this.physics.add.collider(
            this.player,
            this.ground
        )
        this.physics.add.collider(
            this.player, 
            this.present, 
            this.reset,
            null,
            this
        )
        this.physics.add.collider(this.enemy, this.bullet, this.bulletReset, null, this)
        this.enemyPaused = false 
        this.enemyDead = false 
        //https://labs.phaser.io/edit.html?src=src\animation\on%20complete%20event.js
        this.enemy.anims.play('enemyDressIdle')
        this.speedIncreased = false 
        this.projectileSpeed = -300
        this.maxLives = 10
        this.currentLives = 3
        this.enemy.on('animationrepeat', function () {
            this.throwProjectile()
        }, this);
    }

    update(){
        this.player.update()
        this.enemy.update()
        //this.livesText = this.add.bitmapText(630, 100, 'arcadeFont', `X${this.player.getLives()}`, 50)
        //is there a way to set a timer and make sure that the player can't fire and just spam? 
        //destroy the arrow when the jump button is pressed 
        if(keyUP.isDown){
            this.arrowInstructions.destroy()
        }
        //add a delay to the fire and making sure that the bullet can't be fired while traveling. To boost this, increase the velocity or timings of the bullets. 
        //make the enemy invincible for around 6 seconds after resetting
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && this.bullet.getFireStatus() == false){
            this.fireBullet()
            this.currentScoreText.setText(this.addLeadingZeros(this.currentScore += 50))
            this.sound.play('gunshot')
        }
        if(this.enemy.getLives() == 0 && this.enemyPaused == false){
            this.enemyPaused = true
            this.enemy.setVisible(false)
            this.enemy.anims.pause()
            this.present.setVisible(true)
            this.present.setVelocityX(-130)
            this.currentScoreText.setText(this.addLeadingZeros(this.currentScore += 500))
            console.log(this.currentScore)
        }
        if(this.player.getLives() == 0){
            this.scene.start('gameOverScene')
        }
        if(this.bullet.x > 800){
            this.bullet.x = this.player.x + 43
            this.bullet.y = this.player.y - 20
            this.bullet.setVelocityX(0)
            this.bullet.setVisible(false)
            this.bullet.setFireStatus(false)
        }
        //this.levelsIncrease(this.projectileSpeed)
        if(this.enemy.getDeathNumber() != 0 && this.enemy.getDeathNumber() % 1 == 0 && this.speedIncreased == false){
            this.speedIncreased = true 
            if(this.projectileSpeed >= -850 && this.enemy.getLives() == 10){
                this.projectileSpeed = -850
                this.enemy.setLives(this.maxLives)
            }
            else{
                this.currentLives = this.currentLives + 1
                this.projectileSpeed = this.projectileSpeed - 50
            }
        }
    }

    //shoot out a bullet with f
    fireBullet(){
        //have the player fire with f in the update and call on this function 
        //create a bullet with the projectile class and then add a collider
        //add in a flag variable for the bullet to make sure you can't just spam the bullet 
        this.bullet.setVelocityX(500)
        //collider for the enemy and the bullet 
        this.bullet.x = this.player.x + 43
        this.bullet.y = this.player.y - 20 
        this.bullet.setVisible(true)
        this.bullet.setFireStatus(true)
    }

    //reset the bullet upon hitting the enemy
    bulletReset(enemy, bullet){
        //make it not visible and reset it back to original position 
        bullet.setVisible(false)
        bullet.x = this.player.x + 43
        bullet.y = this.player.y - 20
        bullet.setVelocityX(0)
        bullet.setFireStatus(false)
        //add a little score for that 
        this.turnPurple(enemy)
        if(enemy.invincible == false){
            enemy.setLives(enemy.getLives() - 1)
        }
    }

    //for the enemy thowing the flower 
    throwProjectile(){
        //different skins have different velocities and two more will unlock if the enemy has already been shot
        if(this.enemy.getSkinNumber() == 2 && this.enemy.getDeathNumber() >= 1){
            this.projectile = new Projectile(this, this.enemy.x, this.enemy.y, 'wine').setScale(1.5)
        }
        else if(this.enemy.getSkinNumber() == 3 && this.enemy.getDeathNumber() >= 1){
            this.projectile = new Projectile(this, this.enemy.x, this.enemy.y, 'cane').setScale(1.5) 
        }
        else{
            this.projectile = new Projectile(this, this.enemy.x, this.enemy.y, 'flower').setScale(1.5)
        }
        this.projectile.setPushable(false)
        this.projectile.setVelocityX(this.projectileSpeed)  
        console.log(this.projectileSpeed)
        this.physics.add.collider(this.projectile, this.bride, (projectile, bride) =>{
            projectile.destroy()
            this.turnPurple(bride)
        })
        //collider for flower and the player 
        this.physics.add.collider(this.projectile, this.player, this.projectileCollision, null, this)  
    }

    //add leading zeros to the score with a simple string conversion
    addLeadingZeros(number){
        let length_difference = 9 - number.toString().length  
        let concat_string = '0'.repeat(length_difference) + number.toString()   
        return concat_string
    }

    projectileCollision(projectile, player){
        projectile.destroy()
        //don't decrement the lives of the flower afterwards 
        if(this.enemy.getLives() != 0){
            player.setLives(this.player.getLives() - 1)
            this.livesText.setText(`X${this.player.getLives()}`)
            this.turnPurple(player)
        }
    }

    //turn the character in this scene purple and then back to white
    turnPurple(character){
        character.setTint(0xA020F0)
            this.time.addEvent({
                delay: 800,
                callback: () => {
                    character.setTint(0xFFFFFF)
                },
                repeat: 0
            })
    }

    //enemy reset 
    reset(player, present){
        if(this.enemy.getSkinNumber() == 2){
            this.gift = this.add.image(400, 310, 'atlas', 'plateAndCloth.png').setScale(2.5)
            this.giftTopText = this.add.bitmapText(210, 190, 'arcadeFont', 'PLATE AND CLOTH', 30)
            this.giftBotText = this.add.bitmapText(130, 230, 'arcadeFont', 'THIS IS TRULY FINE CHINA!', 30)
        }
        else if(this.enemy.getSkinNumber() == 3){
            this.gift = this.add.image(400, 320, 'atlas', 'beltAndGlass.png').setScale(2.5)
            this.giftTopText = this.add.bitmapText(130, 180, 'arcadeFont', 'VINTAGE BELT AND GLASS', 30)
            this.giftBotText = this.add.bitmapText(130, 230, 'arcadeFont', 'THEY DON\'T MAKE EM BEFORE!', 30)
        }
        else{
            this.gift = this.add.image(400, 310, 'atlas', 'knifeSet.png').setScale(2.5)
            //knife text 
            this.giftTopText = this.add.bitmapText(230, 190, 'arcadeFont', 'STEAK KNIFE SET', 30)
            this.giftBotText = this.add.bitmapText(230, 230, 'arcadeFont', 'WITH GIFT RECIPT!', 30)
        }
        this.gift.setVisible(true)
        this.giftTopText.setVisible(true)
        this.giftBotText.setVisible(true)
        this.present.setVisible(false)
        this.present.setVelocityX(0)
        this.present.x = 710
        this.present.y = 492
        this.enemy.reset()
        this.enemy.setLives(this.currentLives)
        this.removeGiftTimer = this.time.addEvent({
            delay: 4000, 
            callback: () => {
                this.gift.setVisible(false)
                this.giftTopText.setVisible(false)
                this.giftBotText.setVisible(false)
                this.enemyPaused = false 
                this.enemy.setVisible(true)
                this.speedIncreased = false 
                //find a way to restart the tween and make it more clean 
                let enemystartTween = this.tweens.chain(this.settings)
            }
        })
        //this.enemy.anims.resume()
    }
}