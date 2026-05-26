import Values from "./Values.js";

export default class Building {

    static selectedBlockType = 1;

    static loop() {

        for (var i = 1; i <= 3; i++) {
            if (Values.keys["" + i + ""]) {
                this.selectedBlockType = i;
            }
        }

        if (Values.leftClick) {
            Values.areaMatrix[Values.mouseRow][Values.mouseColumn] = this.selectedBlockType;
        } else if (Values.rightClick) {
            Values.areaMatrix[Values.mouseRow][Values.mouseColumn] = 0;
        }

    }

}