export default class Render {

    constructor(document, ctx, canvas, windowHeight, windowWidth) {
        
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale;
        this.offsetX;
        this.offsetY;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.blockSize = windowHeight/10;
        this.xOffset = (window.screen.width - window.screen.height)/2;
        this.document = document;

        this.mouseColumn;
        this.mouseRow;

    }

    Update(mouseRow, mouseColumn) {

        this.mouseRow = mouseRow;
        this.mouseColumn = mouseColumn;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);

    }

    reset() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    Empty(column, row) {
        var x = this.blockSize * column + this.xOffset;
        var y = this.blockSize * row;
        this.ctx.beginPath();
        this.ctx.rect(x, y, this.blockSize, this.blockSize);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "white";
        if (this.mouseColumn == column && this.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    Wall(column, row) {
        var x = this.blockSize * column + this.xOffset;
        var y = this.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(75, 74, 74)"
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
        this.ctx.rect(x, y, this.blockSize, this.blockSize);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(45, 45, 45)";
        if (this.mouseColumn == column && this.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    Floor(column, row) {
        var x = this.blockSize * column + this.xOffset;
        var y = this.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(195, 195, 195)"
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
        this.ctx.rect(x, y, this.blockSize, this.blockSize);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(136, 136, 136)";
        if (this.mouseColumn == column && this.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    BasicThruster(column, row) {
        var x = this.blockSize * column + this.xOffset;
        var y = this.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(75, 74, 74)"
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize/2);
        this.ctx.arc(x + this.blockSize/2, y + this.blockSize, this.blockSize/2, Math.PI, 0);
        this.ctx.fill();
        this.ctx.fill();
        this.ctx.rect(x, y, this.blockSize, this.blockSize/2);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(45, 45, 45)";
        if (this.mouseColumn == column && this.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }


}
