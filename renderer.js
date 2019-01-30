// extra indirection needed to perform layered rendering
function Renderer(numDepths)
{
    this.layers = new Array(numDepths);
    for(var i = 0; i < numDepths; ++i)
    {
        this.layers[i] = new Array();
    }

    this.draw = function(asset, drawParams)
    {
        this.layers[drawParams.depth].push({
            image: asset,
            params: drawParams
        });
    }

    this.render = function()
    {
        for(var i = 0; i < this.layers.length; ++i)
        {
            this.layers[i].sort(function(tileA, tileB)
            {
                // compare the base offset and y positions
                var tileABottom = tileA.params.y + tileA.params.height;
                var tileBBottom = tileB.params.y + tileB.params.height;
                if(tileABottom > tileBBottom)
                {
                    return 1;
                }
                else if(tileBBottom > tileABottom)
                {
                    return -1;
                }
                else if(tileA.params.baseOffset > tileB.params.baseOffset)
                {
                    // both tiles have the same bottom edge
                    // we must compare where the map object they are a part of begins
                    return 1;
                }
                else if(tileB.params.baseOffset > tileA.params.baseOffset)
                {
                    return -1;
                }
                else
                {
                    // not sure if this will ever happen
                    return 0;
                }
            });

            for(var j = 0; j < this.layers[i].length; ++j)
            {
                var image = this.layers[i][j].image;
                var params = this.layers[i][j].params;
                if(image instanceof TileSet)
                {
                    image.drawTileWithCoords(params.tileSetPosX, params.tileSetPosY,
                                             params.tileSetWidth, params.tileSetHeight,
                                             params.x, params.y,
                                             params.width, params.height);
                }
                else
                {
                    image.drawIndexedSprite(params.x, params.y, params.width, params.height, params.index);
                }
            }

            this.layers[i] = []
        }
    }
}