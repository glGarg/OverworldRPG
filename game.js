var Context = null;
var mapWidthTiles = 20;
var mapHeightTiles = 20;
var baseTileWidth = 68;
var baseTileHeight = 68;
var map = new Map(mapWidthTiles, mapHeightTiles, baseTileWidth, baseTileHeight); // pass in the 2d map later
var monster1 = new Monster(200, 200, 1, 404, 70, baseTileWidth, baseTileHeight, map);
var monster3 = new Monster(400, 200, 1, 311, 700, baseTileWidth, baseTileHeight, map);
var monster2 = new Monster(100, 300, 3, 445, 700, baseTileWidth, baseTileHeight, map);
var human = new Human(100, 200, 3, 3, 200, baseTileWidth, baseTileHeight, map);
var viewport = null;
var time = 0;

$(document).ready(function()
{
    //Context = new Html('game', $(window).width(), $(window).height());
    Context = new Html('game', screen.width, screen.height);
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;
    viewport = new Viewport(canvas.width, canvas.height, mapWidthTiles * baseTileWidth, mapHeightTiles * baseTileHeight, baseTileWidth, baseTileHeight);
    requestAnimationFrame(draw);
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

    var curTime = Math.floor(Date.now());
    if(time != curTime)
    {
        time = curTime;
        // add frame count to slow frame rate
    }

    Context.context.fillStyle = "#000000";
    human.update(time);
    monster1.update(time);
    monster2.update(time);
    monster3.update(time);
    viewport.update(human.posX, human.posY);
    
    map.draw(viewport.startTileX, viewport.startTileY,
             viewport.endTileX, viewport.endTileY,
             viewport.startOffsetX, viewport.startOffsetY);
    monster1.drawAt(monster1.posX, monster1.posY);
    monster2.drawAt(monster2.posX, monster2.posY);
    monster3.drawAt(monster3.posX, monster3.posY);
    //console.log(human.posX, human.posY);
    human.drawAt(human.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                 human.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);

    requestAnimationFrame(draw);
}