(function (blocks) {

    function Gameplay() {
        this.board = null;
        this.scoreText = null;
        this.levelText = null;
        this.timeBar = null;
        this.score = 0;
        this.level = 1;
        this.combo = 0;
        
        this.timeLeft = blocks.t;
        this.comboTimer = 0;
    }

    Gameplay.prototype.updateScore = function (score) {
        this.combo++;
        this.comboTimer = blocks.d;

        this.score += score * this.combo * 10;

        if (this.score >= this.level * blocks.l) {
            // level up condition
            this.nextLevel();
        } else {
            this.increaseTimeLeft(score * blocks.b * 10);
        }

        this.scoreText.setText(blocks.utils.getLang('SCORE', this.score));
    };

    Gameplay.prototype.increaseTimeLeft = function (time) {
        this.timeLeft += time;

        if (this.timeLeft > blocks.t) {
            this.timeLeft = blocks.t;
        }
    };

    Gameplay.prototype.updateTime = function (delta) {
        this.timeLeft -= delta;
        this.comboTimer -= delta;

        this.timeBar.crop.width = this.timeLeft / blocks.t * this.timeBar.width;
        
        if (this.timeLeft <= 0) {
            this.end();
        }

        if (this.combo > 0 && this.comboTimer <= 0) {
            this.combo = 0;
        }
    };

    Gameplay.prototype.nextLevel = function () {
        this.level++;

        if (blocks.c < blocks.m) {
            blocks.c++;
        }

        this.increaseTimeLeft(blocks.t);

        this.levelText.setText(blocks.utils.getLang('LEVEL', this.level));
    };

    Gameplay.prototype.create = function () {
        this.bg = this.add.sprite(160, 240, 'background');
        this.bg.anchor.x = 0.5;
        this.bg.anchor.y = 0.5;
        this.table = this.add.sprite(10, 50, 'board');
        this.cover = this.add.sprite(10, 50, 'board');
        this.cover.visible = false;
        this.cover.inputEnabled = true;

        this.add.sprite(0, 425, 'ui', 'bottom_bar');
        (this.add.sprite(160, 440, 'ui', 'text_crash_the_baubles')).anchor.x = 0.5;
        this.board = new blocks.Board(this);
        this.board.fill();

        // reset all the stuff
        this.score = 0;
        this.level = 1;
        this.combo = 0;
        blocks.c = 5;
        this.isPaused = false;

        this.scoreText = this.add.bitmapText(10, 15, blocks.utils.getLang('SCORE', this.score), {font: '24px Komika', align: 'left'});
        this.levelText = this.add.bitmapText(310, 15, blocks.utils.getLang('LEVEL', this.level), {font: '24px Komika', align: 'right'});

        this.levelText.anchor.x = 1;
        this.info = this.add.group();
        this.info.add(this.scoreText);
        this.info.add(this.levelText);

        this.timeLeft = blocks.t;

        this.pauseBtn = this.add.button(10, 375, 'button_pause', this.pause, this);
        
        this.add.sprite(60, 375, 'progress_back');
        this.timeBar = this.add.sprite(60, 375, 'progress_bar');
        this.timeBar.cropEnabled = true;

        this.resumeBtn = new blocks.Button(this, 160, 240, 'RESUME', this.resume, this);
        this.resumeBtn.hide();

        this.backBtn = new blocks.Button(this, 160, 300, 'BACK_TO_MENU', this.showMenu, this);
        this.backBtn.hide();

        this.pausedText = this.add.sprite(160, 70, 'ui', 'text_game_paused');
        this.pausedText.visible = false;
        this.pausedText.anchor.x = 0.5;

        this.endText = this.add.sprite(160, 70, 'ui', 'text_game_over');
        this.endText.visible = false;
        this.endText.anchor.x = 0.5;

        this.game.state.onPausedCallback = this.pause;
    };

    Gameplay.prototype.end = function () {
        this.isPaused = true;
        this.cover.visible = true;
        this.cover.bringToTop();
        this.table.vislble = false;
        this.endText.visible = true;
        this.endText.bringToTop();
        this.backBtn.show();
        this.info.visible = false;
    };

    Gameplay.prototype.pause = function () {
        this.isPaused = true;
        this.cover.visible = true;
        this.cover.bringToTop();
        this.pausedText.visible = true;
        this.pausedText.bringToTop();
        this.table.vislble = false;
        this.pauseBtn.visible = false;
        this.resumeBtn.show();
        this.backBtn.show();
        this.info.visible = false;
    };

    Gameplay.prototype.resume = function () {
        this.isPaused = false;
        this.cover.visible = false;
        this.pausedText.visible = false;
        this.table.visible = true;
        this.pauseBtn.visible = true;
        this.resumeBtn.hide();
        this.backBtn.hide();
        this.info.visible = true;
    };

    Gameplay.prototype.update = function () {
        if (!this.isPaused) {
            this.board.resolve();
            this.updateTime(this.time.elapsed);
        }
    };

    Gameplay.prototype.showMenu = function () {
        this.game.state.start('Menu');
    };

    blocks.Gameplay = Gameplay;

}(window.blocks = window.blocks || {}));