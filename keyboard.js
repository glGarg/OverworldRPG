var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

function KeyboardController()
{
    var keyPressed =
    {
        up : false,
        down : false,
        left : false,
        right : false
    };

    var toggleKey = function(keyCode, value)
    {
        switch(keyCode)
        {
            case KEY_UP:
                keyPressed.up = value;
                break;
            case KEY_DOWN:
                keyPressed.down = value;
                break;
            case KEY_LEFT:
                keyPressed.left = value;
                break;
            case KEY_RIGHT:
                keyPressed.right = value;
                break;
            default:
                break;
        }
    }

    $(document).ready(function()
    {
        $(document).keydown(function(e)
        {
            toggleKey(e.keyCode, true);
        });
    });

    $(document).ready(function()
    {
        $(document).keyup(function(e)
        {
            toggleKey(e.keyCode, false);
        });
    });

    this.getKeyPressed = keyPressed;
    this.anyKeyPressed = function()
    {
        return keyPressed.up || keyPressed.down ||
               keyPressed.left || keyPressed.right;
    }
};