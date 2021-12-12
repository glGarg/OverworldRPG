// TODO: investigate procedural map generation algorithms
var tileType =
{
    obstacle : 0,
    walkable : 1,
};

// TODO: add tileset coords and new tile types
//       animate by adding frame tuples
//       add events for special tiles such as doors, map exits
function TileType(mat, isObstacle, frames, x, y, width, height)
{
    this.mat = mat;
    this.isO
}

var tileTypes =
{
    1: { 
            mat: "stone",
            type: tileType.obstacle,
            frames: 1,
            x: 1215, y: 639, z: 1,
            baseOffset: 0,
            width: 97, height: 97
    },
    2: {
            mat: "grass",
            type: tileType.walkable,
            frames: 1,
            x: 32, y: 0, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    3: {
            mat: "land",
            type: tileType.walkable,
            frames: 1,
            x: 320, y: 0, z: 0,
            baseOffset: 0,
            width: 64, height: 64
    },
    4: {
            mat: "stone",
            type: tileType.obstacle,
            frames: 1,
            x: 1133, y: 11, z: 1,
            baseOffset: 0,
            width: 69, height: 69
    },
    5: {
            mat: "water",
            type: tileType.obstacle,
            frames: 15,
            x: 160, y: 1728, z: 0,
            baseOffset: 0,
            width: 32,  height: 32
    },
    6: {
            mat: "air",
            type: tileType.walkable,
            frames: 1,
            x: NaN, y: NaN, z: NaN,
            baseOffset: 0,
            width: NaN, height: NaN
    },
    7: {
            mat: "shrub",
            type: tileType.obstacle,
            frames: 1,
            x: 704, y: 160, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    8: {
            mat: "pavement",
            type: tileType.walkable,
            frames: 1,
            x: 1215, y: 0, z: 0,
            baseOffset: 0,
            width: 97, height: 97
    },
    9: {
            mat: "plant",
            type: tileType.walkable,
            frames: 1,
            x: 1055, y: 223, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    10: {
            mat: "purpleFlower",
            type: tileType.walkable,
            frames: 4,
            x: 640, y: 702, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    11: {
            mat: "moss",
            type: tileType.walkable,
            frames: 1,
            x: 0, y: 1056, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    12: {
            mat: "coniferousTreeTop",
            type: tileType.walkable,
            frames: 1,
            x: 735, y: 231, z: 2,
            baseOffset: 0,
            width: 32, height: 28,
    },
    13: {
            mat: "coniferousTreeBottom",
            type: tileType.obstacle,
            frames: 1,
            x: 735, y: 259, z: 1,
            baseOffset: 0,
            width: 32, height: 28
    },
    14: {
            mat: "regularTreeTopHalfLeft1",
            type: tileType.walkable,
            frames: 1,
            x: 639, y: 0, z: 2,
            baseOffset: 3,
            width: 32, height: 32
    },
    15: {
            mat: "regularTreeTopHalfLeft2",
            type: tileType.walkable,
            frames: 1,
            x: 639, y: 31, z: 2,
            baseOffset: 2,
            width: 32, height: 32
    },
    16: {
            mat: "regularTreeTopHalfRight1",
            type: tileType.walkable,
            frames: 1,
            x: 671, y: 0, z: 2,
            baseOffset: 3,
            width: 32, height: 32
    },
    17: {
            mat: "regularTreeTopHalfRight2",
            type: tileType.walkable,
            frames: 1,
            x: 671, y: 32, z: 2,
            baseOffset: 2,
            width: 32, height: 32
    },
    18: {
            mat: "regularTreeBottomHalfLeft1",
            type: tileType.obstacle,
            frames: 1,
            x: 639, y: 64, z: 1, // not sure what z this should be
            baseOffset: 1,
            width: 32, height: 32
    },
    19: {
            mat: "regularTreeBottomHalfLeft2",
            type: tileType.obstacle,
            frames: 1,
            x: 639, y: 96, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    20: {
            mat: "regularTreeBottomHalfRight1",
            type: tileType.obstacle,
            frames: 1,
            x: 671, y: 64, z: 1,
            baseOffset: 1,
            width: 32, height: 32
    },
    21: {
            mat: "regularTreeBottomHalfRight2",
            type: tileType.obstacle,
            frames: 1,
            x: 671, y: 96, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    22: {
            mat: "yellowFlower",
            type: tileType.walkable,
            frames: 4,
            x: 640, y: 638, z: 0,
            baseOffset: 0,
            width: 32, height: 32
    },
    23: {
            mat: "rectangularPuddle",
            type: tileType.walkable,
            frames: 4,
            x: 1088, y: 1633, z: 0,
            baseOffset: 0,
            width: 96, height: 96
    },
};

function Container(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    this.centerX = Math.floor(this.x + this.width / 2);
    this.centerY = Math.floor(this.y + this.height / 2);
}

function ProtoMap(width, height)
{
    this.width = width;
    this.height = height;
    this.map = new Array(width * height).fill(0);
    this.rooms = [];
}

ProtoMap.prototype.createRoom = function(room)
{
    this.rooms.push(room);
    for(var j = room.x; j < room.x + room.width; ++j)
    {
        for(var i = room.y; i < room.y + room.height; ++i)
        {
            this.map[xytoi(i, j, this.width)] = 1;
        }
    }
}

ProtoMap.prototype.createPath = function(startX, startY, endX, endY)
{
    for(var j = startY; j < endY + 1; ++j)
    {
        for(var i = startX; i < endX + 1; ++i)
        {
            this.map[xytoi(i, j, this.width)] = 1;
        }
    }
}

ProtoMap.prototype.getMap = function(room)
{
    return this.map;
}

ProtoMap.prototype.printMap = function()
{
    console.log(this.map);
}

function ContainerTree(container, depth, widthRatio, heightRatio, attempts, map)
{
    this.container = container;
    this.depth = depth;
    this.widthRatio = widthRatio;
    this.heightRatio = heightRatio;
    this.attempts = attempts;
    if(map == undefined)
    {
        this.map = new ProtoMap(this.container.width, this.container.height);
    }
    else
    {
        this.map = map;
    }

    this.left = null;
    this.right = null;
    this.divide = function(attempts)
    {
        if(attempts == 0)
        {
            return
        }

        if(randint(0, 1) == 1)
        {
            // horizontal split
            var widthLeft = randint(1, this.container.width);
            var widthRight = this.container.width - widthLeft;
            if(widthLeft / this.container.height < this.widthRatio ||
               widthRight / this.container.height < this.widthRatio)
            {
                this.divide(attempts - 1);    
            }
            else
            {
                this.left = new ContainerTree(new Container(this.container.x, this.container.y, widthLeft, this.container.height), this.depth - 1, this.widthRatio, this.heightRatio, this.attempts, this.map);
                this.right = new ContainerTree(new Container(this.container.x + widthLeft, this.container.y, widthRight, this.container.height), this.depth - 1, this.widthRatio, this.heightRatio, this.attempts, this.map);
            }
        }
        else
        {
            var heightUp = randint(1, this.container.height);
            var heightDown = this.container.height - heightUp;
            if(heightUp / this.container.width < this.heightRatio ||
               heightDown / this.container.width < this.heightRatio)
            {
                this.divide(attempts - 1);
            }
            else
            {
                this.left = new ContainerTree(new Container(this.container.x, this.container.y, this.container.width, heightUp), this.depth - 1, this.widthRatio, this.heightRatio, this.attempts, this.map);
                this.right = new ContainerTree(new Container(this.container.x, this.container.y + heightUp, this.container.width, heightDown), this.depth - 1, this.widthRatio, this.heightRatio, this.attempts, this.map);
            }
        }
    }

    if(this.depth > 1)
    {
        this.divide(attempts);
    }
}

ContainerTree.prototype.getLeafContainers = function(leafs)
{
    if(this.left == null && this.right == null)
    {
        leafs.push(this.container);
    }
    else
    {
        if(this.left != null)
        {
            this.left.getLeafContainers(leafs);
        }

        if(this.right != null)
        {
            this.right.getLeafContainers(leafs);
        }
    }
}

ContainerTree.prototype.createRooms = function()
{
    leafContainers = new Array();
    this.getLeafContainers(leafContainers);
    for(var i = 0; i < leafContainers.length; ++i)
    {
        x = this.container.x + randint(0, Math.floor(this.container.width / 4));
        y = this.container.y + randint(0, Math.floor(this.container.height / 4));
        width = this.container.width - (x - this.container.x) - randint(0, Math.floor(this.container.width / 4));
        height = this.container.height - (y - this.container.y) - randint(0, Math.floor(this.container.height / 4));
        this.map.createRoom(new Container(x, y, width, height));
    }
}

ContainerTree.prototype.createPaths = function()
{
    if(this.left)
    {
        this.left.createPaths(); 
    }

    if(this.right)
    {
        this.right.createPaths();    
    }

    if(this.left && this.right)
    {
        this.map.createPath(this.left.container.centerX, this.left.container.centerY,
                            this.right.container.centerX, this.right.container.centerY);
    }
}

ContainerTree.prototype.createMap = function()
{
    this.createRooms();
    this.createPaths();
}

var undergrowth = 2;
// TODO: pass sample maps in from game

var baseLayerDecor = [
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 14, 16,
    15, 17, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 6, 6, 6, 6, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 6, 6, 6, 6, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 6, 6, 6, 6, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 6, 6, 6, 6, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17,
    6, 6, 22, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 22, 6, 6, 6, 6, 6, 18, 20,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 22, 6, 6, 6, 6, 6, 6, 6, 6, 22, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 6, 6, 6, 6, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 6, 6, 6, 6, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 6, 6, 6, 6, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 6, 6, 6, 6, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 22, 6, 6, 14, 16, 6, 6, 6, 6, 14, 16, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    18, 20, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 22, 6, 6, 6, 6,
    19, 21, 6, 6, 6, 22, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
];

var overheadLayerDecor = [
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 6, 6, 6, 6, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 6, 6, 6, 6, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 6, 6, 6, 6, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 6, 6, 6, 6, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 6, 6, 6, 6, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 6, 6, 6, 6, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 6, 6, 6, 6, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 6, 6, 6, 6, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 18, 20, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 21, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21,
    14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 14, 16, 6, 6,
    15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 15, 17, 6, 6,
    18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 18, 20, 6, 6,
    19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 19, 21, 6, 6
];
