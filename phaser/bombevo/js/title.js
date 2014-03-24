
Bombevo.Title = function (game)
{
	this.game = game;

	this.logoTitle = null;
	this.playBtn= null;
	this.creditBtn = null;

	this.creditPopup = null;

	this.floatingLogo = 0;

	this.music = null;
	this.sfxButton = null;
	this.game.isAudio = true;
};

Bombevo.Title.prototype =
{
	create: function ()
	{
		console.log('Preloade finished, this is title');
		if(this.music == null)
		{
			this.music = this.game.add.audio('bgm_main');
		}
		if(this.sfxButton == null) this.sfxButton = this.game.add.audio('sfx_button');

		this.game.add.sprite(0, 0, 'bg_title');
		this.logoTitle = this.game.add.sprite(0, 0, 'logo_title');

		this.playBtn = this.game.add.button(this.game.world.width/2, this.game.world.height - 5, 'btn_play', this.onPlay, this, null, 0);
		this.playBtn.anchor.setTo(0.5,1);
		this.highscoreBtn = this.game.add.button(this.game.world.width - 3, this.game.world.height - 5, 'btn_highscore', this.onHighscore, this, null, 0);
		this.highscoreBtn.anchor.setTo(1,1);
		//this.audioBtn = this.game.add.button(3, this.game.world.height - 5, 'btn_audio', this.onCredit, this, null, 0, 1);
		this.audioBtn = this.game.add.sprite(3, this.game.world.height - 5, 'btn_audio');
		this.audioBtn.anchor.setTo(0,1);
		this.audioBtn.inputEnabled = true;
		this.audioBtn.events.onInputDown.add(this.onAudio, this);

		this.popupTutorial = this.game.add.group();
		this.popupTutorial.create(40, 60,'popup_tutorial');

		var content = "Highscore\n";
		for(var i=0;i<10;i++)
		{
			var score = localStorage['com.tempalabs.bombevo.score'+i];

			if(score == undefined) score = 0;
			else score = parseInt(score);

			content = content + (i+1) +". "+score+"\n";
		}

		var contentTxt = this.game.add.bitmapText(100, 140, '30', { font: '40px visitor', align: 'left' });
		contentTxt.anchor.setTo(0,0);
		contentTxt.setText(content);
		this.popupTutorial.add(contentTxt);

		this.popupTutorial.visible = false;


		if(this.game.isAudio == true)
		{
			this.audioBtn.frame = 0;
			if(this.music.isPlaying == false)
			{
				this.music.play(0, 0, 1, true);
				//this.music.mute = false;
			}
		}
		else
		{
			this.audioBtn.frame = 1;
			this.music.mute = true;
		}
	},

	update: function()
	{
		this.floatingLogo+=0.05;
		this.logoTitle.y = Math.sin(this.floatingLogo)*20;
	},

	onPlay: function()
	{
		if(this.game.isAudio) this.sfxButton.play();
		this.game.state.start('tutorial');
	},

	onHighscore: function()
	{
		if(this.game.isAudio) this.sfxButton.play();
		this.popupTutorial.visible = !this.popupTutorial.visible;
	},

	onAudio: function()
	{
		if(this.audioBtn.frame == 0)
		{
			this.audioBtn.frame = 1;
			this.music.mute = true;
			this.game.isAudio = false;
		}else
		{
			this.audioBtn.frame = 0;
			this.music.mute = false;
			this.game.isAudio = true;
		}
	}
}