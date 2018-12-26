var Context = null;
var mapWidthTiles = 20;
var mapHeightTiles = 20;
var characterHeight = 100;
var characterWidth = 100
var baseTileWidth = 68;
var baseTileHeight = 68;
var map = new Map(mapWidthTiles, mapHeightTiles, baseTileWidth, baseTileHeight, "overworld/tileset/tileset.png"); // pass in the 2d map later
var monster1 = new Monster(140, 200, 3, 12, 70, characterWidth, characterHeight, map);
var monster2 = new Monster(290, 890, 3, 333, 700, characterWidth, characterHeight, map);
var monster3 = new Monster(850, 1000, 3, 386, 700, characterWidth, characterHeight, map);
var monster4 = new Monster(220, 250, 3, 252, 70, characterWidth, characterHeight, map);
var monster5 = new Monster(100, 980, 3, 152, 700, characterWidth, characterHeight, map);
var monster6 = new Monster(800, 230, 3, 1, 700, characterWidth, characterHeight, map);
var human = new Human(100, 700, 3, 3, 200, characterWidth, characterHeight, map);
var viewport = null;
var time = 0;
var prevFrameTime = null;
var fps = 55;

$(document).ready(function()
{
    //Context = new Html('game', $(window).width(), $(window).height());
    Context = new Html('game', screen.width, screen.height);
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;
    viewport = new Viewport(canvas.width, canvas.height, mapWidthTiles * baseTileWidth, mapHeightTiles * baseTileHeight, baseTileWidth, baseTileHeight);
    prevFrameTime = Date.now();
    draw();
});

$(window).resize(function()
{
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;
    viewport.screenWidth = canvas.width;
    viewport.screenHeight = canvas.height;
});

function draw()
{
    if(null == Context || null == viewport)
    {
        return;
    }

    requestAnimationFrame(draw);
    var curTime = Date.now();
    var elapsed = curTime - prevFrameTime;
    var time = Math.floor(curTime);

    if(elapsed > (1000 / fps))
    {
        prevFrameTime = curTime - (elapsed % (1 / fps))
        Context.context.fillStyle = "#000000";
        human.update(time);
        monster1.update(time);
        monster2.update(time);
        monster3.update(time);
        monster4.update(time);
        monster5.update(time);
        monster6.update(time);
        viewport.update(human.posX, human.posY);
        map.update();
        map.drawFloor(viewport.startTileX, viewport.startTileY,
            viewport.endTileX, viewport.endTileY,
            viewport.startOffsetX, viewport.startOffsetY);
        map.drawBottomLayer(viewport.startTileX, viewport.startTileY,
                 viewport.endTileX, viewport.endTileY,
                 viewport.startOffsetX, viewport.startOffsetY);
        monster1.drawAt(monster1.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster1.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster2.drawAt(monster2.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster2.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster3.drawAt(monster3.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster3.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster4.drawAt(monster4.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster4.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster5.drawAt(monster5.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster5.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster6.drawAt(monster6.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster6.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        console.log(human.posX, human.posY);
        human.drawAt(human.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                    human.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        map.drawTopLayer(viewport.startTileX, viewport.startTileY,
            viewport.endTileX, viewport.endTileY,
            viewport.startOffsetX, viewport.startOffsetY);
    }
}