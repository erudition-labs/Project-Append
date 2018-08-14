import { Component, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild, ElementRef ,Directive} from '@angular/core';
import { FormControl    } from '@angular/forms';
import { Observable     } from 'rxjs/Observable';
//import 'rxjs/add/operator/startWith';
//import 'rxjs/add/operator/map';
import { startWith                      } from 'rxjs/operators/startWith';
import { map                            } from 'rxjs/operators/map';
import { DragulaService                 } from 'ng2-dragula/ng2-dragula';
import { PopoverModule                  } from 'ngx-popover';

//import { Station                                            } from './station.model';
//import { Zone                                               } from './zone.model';
import { log                                                } from 'util';
import { DOCUMENT                                           } from '@angular/common';
import { IrrigationZoneService, IrrigationZone, Schedule    } from '../../services/irrigationZones.service';
import { Station                                            } from '../../services/controlBoxes.service'



@Component({
      selector: 'schedule-component',
      templateUrl: './schedule.component.html',
      styleUrls: ['./schedule.component.css'],
})


export class ScheduleComponent {
      private displayZoneSummary = true;
      displayZoneCard = false;
      createSchedule = false;
      displayStationGeneral = false;
      displayCurrentSchedule = false;
      controllerNumber: number;
      stationNumber: string;
      zoneSelected: IrrigationZone;
      zoneName: string;
      zoneDescription: string;
      viewCycleSchedule: string[] = [];
      theScheduleLength : Number;

      stations              : Station[] = [];
      scheduleList          : Station[] = [];
      irrigationZones       : Observable<IrrigationZone[]>;
      irrigationZonesArray  : IrrigationZone[] = [];


      constructor(private DragulaService         : DragulaService,
                  private irrigationZoneService  : IrrigationZoneService) {
            DragulaService.setOptions('first-bag', {
                  copy: function (el, source) {
                        if (source.id != 'no-drop') {
                              return true;
                        }
                        else {
                              return false;
                        }
                  },

                  accepts: function (el, target, source, sibling) {
                        if (target.id == 'no-drop') {
                              return true;
                        }
                        else {
                              return false;
                        }
                  }
            });
      }

      myControl: FormControl = new FormControl();  //for autocomplete
      options = []   //options for autocomplete
      filteredOptions: Observable<string[]>; //for autocomplete

      ngOnInit() {
          this.irrigationZones = this.irrigationZoneService.irrigationZones;
          this.irrigationZoneService.loadAll();

            this.filteredOptions = this.myControl.valueChanges
                  .pipe(
                  startWith(''),
                  map(val => this.filter(val))
                  );
      }

      ngOnDestroy() {
            this.DragulaService.destroy('first-bag');
      }


      filter(val: string): string[] {
            return this.options.filter(option =>
                  option.toLowerCase().indexOf(val.toLowerCase()) === 0);
      }

      onStationClick(station: string, controller: number) {
            if (this.displayStationGeneral === false)
                  this.displayStationGeneral = true;
            this.stationNumber = station;
            this.controllerNumber = controller;
      }

      onCreateScheduleClick(station: string, controller: number) {
            this.displayZoneSummary = false;
            this.createSchedule = true;
            this.scheduleList = [];
      }

      onZoneClick(zone) {
            this.zoneSelected       = zone;
            this.zoneName           = zone.name;
            this.zoneDescription    = zone.description;
            this.stations           = zone.stations;

            this.displayZoneCard        = true;
            this.displayStationGeneral  = false;
            if (!this.displayZoneSummary) {
                  this.displayZoneSummary   = true;
                  this.createSchedule       = false;
            }
      }

      onSaveScheduleClick() {
            if(this.scheduleList.length != 0) {
                  let scheduleName  : string = window.prompt("Name the schedule!");
                  let startHour     : string = document.getElementById('startTimeForm')[0].value;                              //hour
                  let startMin      : string = document.getElementById('startTimeForm')[1].value;                               //minute
                  var timeOfDay = document.getElementById('startTimeForm')[2];                                    //am or pm.m

                  if(timeOfDay.checked === true) {
                        timeOfDay = timeOfDay.value;                                                              //a.m.
                  }
                  else {
                        timeOfDay = document.getElementById('startTimeForm')[3].value;                            //p.m.
                  }

                  for(var i = 0; i < this.scheduleList.length; i++) {
                        //set Timers for schedule
                        var position = i+"";
                        this.scheduleList[i].runTime =  document.getElementsByName('run')[position].value;
                        this.scheduleList[i].overlap =  document.getElementsByName('offset')[position].value;
                  }

                  let schedule : Schedule = {
                      name          : scheduleName,
                      startTime     : JSON.stringify(startHour + ':' + startMin  + timeOfDay),
                      cycle         : JSON.stringify(this.saveCycle()),
                      cycleLength   : this.theScheduleLength,
                      stations      : this.scheduleList
                  };                                                                 //check to see if schedule isn't empty.
                                                                        //saves the cycle to zon
                  this.zoneSelected.schedules.push(schedule);
            }
            this.irrigationZoneService.update(this.zoneSelected);
            this.irrigationZoneService.loadAll();
      }

      /* save cycle(weekly, bi-weekly, monthly) and saves what days it
      saves for the cycle period.*/
      private saveCycle()  {
            var cycleSchedule = [];
            var cyclelength;
            for(var i = 0; i < document.getElementsByName('cycle').length; i++) {                                 //this gets the radiobutton check for (weekly, biweekly, monthly)
                  var position = i+"";
                  var cycle = document.getElementsByName('cycle')[position];
                  if(cycle.checked)
                        cyclelength = Number(cycle.value);                                                        //1,2,4
            }
            var userInput = document.getElementsByName('day');
            for(var j = 0; j < userInput.length; j++) {                                                            //goes through all inputs even if unchecked.
                  var position = j+"";
                  if(userInput[position].checked){
                        cycleSchedule[j] = userInput[position].value;
                  }
                  else{
                        cycleSchedule[j] = "-1";                                                                 //did not get checked.
                  }
            }
            this.theScheduleLength = cyclelength;
            return cycleSchedule;
      }

      private printCycleDays() {
          if(this.zoneSelected.schedules != null) {
          let schedule = this.zoneSelected.schedules[0]; //just having it print the first schedule
          let cycleSchedule = JSON.parse(schedule.cycle);
        //var cycleSchedule = this.zoneSelected.getCycleSchedule();
            //let cycleLength = cycleSchedule.length; //this.zoneSelected.getCycleScheduleLength();
            let cycleLength = this.zoneSelected.schedules[0].cycleLength;
            var outputArray = [];
            var i = 0;
            if(cycleSchedule != null && cycleLength != null) {
                  while(i < cycleLength) {
                        outputArray[i] = "Week "+ (i+1) +": ";
                        for(var j = i*7; j < (7 * (i+1)); j++) {
                              if(cycleSchedule[j] != "-1")
                                    outputArray[i] += cycleSchedule[j] +" ";
                        }
                        i++;
                  }
            }
        }
            return outputArray;
      }

      onViewScheduleClick() {

            this.displayZoneSummary     = false;
            this.createSchedule         = false;
            this.displayCurrentSchedule = true;
            this.displayZoneCard        = true;

            this.viewCycleSchedule = this.printCycleDays(); //for output
            console.log(this.viewCycleSchedule);
      }

      getCycle(cycleType: number) {
            document.getElementById('scheduleDaysID').innerHTML = ("");
            for(var i = 0; i < cycleType; i++) {
                  var cycleDays = ("<section><label class='cycleDay'>Week "+(i+1)+": </label>"+
                              "<label class='cycleDay'>Sun<input type='checkbox' value='Sunday' name='day'></label>"+
                              "<label class='cycleDay'>Mon<input type='checkbox' value='Monday' name='day'></label>"+
                              "<label class='cycleDay'>Tues<input type='checkbox' value='Tuesday' name='day'></label>"+
                              "<label class='cycleDay'>Wed<input type='checkbox' value='Wednesday' name='day'></label>"+
                              "<label class='cycleDay'>Thur<input type='checkbox' value='Thursday' name='day'></label>"+
                              "<label class='cycleDay'>Fri<input type='checkbox' value='Friday' name='day'></label>"+
                              "<label class='cycleDay'>Sat<input type='checkbox' value='Saturday' name='day'></label></section>");
                  document.getElementById('scheduleDaysID').insertAdjacentHTML('beforeend',cycleDays);
            }
      }

      isSchedules() : boolean {
          return !Array.isArray(this.zoneSelected.schedules) || !this.zoneSelected.schedules.length;
      }

      onDeleteStationClick(index) {
            this.scheduleList.splice(index,1);
      }

      setColorStation(controllerId: String) {
         if (controllerId.includes("controller0")) {
            return "info";
         }
         else if (controllerId.includes("controller1")) {
            return "warning";
         }
         else if (controllerId.includes("controller2")) {
            return "success";
         }
      }

      setArcGisImage(zoneName: String) {
         if (zoneName.toLowerCase().includes("oviatt")) {
            return "https://i.imgur.com/AvO2ZQV.jpg"
         }
         else {
            return "";
         }
      }

      setZoneImage(zoneName: string) {
         if (zoneName.toLowerCase().includes("oviatt")) {
            return "http://library.csun.edu/blogs/cited/wp-content/uploads/sites/4/2016/08/Oviatt-Library.jpg";
         }
      }
}
