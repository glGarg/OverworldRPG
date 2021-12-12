function itoxy(i, width, height)
{
    var x = i % width;
    var y = Math.floor(i / width);
    return [x, y];
}

function xytoi(x, y, width)
{
    return y * width + x;
}

function rand(min, max)
{
    return Math.random() * (max - min) + min;
}

function randint(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}