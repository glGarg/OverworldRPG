var Context = null;
var mapWidthTiles = 40;
var mapHeightTiles = 40;
var characterHeight = 68;
var characterWidth = 68;
var baseTileWidth = 34;
var baseTileHeight = 34;
var renderer = new Renderer(3);
var map = new Map(mapWidthTiles, mapHeightTiles, baseTileWidth, baseTileHeight, "overworld/tileset/tileset.png",
                  undergrowth, [baseLayerDecor], renderer); // pass in the 2d map later
var monster1 = new Monster(140, 1230, 1, 3, 494, 70, characterWidth, characterHeight, map, renderer);
var monster2 = new Monster(290, 1000, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var monster3 = new Monster(350, 900, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var monster4 = new Monster(1220, 250, 1, 3, 495, 70, characterWidth, characterHeight, map, renderer);
var monster5 = new Monster(100, 1000, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var monster6 = new Monster(1040, 830, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var monster7 = new Monster(750, 1500, 1, 3, 495, 700, characterWidth, characterHeight, map, renderer);
var monster8 = new Monster(1420, 1230, 1, 3, 495, 700, characterWidth, characterHeight, map, renderer);
var monster9 = new Monster(1100, 1030, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var monster10 = new Monster(920, 1290, 1, 3, 494, 700, characterWidth, characterHeight, map, renderer);
var human = null;
var viewport = null;
var time = 0;
var prevFrameTime = null;
var fps = 30;

$(document).ready(function()
{
    Context = new Html("game", screen.width, screen.height);
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;
    viewport = new Viewport(canvas.width, canvas.height, mapWidthTiles * baseTileWidth, mapHeightTiles * baseTileHeight, baseTileWidth, baseTileHeight);
    prevFrameTime = Date.now();
    map = new Map(mapWidthTiles, mapHeightTiles, baseTileWidth, baseTileHeight, "overworld/tileset/tileset.png",
                  undergrowth, [baseLayerDecor, overheadLayerDecor], renderer);
    human = new Human(1000, 700, 1, 3, 4, 100, characterWidth, characterHeight, map, renderer);
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
        monster7.update(time);
        monster8.update(time);
        monster9.update(time);
        monster10.update(time);
        viewport.update(human.posX, human.posY);

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
        monster7.drawAt(monster7.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster7.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster8.drawAt(monster8.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster8.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster9.drawAt(monster9.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster9.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        monster10.drawAt(monster10.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                        monster10.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        human.drawAt(human.posX - viewport.startTileX * viewport.tileWidth + viewport.startOffsetX,
                    human.posY - viewport.startTileY * viewport.tileHeight + viewport.startOffsetY);
        map.draw(viewport.startTileX, viewport.startTileY,
                 viewport.endTileX, viewport.endTileY,
                 viewport.startOffsetX, viewport.startOffsetY);

        renderer.render();
    }
}
