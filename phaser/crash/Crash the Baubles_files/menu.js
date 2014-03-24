(function (blocks) {

    function Menu() {}

    Menu.prototype = {

        create: function () {
            this.bg = this.add.sprite(160, 240, 'background');
            this.bg.anchor.x = 0.5;
            this.bg.anchor.y = 0.5;

            this.add.sprite(0, 0, 'title');

            this.newGameBtn = new blocks.Button(this, 160, 200, 'NEW_GAME', this.startGame, this);
            this.helpBtn = new blocks.Button(this, 160, 260, 'HOW_TO_PLAY', this.showHelp, this);

            this.add.sprite(0, 425, 'ui', 'bottom_bar');
            (this.add.sprite(160, 440, 'ui', 'text_crash_em_all')).anchor.x = 0.5;
        },

        startGame: function () {
            this.game.state.start('Gameplay');
        },

        showHelp: function () {
            this.game.state.start('Help');
        }
    };

    blocks.Menu = Menu;

}(window.blocks = window.blocks || {}));