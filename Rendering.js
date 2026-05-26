import Values from "./Values.js";

export default class Render {

    static initialize(document, ctx, canvas) {
        
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale;
        this.offsetX;
        this.offsetY;
        this.document = document;

    }

    static reset() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    static loop(buildMode) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);

        for (var row = 0; row < Values.areaMatrix.length; row++) {
            for (var column = 0; column < Values.areaMatrix[row].length; column++) {
                switch (Values.areaMatrix[row][column]) {

                    case 0: if(buildMode) this.Empty(column, row); break;
                    case 1: this.Wall(column, row); break;
                    case 2: this.Floor(column, row); break;
                    case 3: this.BasicThruster(column, row); break;

                }
            }
        }        
    }

    static Empty(column, row) {
        var x = Values.blockSize * column + Values.xOffset;
        var y = Values.blockSize * row;
        this.ctx.beginPath();
        this.ctx.rect(x, y, Values.blockSize, Values.blockSize);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "white";
        if (Values.mouseColumn == column && Values.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    static Wall(column, row) {
        var x = Values.blockSize * column + Values.xOffset;
        var y = Values.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(75, 74, 74)"
        this.ctx.fillRect(x, y, Values.blockSize, Values.blockSize);
        this.ctx.rect(x, y, Values.blockSize, Values.blockSize);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(45, 45, 45)";
        if (Values.mouseColumn == column && Values.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    static Floor(column, row) {
        var x = Values.blockSize * column + Values.xOffset;
        var y = Values.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(195, 195, 195)"
        this.ctx.fillRect(x, y, Values.blockSize, Values.blockSize);
        this.ctx.rect(x, y, Values.blockSize, Values.blockSize);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(136, 136, 136)";
        if (Values.mouseColumn == column && Values.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }

    static BasicThruster(column, row) {
        var x = Values.blockSize * column + Values.xOffset;
        var y = Values.blockSize * row;
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(75, 74, 74)"
        this.ctx.fillRect(x, y, Values.blockSize, Values.blockSize/2);
        this.ctx.arc(x + Values.blockSize/2, y + Values.blockSize, Values.blockSize/2, Math.PI, 0);
        this.ctx.fill();
        this.ctx.fill();
        this.ctx.rect(x, y, Values.blockSize, Values.blockSize/2);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(45, 45, 45)";
        if (Values.mouseColumn == column && Values.mouseRow == row) {
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
        }
        this.ctx.stroke();
    }


}
