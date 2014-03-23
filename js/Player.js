/* global range */

var Player = function Player(settings) {
    this.stats = {
        exp: settings.exp || 0,
        red: settings.red || 0,
        yellow: settings.yellow || 0,
        green: settings.green || 0,
        blue: settings.blue || 0,
        wisdom: settings.wisdom || 0,
        skull: settings.skull || 0,
        points: settings.points || 0
    };
    this.hp = new range(0, 0, 99999, function() {}, function() {});
    
    this.level = 1;
    
    this.skullMatchDamage = 3;
    
    this.game = {
        gems: {
            red: new range(0, 0, 99999, function() {}, function() {}),
            yellow: new range(0, 0, 99999, function() {}, function() {}),
            green: new range(0, 0, 99999, function() {}, function() {}),
            blue: new range(0, 0, 99999, function() {}, function() {})
        },
        exp: new range(0, 0, 99999, function() {}, function() {}),
        hp: new range(0, 0, 99999, function() {}, function() {}),
        b: "a"
    };
};

Player.prototype.init = function init() {
    
    
};

