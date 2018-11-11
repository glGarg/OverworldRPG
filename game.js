var Context = null;

var map = new Map();
var monster1 = new Monster(200, 200, 1, 345, 2);
var monster3 = new Monster(400, 200, 1, 1, 2);
var monster2 = new Monster(100, 300, 3, 2, 2);
var human = new Human(100, 200, 3, 3, 7);
$(document).ready(function()
{
    Context = new Html('game', $(window).width(), $(window).height());
});

setInterval(function()
{
    map.draw();
    monster1.draw();
    monster2.draw();
    monster3.draw();
    human.draw();
}, 50);