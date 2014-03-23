/* global hashmap, Tile */

var PlayArea = function PlayArea() {
    this.board = new hashmap();
    this.boardWidth = 800;
    this.boardHeight = 480;
    
    this.weights = {
        red: 1,
        yellow: 1,
        green: 1,
        blue: 1,
        exp: 0.9,
        gold: 0.75,
        skull: 0.5,
        redSkull: 0.125,
        wildcard: 0.05
    };
    this.tileTypes = ['red', 'yellow', 'green', 'blue', 'exp', 'gold', 'skull', 'redskull', 'wild'];
    this.tileWeights = [0.2, 0.2, 0.2, 0.2, 0.05, 0.05, 0.075, 0.0125, 0.0125];
    this.init();
    return this;
};

PlayArea.prototype.generate = function generate() {};
PlayArea.prototype.check = function check() {};
PlayArea.prototype.init = function init() {};
PlayArea.prototype.genTile = function genTile(settings) {
    return new Tile(settings);
};
PlayArea.prototype.getTile = function(col, row) {
    return this.board[col + "," + row]
};
PlayArea.prototype.getTileWeight = function(tileType) {
    //fix: add length checking, type checking
    return this.tileWeights[this.tileTypes.indexOf(tileType)];
};


var game = new PlayArea();






var generateWeighedList = function(list, weight) {
    var weighed_list = [];

    // Loop over weights
    for (var i = 0; i < weight.length; i++) {
        var multiples = weight[i] * 100;

        // Loop over the list of items
        for (var j = 0; j < multiples; j++) {
            weighed_list.push(list[i]);
        }

    }
    return weighed_list;
};

var list = ['red', 'yellow', 'green', 'blue', 'exp', 'gold', 'skull', 'redskull', 'wild'];
var weight = [0.2, 0.2, 0.2, 0.2, 0.05, 0.05, 0.075, 0.0125, 0.0125];
var weighed_list = generateWeighedList(list, weight);
/*
var random_check = {
	red: 0,
	yellow: 0,
	green: 0,
	blue: 0,
  exp: 0,
  gold: 0,
  skull: 0,
  redskull: 0,
  wild: 0
};
var random_num
	, item;

for (var i = 0; i < 64; i++) {
  //Object.keys(myArray).length
  var rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
	random_num = rand(0, weighed_list.length-1);
	item = weighed_list[random_num];
	++random_check[item];
  
}

console.log(random_check);
*/