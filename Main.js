import Render from "./Rendering.js";
import Building from "./Building.js";
import Flying from "./Flying.js";
import Values from "./Values.js";

class Main {

    constructor() {

        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        Render.initialize(document, this.ctx, this.canvas);

        this.keyBinds();
        this.buildMode = true;
        this.previousO = false;
        this.previousB = false;
        
        this.loop = this.loop.bind(this);

    }

    keyBinds() {
        window.addEventListener('keydown', e => {
            Values.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', e => {
            Values.keys[e.key.toLowerCase()] = false;
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
            Values.mouseX = event.clientX;
            Values.mouseY = event.clientY;

            Values.mouseColumn = Math.floor(Values.mouseX/Values.blockSize - Values.xOffset/Values.blockSize);
            Values.mouseRow = Math.floor(Values.mouseY/Values.blockSize); 
            Values.mouseColumn = Math.min(9, Math.max(0, Values.mouseColumn));
            Values.mouseRow = Math.min(9, Math.max(0, Values.mouseRow));

        });

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        document.addEventListener('mousedown', (event) => {
            event.preventDefault();
            switch (event.button) {
                case 0: Values.leftClick = true; break;
                case 2: Values.rightClick = true; break;
            }
        });

        document.addEventListener('mouseup', (event) => {
            event.preventDefault();
            switch (event.button) {
                case 0: Values.leftClick = false; break;
                case 2: Values.rightClick = false; break;
            }
        });
    }

    handleFullscreenRequests() {
        if (Values.keys["o"] && !this.previousO) {
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
        this.previousO = Values.keys["o"];
    }

    modeSwitch() {
        if (Values.keys["b"] && !this.previousB) {
            this.buildMode = !this.buildMode;
            console.log("Build Mode:" + this.buildMode);
            Flying.initialize();
        }
        this.previousB = Values.keys["b"];
    }

    loop(currentTime) {
        this.handleFullscreenRequests();
        this.modeSwitch();

        if (this.buildMode) {
            Building.loop();
        } else {
            Flying.loop();
        }

        Render.loop(this.buildMode);

        Values.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        requestAnimationFrame(this.loop);
        
    }

}

new Main().loop();