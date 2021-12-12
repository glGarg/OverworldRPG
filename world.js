var TileSprites = {};

// replaced with one tileset containing all kinds of tiles
function getTileSprite(material)
{
    // animate water when we start using tileset
    if(!TileSprites.hasOwnProperty(`${material}`))
    {
        TileSprites[`${material}`] = new Sprite(`overworld/tileset/${material}.png`, 1, 1);
    }

    return TileSprites[`${material}`];
}

function Map(width, height, tileWidth, tileHeight, tileSetSrc, undergrowth, layers, renderer)
{
    this.frame = 0;
    this.frameTicker = 0;
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSet = new TileSet(tileSetSrc);

    this.undergrowth = undergrowth;
    this.layers = layers;
    this.renderer = renderer;

    this.isWalkable = function(x, y)
    {
        var isTileWalkable = true;
        for(var i = 0; i < this.layers.length; ++i)
        {
            var tile = this.layers[i][xytoi(Math.floor(x / this.tileWidth), Math.floor(y / this.tileHeight), this.width)];
            isTileWalkable &= tileTypes[`${tile}`].type == tileType.walkable;
        }

        return x >= 0 && x < this.tileWidth * this.width &&
               y >= 0 && y < this.tileHeight * this.height &&
               isTileWalkable;
    }

    this.drawLayer = function(layer, layerWidth, layerHeight, layerTileWidth, layerTileHeight,
                   startTileX, startTileY, endTileX, endTileY, startPosX, startPosY)
    {
        for(var x = startTileX; x < endTileX; ++x)
        {
            for(var y = startTileY; y < endTileY; ++y)
            {
                var tileType = tileTypes[layer[xytoi(x, y, layerWidth)]];
                if(tileType == undefined || tileType.mat == "air")
                {
                    continue;
                }

                var frameOffset = this.frame % tileType.frames * tileType.width;
                
                this.renderer.draw(this.tileSet, {
                    tileSetPosX: tileType.x + frameOffset,
                    tileSetPosY: tileType.y,
                    depth: tileType.z,
                    tileSetWidth: tileType.width,
                    tileSetHeight: tileType.height,
                    x: startPosX + (x - startTileX) * layerTileWidth,
                    y: startPosY + (y - startTileY) * layerTileHeight,
                    width: layerTileWidth,
                    height: layerTileHeight,
                    baseOffset: tileType.baseOffset
                });
            }
        }
    }

    this.drawUndergrowth = function(tileTypeId, layerTileWidth, layerTileHeight,
                                    startTileX, startTileY, endTileX, endTileY, startPosX, startPosY)
    {
        var tileType = tileTypes[tileTypeId];
        if(tileType == undefined || tileType.mat == "air")
        {
            return;
        }

        for(var x = startTileX; x < endTileX; ++x)
        {
            for(var y = startTileY; y < endTileY; ++y)
            {
                var frameOffset = this.frame % tileType.frames * tileType.width;
                this.renderer.draw(this.tileSet, {
                    tileSetPosX: tileType.x + frameOffset,
                    tileSetPosY: tileType.y,
                    depth: tileType.z,
                    tileSetWidth: tileType.width,
                    tileSetHeight: tileType.height,
                    x: startPosX + (x - startTileX) * layerTileWidth,
                    y: startPosY + (y - startTileY) * layerTileHeight,
                    width: layerTileWidth,
                    height: layerTileHeight,
                    baseOffset: tileType.baseOffset
                });
            }
        }
    }
    
    this.draw = function(startTileX, startTileY, endTileX, endTileY, startPosX, startPosY)
    {
        this.frameTicker = (this.frameTicker + 1) % 100;
        this.frame = (this.frame + !(this.frameTicker % 4) * 1) % 100;
        this.drawUndergrowth(this.undergrowth, this.tileWidth, this.tileHeight,
                             startTileX, startTileY, endTileX, endTileY, startPosX, startPosY);
        for(var i = 0; i < this.layers.length; ++i)
        {
            this.drawLayer(this.layers[i], this.width, this.height, this.tileWidth, this.tileHeight,
                           startTileX, startTileY, endTileX, endTileY, startPosX, startPosY);
        }
    }
}