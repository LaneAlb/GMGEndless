class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY - textSpacer, 'gem', 'GMG RUNNER', 64).setOrigin(0.5).setTint(0xff0000);
        let title02 = this.add.bitmapText(centerX, centerY - textSpacer, 'gem', 'GMG RUNNER', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        let title03 = this.add.bitmapText(centerX, centerY - textSpacer, 'gem', 'GMG RUNNER', 64).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
       
        this.add.bitmapText(centerX, centerY, 'gem', 'Use SPACE to invert your gravity', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*0.5, 'gem', 'use LEFT and RIGHT arrows to move', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'gem', 'Press UP ARROW to Start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, 'gem', 'GMG 2021', 16).setOrigin(0.5);

        // title text tween
        this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onYoyoScope: this
        });
        this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // temp variables to maintain scope
            let textureManager = this.textures;
            let scene = this;
            // take snapshot of the entire game viewport
            // https://photonstorm.github.io/phaser3-docs/Phaser.Renderer.WebGL.WebGLRenderer.html#snapshot__anchor
            this.game.renderer.snapshot(function(image) {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', image);
            });
            
            // start next scene
            this.scene.start('playScene');
        }
    }
}