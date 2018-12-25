function Viewport(screenWidth, screenHeight, mapWidth, mapHeight, tileWidth, tileHeight)
{
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    
    this.startTileX = null;
    this.startTileY = null;
    this.endTileX = null;
    this.endTileY = null;

    this.startOffsetX = null;
    this.startOffsetY = null;
    this.update = function(playerPosX, playerPosY)
    {
        // move the map around based on player position
        var playerTile = [Math.floor(playerPosX / this.tileWidth),
                          Math.floor(playerPosY / this.tileHeight)];
        var tilesOnScreen = [Math.floor(this.screenWidth / this.tileWidth),
                             Math.floor(this.screenHeight / this.tileHeight)];
        var tilesOnMap = [Math.floor(this.mapWidth / this.tileWidth),
                          Math.floor(this.mapHeight / this.tileHeight)];

        // currently doesn't handle the case where map is smaller than the screen
        if(playerTile[0] < Math.ceil(tilesOnScreen[0] / 2 + 1))
        {
            this.startTileX = 0;
            this.endTileX = tilesOnScreen[0];
            this.startOffsetX = 0;    
        }
        else if(playerTile[0] > (tilesOnMap[0] - Math.ceil(tilesOnScreen[0] / 2)))
        {
            this.startTileX = Math.max(tilesOnMap[0] - tilesOnScreen[0] - 1, 0);
            this.endTileX = tilesOnMap[0];
            this.startOffsetX = 0;
        }
        else
        {
            this.startTileX = Math.max(Math.floor(playerTile[0] - tilesOnScreen[0] / 2 - 1), 0);
            this.endTileX =  Math.min(playerTile[0] + Math.ceil(tilesOnScreen[0] / 2) + 1, tilesOnMap[0]);
            this.startOffsetX = -(playerPosX % this.tileWidth);
        }

        if(playerTile[1] < Math.ceil(tilesOnScreen[1] / 2 + 1))
        {
            this.startTileY = 0;
            this.endTileY = tilesOnScreen[1];
            this.startOffsetY = 0;    
        }
        else if(playerTile[1] > (tilesOnMap[1] - Math.ceil(tilesOnScreen[1] / 2)))
        {
            this.startTileY = Math.max(tilesOnMap[1] - tilesOnScreen[1] - 1, 0);
            this.endTileY = tilesOnMap[1];
            this.startOffsetY = 0;
        }
        else
        {
            this.startTileY = Math.max(Math.floor(playerTile[1] - tilesOnScreen[1] / 2 - 1), 0);
            this.endTileY = Math.min(playerTile[1] + Math.ceil(tilesOnScreen[1] / 2) + 1, tilesOnMap[1]);
            this.startOffsetY = -(playerPosY % this.tileHeight);
        }
    }
}