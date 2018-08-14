/*  This model will need added variables for gps cordinates, # of controllers, schedule for zone, etc. 
    For now, this class will only have name of the zone and a small description that will be added for display purposes. 
*/
import { Station } from './station.model';

export class Zone {
    private name: string;
    private description: string;            //information about the zone
    private scheduleList: Station[];
    private controllerList: string[];       //not sure if needed
    private totalRunTime: number;           //how long the zone will run for
    private startTime: String;
    private cycle: string[];                //Actual values, Sun thru Sat 
    private cycleLength: number;            //1,2,4

    constructor(name: string, description: string ) {
        this.name = name;
        this.description = description;
    }

    setTotalRunTime(runTime: number) {
        this.totalRunTime = runTime;
    }

    setCycleSchedule(cycleLength: number, cycleDays: string[]) {
        this.cycleLength = cycleLength;     //weekly biweekly monthly (1,2,4)
        this.cycle = cycleDays;             //Saves actual days
    }

    getCycleSchedule(){
        return this.cycle;
    }

    getCycleScheduleLength(){
        return this.cycleLength;
    }

    setStartTime(hour: number, minute: number, timeOfDay: string) {
        this.startTime = hour+":"+minute+" "+timeOfDay;
    }

    setSchedule(schedule: Station[]) {
        this.scheduleList = schedule;
    }

    getSchedule() {
        return this.scheduleList;
    }

    setControllerList(controller: string[]) {
        this.controllerList = controller;
    }

    getControllerList() {
        return this.controllerList;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

}