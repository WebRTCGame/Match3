(function(blocks) {

    function Boot() {}

    navigator.isCocoonJS = false;

    Boot.prototype = {
        preload: function() {
            console.log("boot preload");
            // fix for using bitmap fonts with CocoonJS Launcher
            if (navigator.isCocoonJS) {
                blocks.utils.fixDOMParser();
            }

            this.game.load.text('lang', 'assets/lang.json');
            this.game.load.image('rotate', 'assets/rotate.png');
            this.game.load.image('progress_back', 'assets/progress_back.png');
            this.game.load.image('progress_bar', 'assets/progress_bar.png');
            this.game.load.image('background', 'assets/background.png');
            this.game.load.atlas('ui', 'assets/ui.png', 'assets/ui.json');

            this.game.load.bitmapFont('Komika', 'fonts/Komika_0.png', 'fonts/Komika' + (navigator.isCocoonJS ? '.json' : '.xml'));
        },

        create: function() {
            console.log("boot create");
            var ratio = blocks.utils.getRatio('all', 320, 480);

            this.input.maxPointers = 1;

            blocks.lang = JSON.parse(this.cache.getText('lang'));

            if (navigator.isCocoonJS) {
                this.world._container.scale.x = ratio.x;
                this.world._container.scale.y = ratio.y;
                this.world._container.updateTransform();
            }
            else {
                this.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
                this.stage.scale.minWidth = 320;
                this.stage.scale.minHeight = 480;

                if (!this.game.device.desktop) {
                    this.stage.scale.forceOrientation(false, true, 'rotate');
                }
                this.stage.scale.pageAlignHorizontally = true;
                this.stage.scale.setScreenSize(true);
            }

            this.game.state.start('Preload');
        }
    };

    blocks.Boot = Boot;

}(window.blocks = window.blocks || {}));