
Bombevo.Games = function (game)
{
	this.game = game;

	this.energy = 30;
	this.score = 0;
	this.time = 99;

	this.timerCount = 0;
	this.doubleClickTiles = null;
	this.doubleClickCheck = 0;

	this.removedTileArr = null;
	this.tileArr = null;
	this.tile1 = null;
	this.tile2 = null;

	this.prevX = -1;
	this.prevY = -1;
};

Bombevo.Games.prototype =
{
	create: function ()
	{
		//console.log('This is Games');
		if(this.sfxButton == null) this.sfxButton = this.game.add.audio('sfx_button');
		if(this.sfxStep == null) this.sfxStep = this.game.add.audio('sfx_step');
		if(this.sfxExplosion == null) this.sfxExplosion = this.game.add.audio('sfx_explosion');

		this.game.add.sprite(0, 0, 'bg_play');

		this.ufo = this.game.add.sprite(this.game.world.width/2, 0, 'ufo');
		this.ufo.anchor.setTo(0.5,0.5);
		var guiEnergy = this.game.add.sprite(0, 60, 'gui_energy');
		var guiTime = this.game.add.sprite(40, 60, 'gui_time');
		var guiScore = this.game.add.sprite(20, 0, 'gui_score');

		this.bomb = this.game.add.sprite(this.game.world.width/2, this.game.world.height+50, 'bomb');
		this.bomb.anchor.setTo(0.5, 0.5);
		this.bomb.frame = 0;

		this.energyTxt = this.game.add.bitmapText(this.game.world.width*0.29, 72, '30', { font: '40px visitor', align: 'left' });
		this.energyTxt.anchor.setTo(0,0);
		this.scoreTxt = this.game.add.bitmapText(this.game.world.width*0.5, 12, '0', { font: '40px visitor', align: 'center' });
		this.scoreTxt.anchor.setTo(0.5,0);
		this.timeTxt = this.game.add.bitmapText(this.game.world.width*0.75, 72, '99', { font: '40px visitor', align: 'right' });
		this.timeTxt.anchor.setTo(1,0);

		//Ending Popup======================================================
		this.endingPopup = this.game.add.group();
		this.endingPopup.visible = false;


		//Init Game=========================================================
		this.boardGroup = this.game.add.group();
		this.boardGroup.x = (this.game.world.width - 400)/2;
		this.boardGroup.y = this.game.world.height - 400;

		this.removedTileArr = [];
		this.tileArr = [[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]];
		for(var i = 0; i<5; i++)
		{
			//var tempArr = [];
			for(var j = 0; j<5; j++)
			{
				var tile = this.addTileAt(i, j);
				//tempArr.push(tile);
			}
			//this.tileArr.push(tempArr);
		}

		this.timerCount = 0;
		this.energy = 30;
		this.score = 0;
		this.time = 99;
	},

	onTimer: function()
	{
		this.time-=1;
		this.timeTxt.setText(''+parseInt(this.time));
		this.ufo.y++;

		if(this.time == 0)
		{
			this.game.ending = 0;
			this.delayedCall(1000, this.preEnding);
		}
	},

	addEnergy: function(energyAddition)
	{
		this.energy += energyAddition;
		if(this.energy <= 0) this.energy = 0;
		this.energyTxt.setText(''+parseInt(this.energy));

		if(this.energy == 0)
		{
			this.game.ending = 0;
			this.delayedCall(1000, this.preEnding);
		}
	},

	addScore: function(scoreAddition)
	{
		this.score += scoreAddition;
		//if(this.score <= 0) this.score = 0;
		this.scoreTxt.setText(''+parseInt(this.score));
	},

	update: function()
	{
		this.timerCount++;
		if(this.timerCount >= 60)
		{
			this.timerCount = 0;
			this.onTimer();
		}
		if(this.doubleClickCheck > 0)
		{
			this.doubleClickCheck--;
			if(this.doubleClickCheck <= 0)
			{
				this.doubleClickTiles = null;
			}
		}

		if(this.tile1 != null && this.tile2 == null)
		{
			var tempX = this.game.input.x - this.boardGroup.x;
			var tempY = this.game.input.y - this.boardGroup.y;
			tempX = Math.floor(tempX/80);
			tempY = Math.floor(tempY/80);

			if(tempX < 0) tempX = 0;
			else if(tempX > 5) tempX = 5;
			if(tempY < 0) tempY = 0;
			else if(tempY > 5) tempY = 5;

			var difX = (tempX - this.prevX);
		    var difY = (tempY - this.prevY);

			//console.log('difX'+difX);
			//console.log('difY'+difY);

			if((Math.abs(difY) == 1 && difX == 0) ||
			   (Math.abs(difX) == 1 && difY == 0))
			   {
				   this.debugTileArr();
					this.tile2 = TileUtil.getTileByPos(this.tileArr, tempX, tempY);
					console.log(tempX+','+tempY);
					this.tile2.isActive = true;

					this.swapTiles();
					this.delayedCall(500, this.checkMatch);

					this.addEnergy(-1);
			   }
		}
	},

	//Utility function
	checkMatch: function()
	{
		console.log('check match!');
		var matchGroupArr = MatchUtil.getMatchingGroup(this.tileArr);
		console.log(matchGroupArr);

		if(matchGroupArr.length > 0) //Match
		{
			//console.log('match! '+matchGroupArr.length+' group');
			this.removeTileGroup(matchGroupArr);
			this.resetTile();
			this.fillTile();

			this.delayedCall(500, this.upTiles);
			this.delayedCall(600, this.checkMatch);
		}
		else //No match
		{
			console.log('no match!');

			this.swapTiles();
			this.delayedCall(500, this.upTiles);
		}
	},

	createTile: function(tileType)
	{
		//console.log('tileType='+tileType);
		var tile;
		var rand = (tileType != null ? tileType : Math.floor(Math.random()*4));

		if(rand == 0) tile = this.boardGroup.create(0, 0, 'tile_red');
		else if(rand == 1) tile = this.boardGroup.create(0, 0, 'tile_green');
		else if(rand == 2) tile = this.boardGroup.create(0, 0, 'tile_blue');
		else if(rand == 3) tile = this.boardGroup.create(0, 0, 'tile_yellow');
		else if(rand == 4) tile = this.boardGroup.create(0, 0, 'tile_gray');

		tile.anchor.setTo(0.5, 0.5);
		tile.inputEnabled = true;
		tile.events.onInputDown.add(this.downTiles, this);
		//tile.events.onInputUp.add(this.upTiles, this);
		tile.tileType = rand;
		tile.isActive = false;

		return tile;
	},

	addTileAt: function(posX, posY, tileType)
	{
		var tile = this.createTile(tileType);
		tile.x = 80*posX + 40;
		tile.y = 80*posY + 40;

		this.tileArr[posX][posY] = tile;

		return tile;
	},

	removeTile: function(tile)
	{
		//var tile = this.removedTileArr.splice(0,1);
		console.log('remove = '+tile);
		var removeSuccess = this.boardGroup.remove(tile);
		console.log('removeSuccess = '+removeSuccess);
	},

	removeTileGroup: function(matchGroupArr)
	{
		for(var i=0; i < matchGroupArr.length; i++)
		{
			var tempArr = matchGroupArr[i];
			var mainTileIdx = TileUtil.getMainIndexFromTileGroup(tempArr);
			var mainTile = tempArr[mainTileIdx];
			var data = TileUtil.getDataTileGroup(tempArr);

			this.addScore(parseInt(tempArr.length * (data.lowest+1)));

			for (var j = 0; j < tempArr.length; j++)
			{
				var tile = tempArr[j];
				var tilePos = TileUtil.getTilePos(this.tileArr, tile);

				if (tile != mainTile)
				{
					console.log('remove?');
					tile.isActive = false;

					var tween = this.game.add.tween(tile).to({x:mainTile.x, y:mainTile.y, alpha:0.5}, 500, Phaser.Easing.Linear.In, true, 0, false);
					tween.onComplete.add(this.removeTile, this);
					//this.game.removedTileArr.push(tile);
					//tween.onCompleteCallback(this.removeTile);
					//this.boardGroup.remove(tile);

					if(tilePos.x != -1 && tilePos.y != -1) this.tileArr[tilePos.x][tilePos.y] = null;
				}else
				{
					if(data.lowest == data.highest) tile.frame = data.highest + 1; //Upgrade Level!
					else tile.frame = data.highest;

					this.game.add.tween(mainTile.scale).to({x:1.2, y:1.2}, 500, Phaser.Easing.Linear.In)
													   .to({x:1, y:1}, 500, Phaser.Easing.Linear.In)
													   .start();


				}
			}
		}
	},

	resetTile: function()
	{
		for (var i = 0; i < this.tileArr.length; i++)
		{
			for (var j = this.tileArr[i].length - 1; j > 0; j--)
			{
				if(this.tileArr[i][j] == null && this.tileArr[i][j-1] != null)
				{
					var tempTile = this.tileArr[i][j-1];
					this.tileArr[i][j] = tempTile;
					this.tileArr[i][j-1] = null;

					this.game.add.tween(tempTile).to({y:80*j+40}, 500, Phaser.Easing.Linear.In, true);
					//console.log('tween to '+(80*j+40));
					j = this.tileArr[i].length-1;
				}
			}
		}
	},

	fillTile: function()
	{
		var i = 0;
		var j = 0;
		var emptyCount = 0;

		for (i = 0; i < this.tileArr.length; i++)
		{
			emptyCount = 1;
			for (j = this.tileArr[i].length-1; j >= 0; j--)
			{
				if (this.tileArr[i][j] == null)
				{
					var tile = this.addTileAt(i, j);
					tile.y = 40 - 80 * emptyCount;
					this.game.add.tween(tile).to({y:80*j+40}, 500, Phaser.Easing.Linear.In, true);
					//console.log('tween to '+(80*j+40));

					emptyCount++;
				}
			}
			emptyCount = 1;
		}
	},

	swapTiles: function()
	{
		if (this.tile1 && this.tile2)
		{
			console.log('swapTiles1 '+this.tile1.x+','+this.tile1.y);
			console.log('swapTiles2 '+this.tile2.x+','+this.tile2.y);
			if(this.game.isAudio) this.sfxStep.play();

			//this.tile1.x = 0;
			//this.tile2.x = 0;

			var tile1Pos = {x:(this.tile1.x-40)/80,y:(this.tile1.y-40)/80};//TileUtil.getTilePos(this.tileArr, this.tile1);
			var tile2Pos = {x:(this.tile2.x-40)/80,y:(this.tile2.y-40)/80};//TileUtil.getTilePos(this.tileArr, this.tile2);

			//this.debugTileArr();

			this.tileArr[tile1Pos.x][tile1Pos.y] = this.tile2;
			this.tileArr[tile2Pos.x][tile2Pos.y] = this.tile1;

			this.game.add.tween(this.tile1).to({x:tile2Pos.x * 80 + 40, y:tile2Pos.y * 80 + 40}, 200, Phaser.Easing.Linear.In, true, 0, false);
			this.game.add.tween(this.tile2).to({x:tile1Pos.x * 80 + 40, y:tile1Pos.y * 80 + 40}, 200, Phaser.Easing.Linear.In, true, 0, false);

			this.tile1 = this.tileArr[tile1Pos.x][tile1Pos.y];
			this.tile2 = this.tileArr[tile2Pos.x][tile2Pos.y];
		}
	},

	debugTileArr: function()
	{
		console.log('[');
		for(var i=0;i<this.tileArr.length;i++)
		{
			var str = '[';
			for(var j=0;j<this.tileArr[i].length;j++)
			{
				str = str + this.tileArr[i][j] +','
			}
			str = str + ']';
			console.log(str);
		}
		console.log(']');
	},

	//Interaction function...
	downTiles: function(sprite, pointer)
	{
		this.doubleClickCheck = 30;

		if(this.doubleClickTiles == null) this.doubleClickTiles = sprite;
		else
		{
			if(this.doubleClickTiles == sprite)
			{
				this.doubleClick(sprite);

				this.upTiles();
				this.doubleClickTiles = null;
			}
			else this.doubleClickTiles = sprite;
		}

		if(this.doubleClickTiles != null)
		{
			this.tile1 = sprite;
			this.tile1.isActive = true;

			this.prevX = (sprite.x-40)/80;
			this.prevY = (sprite.y-40)/80;
		}
	},

	upTiles: function()
	{
		console.log('inactive '+this.tile1+','+this.tile2);
		if(this.tile1)
		{
			this.tile1.isActive =false
			this.tile1 = null;
		}
		if(this.tile2)
		{
			this.tile2.isActive =false
			this.tile2 = null;
		}

		this.prevX = -1;
		this.prevY = -1;
	},

	doubleClick: function(sprite)
	{
		console.log('double click '+sprite.tileType);
		console.log(sprite.x+','+sprite.y);
		var tilePos = {x:((sprite.x-40)/80),y:((sprite.y-40)/80)};
		console.log(tilePos.x+','+tilePos.y);

		if(sprite.tileType == 3) //Gold
		{
			this.addScore((sprite.frame+1)*1000);

			this.removeTile(sprite);
			if(tilePos.x != -1 && tilePos.y != -1) this.tileArr[tilePos.x][tilePos.y] = null;

			this.resetTile();
			this.fillTile();

			this.delayedCall(600, this.checkMatch);
		}else
		{
			this.removeTile(sprite);
			if(tilePos.x != -1 && tilePos.y != -1) this.tileArr[tilePos.x][tilePos.y] = null;

			this.resetTile();
			this.fillTile();

			var bombFrame = 0;
			if(sprite.tileType < 3)
			{
				bombFrame = sprite.tileType*4 + sprite.frame;

				if(sprite.frame < 3) this.game.ending = 1;
				else this.game.ending = 2;
			}else
			{
				bombFrame = 12 + sprite.frame;
				if(sprite.frame == 0) this.game.ending = 2;
				else this.game.ending = 3;
			}
			this.bomb.frame = bombFrame;

			var tween = this.game.add.tween(this.bomb).to({y:this.ufo.y}, 2000, Phaser.Easing.Linear.None, true, 0, false);
			this.delayedCall(1000, this.preEnding);
		}

		this.addEnergy(-1);
	},

	delayedCall: function(duration, callback)
	{
		var tween = this.game.add.tween(this).to({}, duration, Phaser.Easing.Linear.None, true, 0, false);
		tween.onCompleteCallback(callback);
	},

	onMenu: function()
	{
		this.game.state.start('title');
	},

	preEnding: function()
	{
		var splash = this.game.add.sprite(0, 0, 'bg_splash');
		splash.alpha = 0;
		this.game.add.tween(splash).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 0, false);

		if(this.game.isAudio) this.sfxExplosion.play();
		this.delayedCall(1000, this.onEnding);
	},

	onEnding: function()
	{
		console.log('ending');
		this.game.score = this.score;
		this.game.state.start('ending');
	}
}