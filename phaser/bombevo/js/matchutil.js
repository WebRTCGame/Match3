
var MatchUtil = {};

MatchUtil.getMatchingGroup = function(tileArr)
{
	var matchingArr = [];

	var groupArr = [];
	for (var i = 0; i < tileArr.length; i++)
	{
		var tempArr = tileArr[i];
		groupArr = [];
		for (var j = 0; j < tempArr.length; j++)
		{
			if(j < tempArr.length - 2)
				if (tileArr[i][j] && tileArr[i][j + 1] && tileArr[i][j + 2])
				{
					if (tileArr[i][j].tileType == tileArr[i][j+1].tileType && tileArr[i][j+1].tileType == tileArr[i][j+2].tileType)
					{
						if (groupArr.length > 0)
						{
							if (groupArr.indexOf(tileArr[i][j]) == -1)
							{
								matchingArr.push(groupArr);
								groupArr = [];
							}
						}

						if (groupArr.indexOf(tileArr[i][j]) == -1)
						{
							groupArr.push(tileArr[i][j]);
						}
						if (groupArr.indexOf(tileArr[i][j+1]) == -1)
						{
							groupArr.push(tileArr[i][j+1]);
						}
						if (groupArr.indexOf(tileArr[i][j+2]) == -1)
						{
							groupArr.push(tileArr[i][j+2]);
						}
					}
				}
		}
		if(groupArr.length > 0) matchingArr.push(groupArr);
	}

	for (j = 0; j < tileArr.length; j++)
	{
		var tempArr = tileArr[j];
		groupArr = [];
		for (i = 0; i < tempArr.length; i++)
		{
			if(i < tempArr.length - 2)
				if (tileArr[i][j] && tileArr[i+1][j] && tileArr[i+2][j])
				{
					if (tileArr[i][j].tileType == tileArr[i+1][j].tileType && tileArr[i+1][j].tileType == tileArr[i+2][j].tileType)
					{
						if (groupArr.length > 0)
						{
							if (groupArr.indexOf(tileArr[i][j]) == -1)
							{
								matchingArr.push(groupArr);
								groupArr = [];
							}
						}

						if (groupArr.indexOf(tileArr[i][j]) == -1)
						{
							groupArr.push(tileArr[i][j]);
						}
						if (groupArr.indexOf(tileArr[i+1][j]) == -1)
						{
							groupArr.push(tileArr[i+1][j]);
						}
						if (groupArr.indexOf(tileArr[i+2][j]) == -1)
						{
							groupArr.push(tileArr[i+2][j]);
						}
					}
				}
		}
		if(groupArr.length > 0) matchingArr.push(groupArr);
	}

	return matchingArr;
}