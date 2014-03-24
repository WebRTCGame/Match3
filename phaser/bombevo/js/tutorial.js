
Bombevo.Tutorial = function (game)
{
	this.game = game;
};

Bombevo.Tutorial.prototype =
{
	create: function ()
	{
		console.log('Preloade finished, this is title');

		if(this.sfxButton == null) this.sfxButton = this.game.add.audio('sfx_button');

		this.bg = this.game.add.sprite(0, 0, 'bg_tutorial');

		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add(this.onPlay, this);
	},

	onPlay: function()
	{
		if(this.game.isAudio) this.sfxButton.play();
		if(this.bg.frame < 2)
		{
			this.bg.frame++;
		}else
		{
			this.game.state.start('games');
		}
	}
}