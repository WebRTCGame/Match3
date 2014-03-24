
var TileUtil = {};
TileUtil.TILE_HALF_SIZE = 40;
TileUtil.TILE_SIZE = 80;

TileUtil.getTileByPos = function(tileArr, posX, posY)
{
	var tile = null;

	if(posX >= 0 && posY >= 0 && posX < tileArr.length && posY < tileArr[posX].length)
	{
		tile = tileArr[posX][posY];
	}

	return tile;
}

TileUtil.getTilePos = function(tileArr, tile)
{
	var pos = {x:-1, y:-1};

	for(var i=0;i<tileArr.length;i++)
	{
		for(var j=0;j<tileArr[i].length;j++)
		{
			if(tile == tileArr[i][j])
			{
				console.log('tile=='+tileArr[i][j]+', '+i+','+j);
				pos.x = i;
				pos.y = j;
				break;
			}
		}
	}

	console.log('tile=='+tile+', '+pos.x+','+pos.y);
	return pos;
}

TileUtil.getMainIndexFromTileGroup = function(tileArr)
{
	var idx = -1;
	var tempLevel = -1;

	for (var i = 0; i < tileArr.length; i++)
	{
		if (tileArr[i].isActive == true) idx = i;
	}

	if (idx == -1) idx = Math.floor(tileArr.length / 2);

	return idx;
}

TileUtil.getDataTileGroup = function(tileArr)
{
	var data = {lowest:1000, highest:-1};
	for (var i = 0; i < tileArr.length; i++)
	{
		if (tileArr[i].frame < data.lowest) data.lowest = tileArr[i].frame;
		if (tileArr[i].frame > data.highest) data.highest = tileArr[i].frame;
	}

	return data;
}
