/* global game, PIXI */
var tileScale = 1;
var stdwh = 30;



var Tile = function Tile(texture) {
    PIXI.Sprite.call(this, texture);
    this.type = "1"; //settings.type || undefined;
    this.col = 1; //settings.col || -1;
    this.row = 1; //settings.row || -1;
    this.buttonMode = true;
    this.interactive = true;
    // is the this selected?
    this.isSelected = false;
    // set a this value
    //this.theVal = chosenthiss[i * 6 + j]
    // place the this
    //this.position.x = 7 + i * 80;
    //this.position.y = 7 + j * 80;
    // paint this black
    this.tint = 0x000000;
    // set it a bit transparent (it will look grey)
    this.alpha = 0.5;
    return this;
};

Tile.prototype = Object.create(PIXI.Sprite.prototype);

Tile.prototype.constructor = Tile;

Tile.fromFrame = function(frameId) {
    var texture = PIXI.TextureCache[frameId];
    if (!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache' + this);
    return new Tile(texture);
};

Tile.prototype.isSameType = function(otherTile) {
    return this.type === otherTile.type;
};
Tile.prototype.adjacent = function(otherTile) {

    if (otherTile.col === this.col - 1 && otherTile.row === this.row) {
        return true
    }
    if (otherTile.col === this.col + 1 && otherTile.row === this.row) {
        return true
    }
    if (otherTile.col === this.col && otherTile.row === this.row - 1) {
        return true
    }
    if (otherTile.col === this.col && otherTile.row === this.row + 1) {
        return true
    }
    return false;

};

Tile.prototype.setPosition = function(row, col) {};
Tile.prototype.getPosition = function() {
    var self = this;
    this.row = function() {
        return self.row;
    };
    this.col = function() {
        return self.col;
    };
};
Tile.prototype.update = function update() {};
Tile.prototype.render = function render() {};
Tile.prototype.destroy = function destroy() {};
Tile.prototype.other = {
    above: function() {

        return game.getTile(this.col, this.row - 1);
    },
    below: function() {

        return game.getTile(this.col, this.row + 1);
    },
    left: function() {

        return game.getTile(this.col - 1, this.row);
    },
    right: function() {
        return game.getTile(this.col + 1, this.row);

    }
};
