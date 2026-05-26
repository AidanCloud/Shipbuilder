export default class Values {

    static deltaTime;

    static areaMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    static mouseX;
    static mouseY;
    static mouseRow;
    static mouseColumn;
    static leftClick;
    static rightClick;

    static keys = {};

    static worldSize = 1000 * window.innerHeight;

    static velocity = 0;
    static x = 0;
    static y = 0;
    static angle = 90;

    static blockSize = window.innerHeight/10;
    static xOffset = (window.innerWidth - window.innerHeight)/2;


}