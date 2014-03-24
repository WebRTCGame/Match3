var Bombevo = {};

Bombevo.Boot = function (game)
{
	this.game = game;
};

Bombevo.Boot.prototype =
{

	preload: function ()
	{
        this.game.load.image('bg_preloader', 'asset/loading/LOADING1.png');
        this.game.load.image('sprite_loading', 'asset/loading/LOADING2.png');

        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL; //resize your window to see the stage resize too
		this.game.stage.scale.setShowAll();
		this.game.stage.scale.pageAlignHorizontally = true;
		this.game.stage.scale.pageAlignVertically = true;
		this.game.stage.scale.refresh();
	},

	create: function ()
	{
		console.log('Boot finished, lets go to the preloader automatically');

		this.game.state.start('preloader');
	}
}