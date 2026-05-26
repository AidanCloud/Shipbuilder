import Values from "./Values.js";

export default class Flying {

    static numThrusters = 0;

    static initialize() {
        for (var row = 0; row < Values.areaMatrix.length; row++) {
            for (var column = 0; column < Values.areaMatrix[row].length; column++) {
                if (Values.areaMatrix[row][column] == 3) {
                    this.numThrusters++;
                }
            }
        }
    }

    static loop() {
        var motorAccelMPS = 6;
        if (Values.keys["w"]) {
            Values.velocity += motorAccelMPS * this.numThrusters * Values.deltaTime;
        }
        Values.y += Math.sin(Values.angle * (Math.PI/180)) * Values.velocity * Values.deltaTime;
        Values.x += Math.cos(Values.angle * (Math.PI/180)) * Values.velocity * Values.deltaTime;
    }

}