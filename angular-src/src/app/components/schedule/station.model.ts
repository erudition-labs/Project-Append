export class Station {
     name: string;
     private controllerColor: string;
     controller: number;
     private offSetTime: number;
     timer: Number;
     offset: Number;

    constructor(name: string, color: string, controller: number) {
        this.name = name;
        this.controllerColor = color;
        this.controller = controller;
        this.timer = 0;
    }

    getName() {
        return this.name;
    }

    getoffSetTime(){
        return this.offSetTime;
    }

    getControllerColor() {
        return this.controllerColor;
    }
    
    getController() {
        return this.controller;
    }

    setTimer(time : Number){
        this.timer = time;
    }

    getTimer(){
        return this.timer;
    }

}
