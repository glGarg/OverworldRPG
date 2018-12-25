function Animator(drawDelay, frameCount, sprites, spritesheet)
{
    this.drawDelayCount = 0;
    this.drawDelay = drawDelay;
    this.frame = 0;
    this.frameCount = frameCount;
    this.sprites = sprites;
    this.spritesheet = spritesheet;

    this.draw = function(x, y, width, height, sequence)
    {
        if(this.drawDelayCount++ == this.drawDelay)
        {
            this.frame = (this.frame + 1) % this.frameCount;
            this.drawDelayCount = 0;
        }

        this.sprites[sequence[this.frame]].draw(x, y, width, height);
    }

    this.drawFromSpritesheet = function(x, y, width, height, sequence)
    {
        if(this.drawDelayCount++ == this.drawDelay)
        {
            this.frame = (this.frame + 1) % this.frameCount;
            this.drawDelayCount = 0;
        }

        this.spritesheet.drawIndexedSprite(x, y, width, height, sequence[this.frame]);
    }
}