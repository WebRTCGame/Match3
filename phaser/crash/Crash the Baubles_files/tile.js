(function (blocks) {

    // tile tweening speed
    var speed = 300;

    function Tile(board, x, y, type) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.type = type;
        this.isBusy = false;
        this.tween = null;
        this.toRemove = [];
        this.bottom = [];
        this.top = [];
        this.left = [];
        this.right = [];

        this.sprite = this.board.groups[this.type].getFirstDead();
        this.sprite.reset(this.x * blocks.s, -this.y * blocks.s);

        // don't add input handler for crates
        if (this.type !== blocks.types.CRATE) {
            this.sprite.events.onInputDown.add(this.handleClick, this);
        }
        
        this.initMove();
    }

    Tile.prototype.setBusy = function () {
        this.isBusy = true;
    };

    Tile.prototype.setFree = function() {
        this.isBusy = false;
    };

    Tile.prototype.initMove = function () {
        this.tween = this.board.parent.add.tween(this.sprite);
        this.tween.onStart.add(this.setBusy, this);
        this.tween.onComplete.add(this.setFree, this);
        this.tween.to({
                y: (blocks.h - 1 - this.y) * blocks.s
            }, speed, Phaser.Easing.Bounce.Out);
        this.tween.start();
    };

    Tile.prototype.handleClick = function () {
        if (!this.isBusy) {
            this.board.handleTile(this);
        }
    };

    Tile.prototype.move = function (x, y, callback) {
        var dest = {};

        if (x !== this.x) {
            this.x = x;
            dest.x = x * blocks.s;
        }

        if (y !== this.y) {
            this.y = y;
            dest.y = (blocks.h - 1 - y) * blocks.s;
        }

        if (dest.x !== undefined || dest.y !== undefined) {
            this.tween = this.board.parent.add.tween(this.sprite);
            this.tween.onStart.add(this.setBusy, this);
            this.tween.onComplete.add(this.setFree, this);
            this.tween.to(dest, speed, Phaser.Easing.Bounce.Out);
            if (callback) {
                this.tween.onComplete.add(callback, this.board);
            }
            this.tween.start();
        }
    };

    Tile.prototype.explode = function () {
        var i, next;

        this.toRemove.length = 0;
        this.toRemove.push(this);

        for (i = 1; i < 3; i++) {
            next = this.checkNext(0, i);
            if (next) this.toRemove.push(next);
            next = this.checkNext(0, -i);
            if (next) this.toRemove.push(next);
            next = this.checkNext(i, 0);
            if (next) this.toRemove.push(next);
            next = this.checkNext(-i, 0);
            if (next) this.toRemove.push(next);
        }

        return this.toRemove;
    };

    Tile.prototype.destroy = function () {
        // var effect;

        if (this.type !== blocks.types.CRATE) {
            this.sprite.events.onInputDown.removeAll();
        }

        this.sprite.play('die');

        // effect = this.board.parent.add.sprite(
        //     this.sprite.x + blocks.offset.x,
        //     this.sprite.y + blocks.offset.y,
        //     this.type === blocks.types.BOMB ? 'boom' : 'pop');

        // effect.anchor.x = effect.anchor.y = 0.5;
        // effect.animations.add('anim');
        // effect.animations.play('anim', 20, false, true);
        this.sprite.kill();
        this.board = null;
    };

    Tile.prototype.validate = function () {
        // clear all arrays
        this.toRemove.length = 0;
        this.bottom.length = 0;
        this.top.length = 0;
        this.left.length = 0;
        this.right.length = 0;

        // check for similar tiles
        this.getNext(0, -1, this.bottom);
        this.getNext(0, 1, this.top);
        this.getNext(-1, 0, this.left);
        this.getNext(1, 0, this.right);
        this.toRemove = this.checkSides(this.top, this.bottom, this.toRemove);
        this.toRemove = this.checkSides(this.left, this.right, this.toRemove);

        // got tiles to remove
        if (this.toRemove.length) this.toRemove.push(this);

        return this.toRemove;
    };

    Tile.prototype.getNext = function(x, y, output) {
        var next = this.checkNext(x, y);

        if (next && next.type !== this.type) {
            next = false;
        }

        while (next) {
            output.push(next);
            next = next.checkNext(x, y);
            if (next && next.type !== this.type) {
                next = false;
            }
        }
    };

    Tile.prototype.checkSides = function(first, second, output) {
        if (first.length) {
            if (first.length === 1 && second.length) {
                output = output.concat(first, second);
            } else if (first.length > 1) {
                output = output.concat(first);
                if (second.length) {
                    output = output.concat(second);
                }
            }
        } else if (second.length > 1) {
            output = output.concat(second);
        }

        return output;
    };

    Tile.prototype.checkNext = function (x, y) {
        var next;

        if (!this.board) return false;

        if (x) {
            next = this.board.tiles[this.x + x] ? this.board.tiles[this.x + x][this.y] : null;
        } else if (y) {
            next = this.board.tiles[this.x][this.y + y];
        }

        return next || false;
    };

    blocks.Tile = Tile;

}(window.blocks = window.blocks || {}));