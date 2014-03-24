
Bombevo.Ending = function (game)
{
	this.game = game;
};

Bombevo.Ending.prototype =
{
	create: function ()
	{
		console.log('Preloade finished, this is title');

		if(this.sfxButton == null) this.sfxButton = this.game.add.audio('sfx_button');

		var bg = this.game.add.sprite(0, 0, 'bg_ending');
		bg.frame = this.game.ending;

		var splash = this.game.add.sprite(0,0, 'bg_splash');
		this.game.add.tween(splash).to({alpha:0}, 2000, Phaser.Easing.Linear.In, true, 0, false);
		splash.inputEnabled = true;
		splash.events.onInputDown.add(this.onExit, this);

		//Highscore sorting
		var scoreArr = [];
		for(var i=0;i<10;i++)
		{
			var score = localStorage['com.tempalabs.bombevo.score.'+i];

			if(score == undefined) score = 0;
			else score = parseInt(score);

			scoreArr.push(score);
		}

		scoreArr.push(parseInt(this.game.score));
		for(i=0;i<11;i++)
		{
			for(var j=i;j<11;j++)
			{
				if(scoreArr[j] > scoreArr[i])
				{
					var score1 = scoreArr[i];
					var score2 = scoreArr[j];
					scoreArr[i] = score2;
					scoreArr[j] = score1;
				}
			}
			localStorage['com.tempalabs.bombevo.score.'+i] = scoreArr[i];
		}
	},

	onExit: function()
	{
		if(this.game.isAudio) this.sfxButton.play();
		this.game.state.start('title');
	}
}