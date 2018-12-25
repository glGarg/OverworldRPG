// global tile width and height :(
function ImageAsset(filename)
{
    this.image = new Image();
    this.image.src = filename;
    // check if loaded
}

function Sprite(filename, spritesAlongWidth, spritesAlongHeight)
{
    ImageAsset.call(this, filename);
    this.spritesAlongWidth = spritesAlongWidth;
    this.spritesAlongHeight = spritesAlongHeight;
}

Sprite.prototype = Object.create(ImageAsset.prototype);
Sprite.prototype.constructor = ImageAsset;
Sprite.prototype.draw = function(x, y, width, height)
{
    Context.context.drawImage(this.image, x, y, width, height);
}

Sprite.prototype.drawIndexedSprite = function(x, y, width, height, i)
{
    var spriteWidth = this.image.width / this.spritesAlongWidth;
    var spriteHeight = this.image.height / this.spritesAlongHeight;
    sxsy = itoxy(i, this.spritesAlongWidth, this.spritesAlongHeight);
    Context.context.drawImage(this.image, spriteWidth * sxsy[0], spriteHeight * sxsy[1], spriteWidth, spriteHeight, x, y, width, height);
}

function TileSet(filename)
{
    ImageAsset.call(this, filename);
}

TileSet.prototype = Object.create(ImageAsset.prototype);
TileSet.prototype.constructor = ImageAsset;
TileSet.prototype.drawTileWithCoords = function(tileSetPosX, tileSetPosY, tileSetWidth, tileSetHeight, x, y, width, height)
{
    Context.context.drawImage(this.image, tileSetPosX, tileSetPosY, tileSetWidth, tileSetHeight, x, y, width, height);
}