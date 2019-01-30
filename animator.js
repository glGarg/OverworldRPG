// TODO: add all this to character module instead
function Animator(drawDelay, frameCount, sprites, spritesheet, renderer)
{
    this.drawDelayCount = 0;
    this.drawDelay = drawDelay;
    this.frame = 0;
    this.frameCount = frameCount;
    this.sprites = sprites;
    this.spritesheet = spritesheet;
    this.renderer = renderer;

    this.draw = function(x, y, depth, width, height, baseOffset, sequence)
    {
        if(this.drawDelayCount++ == this.drawDelay)
        {
            this.frame = (this.frame + 1) % this.frameCount;
            this.drawDelayCount = 0;
        }

        this.renderer.draw(
            this.sprites[sequence[this.frame]], {
                x: x,
                y: y,
                depth: depth,
                width: width,
                height: height,
                baseOffset: baseOffset,
                index: 0
            });
        //this.sprites[sequence[this.frame]].draw(x, y, width, height);
    }

    this.drawFromSpritesheet = function(x, y, depth, width, height, baseOffset, sequence)
    {
        if(this.drawDelayCount++ == this.drawDelay)
        {
            this.frame = (this.frame + 1) % this.frameCount;
            this.drawDelayCount = 0;
        }

        this.renderer.draw(
            this.spritesheet, {
                x: x,
                y: y,
                depth: depth,
                width: width,
                height: height,
                baseOffset: baseOffset,
                index: sequence[this.frame]
            });
        //this.spritesheet.drawIndexedSprite(x, y, width, height, sequence[this.frame]);
    }
}