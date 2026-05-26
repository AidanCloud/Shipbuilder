export default class Building {

    static areaMatrix = [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], 
        [0, 0, 0, 1, 2, 2, 1, 0, 0, 0], 
        [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
        [0, 0, 1, 2, 2, 2, 2, 1, 0, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 0, 3, 1, 1, 1, 1, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    static mouseRow;
    static mouseColumn;
    static mouseClick;
    static keys;

    static selectedBlockType = 0;

    static Update(mouseRow, mouseColumn, leftClick, rightClick, keys) {
        this.mouseRow = mouseRow;
        this.mouseColumn = mouseColumn;
        this.leftClick = leftClick;
        this.rightClick = rightClick;
        this.keys = keys;

        for (var i = 1; i <= 3; i++) {
            if (this.keys["" + i + ""]) {
                this.selectedBlockType = i;
            }
        }

        if (this.leftClick) {
            this.areaMatrix[this.mouseRow][this.mouseColumn] = this.selectedBlockType;
        } else if (this.rightClick) {
            this.areaMatrix[this.mouseRow][this.mouseColumn] = 0;
        }

    }

}