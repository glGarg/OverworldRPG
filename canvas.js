var Html = function(canvasId, width, height)
{
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.context = null;
    if(canvasId != undefined)
    {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    }
}