(function (blocks) {

    function Board(parent) {
        this.parent = parent;
        this.tiles = [];
        this.added = [];
        this.groups = {};
        this.current = null;
        this.cursor = null;
        this.isBusy = false;
        
        this.init();
    }

    Board.prototype.init = function () {
        console.log("board.init");
        var i, group, count;

        for (i = 1; i < blocks.m + 1; i++) {
            count = (i === blocks.types.BOMB) ? 3 : i === blocks.types.CRATE ? 7 : 20;

            group = this.groups[i] = this.parent.add.group();
            group.x = blocks.offset.x;
            group.y = blocks.offset.y;
            group.createMultiple(count, 'tiles', 'tile_' + i);
            
            // block crate inputs
            if (i !== blocks.types.CRATE) {
                group.setAll('inputEnabled', true);
            }
            group.setAll('anchor.x', 0.5);
            group.setAll('anchor.y', 0.5);
        }

        this.cursor = this.parent.add.sprite(0, 0, 'tiles', 'cursor');
        this.cursor.anchor.x = 0.5;
        this.cursor.anchor.y = 0.5;
        this.cursor.visible = false;
    };

    Board.prototype.fill = function () {
        var x, y, type, ctype, p1, p2, tile;

        this.added.length = 0;

        for (x = 0; x < blocks.w; x++) {
            if (!this.tiles[x]) {
                this.tiles[x] = [];
            }

            while ((y = this.tiles[x].length) < blocks.h) {
                type = this.pickType();
                
                // make sure the 3rd in a column is not the same type
                if ((p1 = this.tiles[x][y - 1]) && (p2 = this.tiles[x][y - 2]) &&
                    (p1.type === p2.type)) {
                    ctype = p1.type;
                    
                    while (type === ctype) {
                        type = this.pickType();
                    }
                }

                // make sure the 3rd in a row is not the same type
                if (this.tiles[x - 1] && (p1 = this.tiles[x - 1][y]) &&
                    this.tiles[x - 2] && (p2 = this.tiles[x - 2][y]) &&
                        (p1.type === p2.type)) {

                    while (type === p1.type || (ctype && type === ctype)) {
                        type = this.pickType();
                    }
                }
                tile = new blocks.Tile(this, x, y, type);
                this.tiles[x].push(tile);
                this.added.push(tile);
            }
        }
        return this.added;
    };

    Board.prototype.blur = function () {
        if (this.current) {
            this.cursor.visible = false;
            this.current = null;
        }
    };

    Board.prototype.focus = function (tile) {
        this.blur();
        this.current = tile;
        this.cursor.visible = true;
        this.cursor.bringToTop();
        this.cursor.reset(blocks.utils.toScreenX(tile.x), blocks.utils.toScreenY(tile.y));
    };

    Board.prototype.handleTile = function (tile) {
        var old;

        if (this.isBusy) return;

        old = this.current;

        // swap tiles
        if (old && tile.type !== blocks.types.BOMB &&
            // same column and distance is equal 1
            ((old.x === tile.x && Math.abs(old.y - tile.y) === 1) ||
            // same row and distance is equal 1
            (old.y === tile.y && Math.abs(old.x - tile.x) === 1))) {

            this.blur();
            this.swap(old, tile, true);
        // handle bombs
        } else if (tile.type === blocks.types.BOMB) {
            this.explode(tile.explode());
            this.blur();
        // focus tile
        } else {
            this.focus(tile);
        }
    };

    Board.prototype.swap = function (tile1, tile2, validate) {
        var that = this,
            x1 = tile1.x,
            y1 = tile1.y;

        // blocks.log('swap', tile1, tile2);
        
        this.tiles[tile1.x][tile1.y] = tile2;
        this.tiles[tile2.x][tile2.y] = tile1;

        tile1.move(tile2.x, tile2.y);
        // magic for swap back after animation
        tile2.move(x1, y1, validate && function () {
            var tiles = tile1.validate().concat(tile2.validate());
            // check if moved tile creates a line of at least 3
            if (tiles.length) {
                this.collect(tiles);
            // swap to previous position
            } else {
                this.swap(tile1, tile2, false);
            }
        });
    };

    Board.prototype.explode = function (tiles) {
        var that = this;
        tiles.forEach(function (tile) {
            that.tiles[tile.x][tile.y] = null;
            tile.destroy();
        });
    };

    Board.prototype.collect = function (tiles) {
        var that = this;

        this.parent.updateScore(tiles.length);
        
        tiles.forEach(function (tile) {
            that.tiles[tile.x][tile.y] = null;
            tile.destroy();
        });
    };

    Board.prototype.resolve = function () {
        // blocks.log('resolve board');
        var that = this;

        this.tiles.forEach(function (column, index) {
            if (column.indexOf(null) > -1) {
                that.stack(index);
            }
        });

        this.fill().forEach(function (tile) {
            var tiles = tile.validate();

            if (tiles.length) {
                that.collect(tiles);
            }
        });
    };

    Board.prototype.stack = function (x) {
        // blocks.log('stack', x);
        var that = this;

        this.tiles[x] = this.tiles[x].filter(notNull);
        
        this.tiles[x].forEach(function (tile, y) {
            // destroy crate if it's at the botttom
            if (tile.type === blocks.types.CRATE) {
                tile.move(x, y, function () {
                    if (tile.y === 0) {
                        that.tiles[tile.x][tile.y] = null;
                        that.parent.updateScore(100);
                        tile.destroy();
                    }
                });
            // just move the bomb and don't validate
            } else if (tile.type === blocks.types.BOMB) {
                tile.move(x, y);
            // move and validate tile
            } else {
                 tile.move(x, y, function () {
                    var tiles = tile.validate();

                    if (tiles.length) {
                        that.collect(tiles);
                    }
                });
            }
        });
    };

    Board.prototype.pickType = function () {
        var number = this.parent.rnd.integerInRange(1, blocks.c + 1);

        while (this.groups[number].countDead() < 1) {
            number = this.parent.rnd.integerInRange(1, blocks.c + 1);
        }

        return number;
    };

    function notNull(item) {
        return item !== null;
    }

    blocks.Board = Board;

}(window.blocks = window.blocks || {}));