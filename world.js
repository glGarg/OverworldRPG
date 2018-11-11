var brick = new Sprite("overworld/tileset/brickRed.png");
var stone = new Sprite("overworld/tileset/stone.png");

function Map()
{
    this.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                  0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                  0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.draw = function()
    {
        for(var x = 0; x < 10; ++x)
        {
            for(var y = 0; y < 10; ++y)
            {
                if(this.tiles[xytoi(x, y, 10)] == 0)
                {
                    stone.draw(x * 50, y * 50, 50, 50);
                }
                else
                {
                    brick.draw(x * 50, y * 50, 50, 50);
                }
            }
        }
    }
}