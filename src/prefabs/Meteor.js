class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 24, Phaser.Math.Between(32, game.config.height - 32), texture); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();                    
        this.tint = 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            this.newBarrier = false;
            // call parent scene method from this context
            this.scene.addMeteor(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}