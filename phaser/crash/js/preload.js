(function (blocks) {

    function Preload() {}

    Preload.prototype = {
        preload: function () {
            console.log("preload.js");
            this.bg = this.add.sprite(160, 240, 'background');
            this.bg.anchor.x = 0.5;
            this.bg.anchor.y = 0.5;

            this.loading = this.add.bitmapText(160, 230, blocks.lang.LOADING, {font: '24px Komika', align: 'center'});
            this.loading.anchor.x = 0.5;
            this.loading.anchor.y = 1;

            this.add.sprite(35, 240, 'progress_back');
            this.progressBar = this.add.sprite(35, 240, 'progress_bar');
            this.load.setPreloadSprite(this.progressBar);


            this.load.atlas('tiles', 'assets/tiles.png', 'assets/tiles.json');
            this.load.atlas('joseph', 'assets/joseph.png', 'assets/joseph.json');
            this.load.image('balloon_boxes', 'assets/balloon_boxes.png');
            this.load.image('balloon_enjoy', 'assets/balloon_enjoy.png');
            this.load.image('balloon_fireworks', 'assets/balloon_fireworks.png');
            this.load.image('balloon_hi', 'assets/balloon_hi.png');
            this.load.image('board', 'assets/board.png');
            this.load.image('button_pause', 'assets/button_pause.png');
            this.load.image('button', 'assets/button.png');
            this.load.image('title', 'assets/title.png');
            this.load.spritesheet('boom', 'assets/anim_boom.png', 36, 36, 7);
            this.load.spritesheet('pop', 'assets/anim_pop.png', 36, 36, 7);
        },

        create: function () {
            this.game.state.start('Menu');
        }
    };

    blocks.Preload = Preload;

}(window.blocks = window.blocks || {}));