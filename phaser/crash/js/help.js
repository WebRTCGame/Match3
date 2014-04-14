(function (blocks) {

    function Help() {}

    var steps = [
            {
                text: 'hi',
                joseph: 'hi'
            },
            {
                text: 'fireworks',
                joseph: 'show',
                tile: 'tile_5'
            },
            {
                text: 'boxes',
                joseph: 'show',
                tile: 'tile_7'
            },
            {
                text: 'enjoy',
                joseph: 'tongue'
            }
        ],
        joseph = {
            x: 0,
            y: 150
        },
        balloon = {
            x: 160,
            y: 230
        },
        tile = {
            x: 140,
            y: 330
        };

    Help.prototype = {

        create: function () {
            this.current = 0;

            this.bg = this.add.sprite(160, 240, 'background');
            this.bg.anchor.x = 0.5;
            this.bg.anchor.y = 0.5;

            this.nextBtn = new blocks.Button(this, 230, 380, 'NEXT', this.nextPage, this);
            this.closeBtn = new blocks.Button(this, 230, 440, 'CLOSE', this.showMenu, this);

            this.balloon = null;
            this.joseph = null;
            this.tile = null;

            this.showStep();
        },

        showStep: function () {
            var step = steps[this.current];

            if (this.balloon) {
                this.world.remove(this.balloon);
            }
            this.balloon = this.add.sprite(balloon.x, balloon.y, 'balloon_' + step.text);
            this.balloon.anchor.x = 0.5;
            this.balloon.anchor.y = 1;

            if (this.joseph) {
                this.world.remove(this.joseph);
            }
            this.joseph = this.add.sprite(joseph.x, joseph.y, 'joseph', step.joseph);

            if (this.tile) {
                this.world.remove(this.tile);
                this.tile = null;
            }
            if (step.tile) {
                this.tile = this.add.sprite(tile.x, tile.y, 'tiles', step.tile);
                this.tile.anchor.x = 0.5;
                this.tile.anchor.y = 0.5;
            }

            if (this.current === steps.length - 1) {
                this.nextBtn.hide();
            }
        },

        nextPage: function () {
            if (this.current < steps.length - 1) {
                this.current += 1;
                this.showStep();
            }
        },

        showMenu: function () {
            this.game.state.start('Menu');
        }
    };

    blocks.Help = Help;

}(window.blocks = window.blocks || {}));