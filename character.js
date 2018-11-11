var dirChangeTimeout = 1200; // ms
var HumanSprites = {};
var MonsterSprites = {};
function getMonsterSprites(id)
{
    // bound check id
    if(!MonsterSprites.hasOwnProperty(`${id}`))
    {
        MonsterSprites[`${id}`] = [new Sprite(`overworld/right/${id}.png`),
                                   new Sprite(`overworld/right/frame2/${id}.png`),
                                   new Sprite(`overworld/up/${id}.png`),
                                   new Sprite(`overworld/up/frame2/${id}.png`),
                                   new Sprite(`overworld/left/${id}.png`),
                                   new Sprite(`overworld/left/frame2/${id}.png`),
                                   new Sprite(`overworld/down/${id}.png`),
                                   new Sprite(`overworld/down/frame2/${id}.png`)];
    }
    else
    {
        console.log(`character ${id} already loaded.`);
    }

    return MonsterSprites[`${id}`]
}

function getHumanSprites(id)
{
    // bound check id
    if(!HumanSprites.hasOwnProperty(`${id}`))
    {
        HumanSprites[`${id}`] = new Sprite(`overworld/human/${id}.png`, 4, 4);
    }
    else
    {
        console.log(`character ${id} already loaded.`);
    }

    return HumanSprites[`${id}`];
}

function Character(x, y, direction, speed)
{
    this.x = x;
    this.y = y;
    this.moving = false;
    this.animator = null;
    this.direction = direction;
    this.speed = speed;
}

Character.prototype.updatePos = function()
{
    this.x = (this.x + this.speed*Math.cos(this.angle)) % Context.width;
    this.y = (this.y - this.speed*Math.sin(this.angle)) % Context.height;
}

function Monster(x, y, direction, id, speed)
{
    Character.call(this, x, y, direction, speed);
    
    this.id = id;
    this.sprites = getMonsterSprites(id);
    this.animator = new Animator(5, 2, this.sprites, null);
    
    this.angle = 3*Math.PI/2;
    var self = this;
    setInterval(function()
    {
        self.moving = !self.moving;
        if(self.moving)
        {
            self.chooseRandomDir();
        }
    }, randint(dirChangeTimeout, dirChangeTimeout + dirChangeTimeout / 4));
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;
Monster.prototype.chooseRandomDir = function()
{
    this.angle = rand(0, 2 * Math.PI);
    var piOverTwo = Math.PI / 2;
    var directionRoundedDown = Math.floor(this.angle / piOverTwo);
    var directionFixup = Math.round((this.angle % piOverTwo) / piOverTwo);
    this.direction = (directionFixup + directionRoundedDown) % 4;
}

Monster.prototype.draw = function()
{
    if(this.moving)
    {
        this.updatePos();
    }

    this.animator.draw(this.x, this.y, [this.direction * 2, this.direction * 2 + 1]);
}

function Human(x, y, direction, id, speed)
{
    Character.call(this, x, y, direction, speed);
    
    this.id = id;
    
    this.spriteSheet = getHumanSprites(id);
    this.animator = new Animator(5, 4, null, this.spriteSheet)
    
    this.dirToSpriteSheetRow = [2, 3, 1, 0];
    this.angle = 3*Math.PI/2;
    this.controller = new KeyboardController();
}

Human.prototype = Object.create(Character.prototype);
Human.prototype.constructor = Human;
Human.prototype.updateAngle = function()
{
    if(!this.controller.anyKeyPressed())
    {
        this.moving = false;
        return false;
    }

    if(this.controller.getKeyPressed.up)
    {
        this.direction = 1;
        this.angle = Math.PI / 2;
    }
    else if(this.controller.getKeyPressed.down)
    {
        this.direction = 3;
        this.angle = 3 * Math.PI / 2;
    }
    else if(this.controller.getKeyPressed.left)
    {
        this.direction = 2;
        this.angle = Math.PI;
    }
    else if(this.controller.getKeyPressed.right)
    {
        this.direction = 0;
        this.angle = 0;
    }

    this.moving = true;
    this.updatePos();
    return true;
}

Human.prototype.draw = function()
{
    this.updateAngle();
    var spritesAlongWidth = 4;
    var spriteRow = this.dirToSpriteSheetRow[this.direction];
    var sequence = new Array();
    for(var i = 0; i < spritesAlongWidth; ++i)
    {
        if(this.moving)
        {
            sequence.push(spriteRow * spritesAlongWidth + i);
        }
        else
        {
            sequence.push(spriteRow * spritesAlongWidth);
        }
    }
    
    this.animator.drawFromSpritesheet(this.x, this.y, sequence);
}
