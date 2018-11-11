// global tile width and height
var tileHeight = 50;
var tileWidth = 50;

function Sprite(filename, spritesAlongWidth, spritesAlongHeight)
{
    if(spritesAlongWidth != undefined || spritesAlongHeight != undefined)
    {
        this.spritesAlongWidth = spritesAlongWidth;
        this.spritesAlongHeight = spritesAlongHeight;
    }
    else
    {
        this.spritesAlongWidth = 1;
        this.spritesAlongHeight = 1;
    }

    this.image = null;
    this.load = function(filename)
    {
        this.image = new Image();
        this.image.src = filename;
    }

    this.load(filename);
    this.draw = function(x, y)
    {
        Context.context.drawImage(this.image, x, y, tileWidth, tileHeight);
    }

    this.drawIndexedSprite = function(x, y, i)
    {
        var spriteWidth = this.image.width / spritesAlongWidth;
        var spriteHeight = this.image.height / spritesAlongHeight;
        sxsy = itoxy(i, spritesAlongWidth, spritesAlongHeight);
        Context.context.drawImage(this.image, spriteWidth * sxsy[0], spriteHeight * sxsy[1], spriteWidth, spriteHeight, x, y, tileWidth, tileHeight);
    }
}
