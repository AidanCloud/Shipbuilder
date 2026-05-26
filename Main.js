import Render from "./Rendering.js";
import Building from "./Building.js";

class Main {

    constructor() {

        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.render = new Render(document, this.ctx, this.canvas, window.screen.height, window.screen.width);

        this.keys = {};
        this.keyBinds();
        this.buildMode = true;
        this.previousO = false;
        this.previousB = false;

        this.blockSize = window.screen.height/10;
        this.xOffset = (window.screen.width - window.screen.height)/2;

        this.mouseX;
        this.mouseY;
        this.mouseRow;
        this.mouseColumn;
        
        this.loop = this.loop.bind(this);

    }

    keyBinds() {
        window.addEventListener('keydown', e => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', e => {
            this.keys[e.key.toLowerCase()] = false;
        });

        document.addEventListener('mousemove', (event) => {
            // const rect = this.canvas.getBoundingClientRect();

            // const canvasX = event.clientX - rect.left;
            // const canvasY = event.clientY - rect.top;

            // /*const scaleX = worldWidth / rect.width;
            // const scaleY = worldHeight / rect.height;

            // this.mouseX = canvasX * scaleX;
            // this.mouseY = canvasY * scaleY;*/

            // this.mouseX = canvasX - this.canvas.width/2;//(canvasX - this.render.offsetX) / this.render.scale + this.render.camera.x;
            // this.mouseY = canvasY - this.canvas.height/2;//(canvasY - this.render.offsetY) / this.render.scale + this.render.camera.y;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            this.mouseColumn = Math.floor(this.mouseX/this.blockSize) - Math.floor(this.xOffset/this.blockSize) - 1;
            this.mouseRow = Math.floor(this.mouseY/this.blockSize); 
            this.mouseColumn = Math.min(9, Math.max(0, this.mouseColumn));
            this.mouseRow = Math.min(9, Math.max(0, this.mouseRow));

        });

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });


        document.addEventListener('mousedown', (event) => {
            event.preventDefault();
            switch (event.button) {
                case 0: this.leftClick = true; break;
                case 2: this.rightClick = true; break;
            }
        });

        document.addEventListener('mouseup', (event) => {
            event.preventDefault();
            switch (event.button) {
                case 0: this.leftClick = false; break;
                case 2: this.rightClick = false; break;
            }
        });
    }

    handleGraphics() {
        this.render.Update(this.mouseRow, this.mouseColumn);

        for (var row = 0; row < Building.areaMatrix.length; row++) {
            for (var column = 0; column < Building.areaMatrix[row].length; column++) {
                switch (Building.areaMatrix[row][column]) {

                    case 0: if(this.buildMode) this.render.Empty(column, row); break;
                    case 1: this.render.Wall(column, row); break;
                    case 2: this.render.Floor(column, row); break;
                    case 3: this.render.BasicThruster(column, row); break;

                }
            }
        }
    }

    handleFullscreenRequests() {
        if (this.keys["o"] && !this.previousO) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { // Safari
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { // IE/Edge
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) { // Firefox
                    elem.mozRequestFullScreen();
                }
            }
        } 
        this.previousO = this.keys["o"];
    }

    modeSwitch() {
        if (this.keys["b"] && !this.previousB) {
            this.buildMode = !this.buildMode;
            console.log("Build Mode:" + this.buildMode);
        }
        this.previousB = this.keys["b"];
    }

    loop() {
        this.handleGraphics();
        this.handleFullscreenRequests();
        this.modeSwitch();

        if (this.buildMode) {
            Building.Update(this.mouseRow, this.mouseColumn, this.leftClick, this.rightClick, this.keys);
        }
        

        requestAnimationFrame(this.loop);
    }

}

new Main().loop();