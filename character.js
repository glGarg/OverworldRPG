var dirChangeTimeout = 2000; // ms
var HumanSprites = {};
var MonsterSprites = {};
function getMonsterSprites(id, isSpecial)
{
    // bound check id
    if(!MonsterSprites.hasOwnProperty(`${id}`))
    {
        specialPath = '';
        if(isSpecial)
        {
            specialPath = 'special/';
        }

        MonsterSprites[`${id}`] = [new Sprite(`overworld/${specialPath}right/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}right/frame2/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}up/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}up/frame2/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}left/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}left/frame2/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}down/${id}.png`, 1, 1),
                                   new Sprite(`overworld/${specialPath}down/frame2/${id}.png`, 1, 1)];
    }
    else
    {
        console.log(`character ${id} already loaded.`);
    }

    return MonsterSprites[`${id}`];
}

function getSpecialSprites()
{
    // bound check id
    if(!MonsterSprites.hasOwnProperty('special'))
    {
        MonsterSprites[`special`] = new Sprite('overworld/tileset/special.png', 5, 1);
    }
    else
    {
        console.log(`special sprites already loaded.`);
    }

    return MonsterSprites['special'];
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

function Character(x, y, z, direction, invSpeed, characterWidth, characterHeight, map)
{
    this.posX = x;
    this.posY = y;
    this.z = z;
    this.toPosX = x;
    this.toPosY = y;
    this.fromPosX = x;
    this.fromPosY = y;
    this.dirFacing = direction;
    this.stepSize = 6;
    this.characterWidth = characterWidth;
    this.characterHeight = characterHeight;

    this.timePerTile = invSpeed;
    this.movementDone = true;
    this.timeMoved = 0;

    this.animator = null;
    this.map = map;
    this.renderer = renderer;
}

Character.prototype.move = function(time)
{
    if(this.toPosX == this.fromPosX && this.toPosY == this.fromPosY)
    {
        return true;
    }

    // delay
    var tilesToBeCovered = Math.sqrt(Math.pow(this.toPosX - this.fromPosX, 2) + Math.pow(this.toPosY - this.fromPosY, 2)) / this.map.tileWidth;
    var timeNeeded = tilesToBeCovered * this.timePerTile;
    if((time - this.timeMoved) >= timeNeeded)
    {
        this.posX = this.fromPosX = this.toPosX;
        this.posY = this.fromPosY = this.toPosY;
        this.movementDone = true;
        return true;
    }
    else
    {
        var newPosX = this.fromPosX;
        var newPosY = this.fromPosY;
        if(this.toPosX != this.fromPosX)
        {
            var speedX = (this.toPosX - this.fromPosX) / timeNeeded * (time - this.timeMoved);
            newPosX += speedX;
        }

        if(this.toPosY != this.fromPosY)
        {
            var speedY = (this.toPosY - this.fromPosY) / timeNeeded * (time - this.timeMoved);
            newPosY += speedY;
        }

        // detect obstacles along the path
        if(!this.map.isWalkable(newPosX, newPosY))
        {
            // obstacle detected, stop moving
            this.fromPosX = this.toPosX = this.posX;
            this.fromPosY = this.toPosY = this.posY;
            this.movementDone = true;
            return true;
        }
        else
        {
            this.posX = newPosX;
            this.posY = newPosY;
        }

        return false;
    }
}

function Monster(x, y, z, direction, id, invSpeed, width, height, map, renderer)
{
    Character.call(this, x, y, z, direction, invSpeed, width, height, map);
    
    this.isSpecial = rand(0, 1) < 0.001
    this.id = id;
    this.sprites = getMonsterSprites(id, this.isSpecial);
    this.animator = new Animator(5, 2, this.sprites, null, renderer);
    if (this.isSpecial)
    {
        this.specialSprites = getSpecialSprites();
        this.specialAnimator = new Animator(10, 5, null, this.specialSprites, renderer);
    }

    this.angle = rand(0, 2 * Math.PI);

    var self = this;
    this.speed = 2.5;
    
    // random intervals of movement
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

Monster.prototype.update = function(time)
{
    if(this.move(time))
    {
        // assign new tilefrom and to
        this.toPosX = Number(this.toPosX + this.speed*Math.cos(this.angle)).toFixed(0) % Context.width;
        this.toPosY = Number(this.toPosY - this.speed*Math.sin(this.angle)).toFixed(0) % Context.height;

        // don't move if within two steps of a wall
        // may need to make them specific to each direction later to make it look right
        var collisionThresholdX = this.stepSize * 2 * Math.sign(this.toPosX - this.fromPosX) + 30;
        var collisionThresholdY = this.stepSize * 2 * Math.sign(this.toPosY - this.fromPosY) + 60;
        if(this.map.isWalkable(collisionThresholdX + this.toPosX, collisionThresholdY + this.toPosY))
        {
            this.movementDone = false;
            this.timeMoved = time;
        }
        else
        {
            this.toPosX = this.fromPosX;
            this.toPosY = this.fromPosY;
        }
    }
}

Monster.prototype.drawAt = function(screenX, screenY)
{
    this.animator.draw(screenX, screenY, this.z, this.characterWidth, this.characterHeight, 0, [this.dirFacing * 2, this.dirFacing * 2 + 1]);
    if (this.isSpecial)
    {
        var spritesAlongWidth = 5;
        var sequence = new Array();
        for(var i = 0; i < spritesAlongWidth; ++i)
        {
            sequence.push(i);
        }

        this.specialAnimator.drawFromSpritesheet(screenX, screenY, this.z, this.characterWidth, this.characterHeight, 1, sequence);
    }
}

function Human(x, y, z, direction, id, speed, width, height, map, renderer)
{
    Character.call(this, x, y, z, direction, speed, width, height, map);
    this.id = id;
    this.spriteSheet = getHumanSprites(id);
    this.animator = new Animator(5, 4, null, this.spriteSheet, renderer)
    this.dirToSpriteSheetRow = [2, 3, 1, 0];
    this.controller = new KeyboardController();
}

Human.prototype = Object.create(Character.prototype);
Human.prototype.constructor = Human;
Human.prototype.update = function(time)
{
    if(this.move(time))
    {
        // check for new movement
        if(!this.controller.anyKeyPressed())
        {
            return;
        }

        if(this.controller.getKeyPressed.up)
        {
            this.dirFacing = 1;
            if(this.fromPosY <= this.stepSize)
            {
               return;
            }

            this.toPosY -= this.stepSize;
        }
        else if(this.controller.getKeyPressed.down)
        {
            this.dirFacing = 3;
            if(this.fromPosY >= this.map.height * this.map.tileheight - this.stepSize)
            {
                return;
            }

            this.toPosY += this.stepSize;
        }
        else if(this.controller.getKeyPressed.left)
        {
            this.dirFacing = 2;
            if(this.fromPosX <= this.stepSize)
            {
                return;
            }

            this.toPosX -= this.stepSize;
        }
        else if(this.controller.getKeyPressed.right)
        {
            this.dirFacing = 0;
            if(this.fromPosX >= this.map.width * this.map.tileWidth - this.stepSize)
            {
                return;
            }
            
            this.toPosX += this.stepSize;
        }

        // don't move if within two steps of a wall
        // may need to make them specific to each direction later to make it look right
        var collisionThresholdX = this.stepSize * Math.sign(this.toPosX - this.fromPosX);
        var collisionThresholdY = this.stepSize * Math.sign(this.toPosY - this.fromPosY);
        if(this.map.isWalkable(collisionThresholdX + this.toPosX, collisionThresholdY + this.toPosY))
        {
            this.movementDone = false;
            this.timeMoved = time;
        }
        else
        {
            this.toPosX = this.fromPosX;
            this.toPosY = this.fromPosY;
        }
    }
}

Human.prototype.drawAt = function(screenX, screenY)
{
    var spritesAlongWidth = 4;
    var spriteRow = this.dirToSpriteSheetRow[this.dirFacing];
    var sequence = new Array();
    for(var i = 0; i < spritesAlongWidth; ++i)
    {
        if(!this.movementDone)
        {
            sequence.push(spriteRow * spritesAlongWidth + i);
        }
        else
        {
            sequence.push(spriteRow * spritesAlongWidth);
        }
    }

    // center out the player sprite to its bottom edge
    this.animator.drawFromSpritesheet(screenX - this.characterWidth/2, screenY - this.characterHeight, this.z, this.characterWidth, this.characterHeight, 0, sequence);
}
