(function (blocks) {

    var width = navigator.isCocoonJS ? window.innerWidth : 320,
        height = navigator.isCocoonJS ? window.innerHeight : 480;


    // number of columns
    blocks.w = 8;
    // number of rows
    blocks.h = 8;
    // size of a tile
    blocks.s = 36;
    // start number of colors
    blocks.c = 5;
    // round time
    blocks.t = 60000;
    // point limit between levels
    blocks.l = 3000;
    // number of tile types
    blocks.m = 11;
    // time bouns
    blocks.b = 100;
    // combo duration
    blocks.d = 500;

    blocks.types = {
        BOMB: 5,
        CRATE: 7
    };

    // game board offset from top left corner
    blocks.offset = {
        x: 32,
        y: 72
    };

    blocks.game = new Phaser.Game(width, height, navigator.isCocoonJS ? Phaser.WEBGL : Phaser.AUTO);

    blocks.game.state.add('Boot', blocks.Boot);
    blocks.game.state.add('Preload', blocks.Preload);
    blocks.game.state.add('Menu', blocks.Menu);
    blocks.game.state.add('Help', blocks.Help);
    blocks.game.state.add('Gameplay', blocks.Gameplay);

    blocks.game.state.start('Boot');

}(window.blocks = window.blocks || {}));