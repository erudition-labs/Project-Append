import { Component, OnInit, Inject, ViewChild           } from '@angular/core';
import { Validators, FormBuilder, FormGroup             } from '@angular/forms';
import { FlashMessagesService                           } from 'angular2-flash-messages';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA       } from '@angular/material';
import { startWith                                      } from 'rxjs/operators/startWith';
import { map                                            } from 'rxjs/operators/map';
import { Observable                                     } from 'rxjs/Observable';
import { DragulaService                                 } from 'ng2-dragula/ng2-dragula';



import { IrrigationZoneService, IrrigationZone          } from '../../services/irrigationZones.service';
import { ControlBoxService, Station                     } from '../../services/controlBoxes.service';


@Component({
    selector: 'app-irrigation-zones',
    templateUrl: './irrigation-zones.component.html',
    styleUrls: ['./irrigation-zones.component.scss']
})
export class IrrigationZonesComponent implements OnInit {
    @ViewChild('stepper') stepper;

    irrigationZones     : Observable<IrrigationZone[]>;
    fieldStations       : Observable<Station[]>;

    zoneStationsArray   : Station[] = [];
    unassignedStations  : Station[] = [];


    firstFormGroup  : FormGroup;
    secondFormGroup : FormGroup;
    thirdFormGroup  : FormGroup;


    isCreating : boolean = false;

    constructor( private irrigationZoneService  : IrrigationZoneService,
                 private controlBoxService      : ControlBoxService,
                 private formBuilder            : FormBuilder,
                 private DragulaService         : DragulaService,
                 public dialog                  : MatDialog)
    {
        DragulaService.setOptions('first-bag', {});
    }

    ngOnInit() {
        this.refreshForms();
    }

    createZone() : void {
        this.refreshForms();
        if(this.isCreating) {
            this.zoneStationsArray = [];
            this.stepper.reset();
             //this.stepper.selectedIndex = 1;
        }

        this.unassignedStations = [];
        this.isCreating = true;
        this.fieldStations.subscribe(stations => (
            this.unassignedStations = stations
        ));
    }

    submitZone() : void {
        let zone = {
            name        : this.firstFormGroup.get('firstCtrl').value,
            description : this.secondFormGroup.get('secondCtrl').value,
            stations    : this.zoneStationsArray
        }
        this.irrigationZoneService.create(zone);
        this.refreshForms();
    }

    refreshForms() : void {

        this.firstFormGroup = this.formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this.formBuilder.group({
            thirdCtrl: ['   ']
        });

        this.isCreating = false;
        this.zoneStationsArray = [];

        this.irrigationZones = this.irrigationZoneService.irrigationZones;
        this.irrigationZoneService.loadAll();

        this.controlBoxService.loadAllStations();
        this.irrigationZoneService.loadAll();

        this.fieldStations = this.controlBoxService.stations
        .map(stations => stations.filter(station => (
            !station.isAssigned)),
        error => console.log(error));
    }

    openDialog(zone : IrrigationZone): void {

    let dialogRef = this.dialog.open(DialogOverviewZoneInfoDialog, {
        width: '500px',
      data: {
              name        : zone.name,
              description : zone.description,
              picture     : zone.picture,
              stations    : zone.stations,
              schedules   : zone.schedules
       }
    });

  }

    ngOnDestroy() {
        this.DragulaService.destroy('first-bag');
    }
}

@Component({
  selector: 'dialog-overview-zone-info',
  templateUrl: 'dialog-overview-zone-info-dialog.html',
})
export class DialogOverviewZoneInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewZoneInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
