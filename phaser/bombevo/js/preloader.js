
Bombevo.Preloader = function (game)
{
	this.game = game;
};

Bombevo.Preloader.prototype =
{

	preload: function ()
	{
		this.game.load.image('bg_title', 'asset/title/TITLE-BG.png');
		this.game.load.image('logo_title', 'asset/title/LOGO.png');
		this.game.load.image('popup_tutorial', 'asset/popup/TUTORIAL.png');

		this.game.load.image('bg_splash', 'asset/splash.jpg');
		this.game.load.image('btn_play', 'asset/title/PLAY.png');
		this.game.load.image('btn_highscore', 'asset/title/HIGHSCORE.png');
		this.game.load.spritesheet('btn_audio', 'asset/title/AUDIO.png', 92, 92);

		this.game.load.spritesheet('bg_tutorial', 'asset/TUTORIAL-BG.jpg', 480, 800);
		this.game.load.spritesheet('bg_ending', 'asset/ENDING-BG.jpg', 480, 800);

		this.game.load.image('bg_play', 'asset/game/PLAY-BG.png');
		this.game.load.image('ufo', 'asset/game/ufo.png');
		this.game.load.image('gui_energy', 'asset/game/gui-energy.png');
		this.game.load.image('gui_time', 'asset/game/gui-time.png');
		this.game.load.image('gui_score', 'asset/game/gui-score.png');
		this.game.load.spritesheet('tile_gray', 'asset/game/tile-gray.png', 80, 80);
		this.game.load.spritesheet('tile_yellow', 'asset/game/tile-yellow.png', 80, 80);
		this.game.load.spritesheet('tile_blue', 'asset/game/tile-blue.png', 80, 80);
		this.game.load.spritesheet('tile_green', 'asset/game/tile-green.png', 80, 80);
		this.game.load.spritesheet('tile_red', 'asset/game/tile-red.png', 80, 80);
		this.game.load.spritesheet('bomb', 'asset/game/bomb.png', 100, 100);

		this.game.load.bitmapFont('visitor', 'asset/visitor.png', 'asset/visitor.xml');

		this.game.load.audio('bgm_main', ['asset/audio/bgm.wav', 'asset/audio/bgm.ogg']);
		this.game.load.audio('sfx_button', ['asset/audio/button.mp3', 'asset/audio/button.wav']);
		this.game.load.audio('sfx_step', ['asset/audio/step.mp3', 'asset/audio/step.wav']);
		this.game.load.audio('sfx_explosion', ['asset/audio/step.mp3', 'asset/audio/explosion.wav']);

		this.preloadBG = this.add.sprite(0, 0, 'bg_preloader');
		this.preloadBar = this.add.sprite(this.game.world.width*0.1, this.game.world.height*0.5, 'sprite_loading');
		this.preloadBar.anchor.setTo(0,0);
		this.load.setPreloadSprite(this.preloadBar);
	},

	create: function ()
	{
		console.log('Preloader finished, lets go to the Title automatically');

		this.game.state.start('title');
	}
}