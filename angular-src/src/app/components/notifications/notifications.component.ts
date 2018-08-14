import { Component, OnInit, Inject                      } from '@angular/core';
import { FormControl, Validators                        } from '@angular/forms';
import { FlashMessagesService                           } from 'angular2-flash-messages';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA       } from '@angular/material';
import { Observable                                     } from 'rxjs';

import { AuthService                                    } from '../../services/auth.service';
import { ValidateService                                } from '../../services/validate.service';
import { LogService, Issue                              } from '../../services/logs.service';
import { MessageService                                 } from '../../services/message.service';



@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    panelOpenState      : boolean = false;
    issueLogs           : Observable<Issue[]>; //all issue logs
    userIssueLogs       : Observable<Issue[]>; //currently signed in users issue logs
    otherIssueLogs      : Observable<Issue[]>; //Non assigned Issue logs

    name            : String;
    severity        : String;
    dateCreated     : String;
    dateCompleted   : String;
    controlBox      : String;
    controller      : String;
    zone            : String;
    station         : String;
    description     : String;
    assignedUser    : String;


    constructor(private authService             : AuthService,
                private validateService         : ValidateService,
                private logService              : LogService,
                private flashMessage            : FlashMessagesService,
                private messageService          : MessageService,
                public dialog                   : MatDialog
    ) {  }

    ngOnInit() {
        this.issueLogs = this.logService.issues;
        if(this.authService.loggedIn()) {
            this.updateUserLogs();
        }
        this.logService.loadAll();
    }

    submitIssue(issue : Issue) {
        if(!this.validateService.validateIssueLog(issue)) {
            this.flashMessage.show('Please enter required fields', {cssClass: 'alert-danger', timeout: 5000});
            return false;
        } else {
            this.logService.create(issue);
            this.updateUserLogs();
            this.logService.loadAll(); /*This works for now I guess*/
            this.messageService.sendMessage("Issue Created");
        }
    }

    updateUserLogs() {
        this.authService.getProfile().subscribe(profile => {
            this.userIssueLogs = this.issueLogs
            .map(issues => issues.filter(issue => (
                typeof(issue.assignedUser) !== 'undefined'
                && issue.assignedUser === profile.user.name)));

                this.otherIssueLogs = this.issueLogs
                .map(issues => issues.filter(issue => (
                    typeof(issue.assignedUser) === 'undefined'
                    || issue.assignedUser !== profile.user.name)));
                });

            }

            deleteIssue(issueId : string) {
                this.logService.remove(issueId);
                this.updateUserLogs();
                this.logService.loadAll();
                this.messageService.sendMessage("Issue Removed");
            }

            updateIssue(issue : Issue) {
                this.logService.update(issue);
                this.updateUserLogs();
                this.logService.loadAll();
                this.messageService.sendMessage("Issue Updated");
            }

            openUpdateDialog(issue : Issue) {
                let dialogRef = this.dialog.open(CustomLogDialogOverview, {

                    data    : {
                        _id             : issue._id,
                        name            : issue.name,
                        severity        : issue.severity,
                        dateCreated     : issue.dateCreated,
                        dateCompleted   : issue.dateCompleted,
                        controlBox      : issue.controlBox,
                        controller      : issue.controller,
                        zone            : issue.zone,
                        station         : issue.station,
                        description     : issue.description,
                        assignedUser    : issue.assignedUser
                    }
                });

                dialogRef.afterClosed().subscribe(result => {
                    if(typeof result !== 'undefined' && result != null) {
                        this.updateIssue(result);
                    }
                });
            }

            openCustomIssueDialog() {
                let dialogRef = this.dialog.open(CustomLogDialogOverview, {

                    data    : {
                        name            : this.name,
                        severity        : this.severity,
                        dateCreated     : this.dateCreated,
                        dateCompleted   : this.dateCompleted,
                        controlBox      : this.controlBox,
                        controller      : this.controller,
                        zone            : this.zone,
                        station         : this.station,
                        description     : this.description,
                        assignedUser    : this.assignedUser
                    }
                });

                dialogRef.afterClosed().subscribe(result => {
                    if(typeof result !== 'undefined' && result != null) {
                        result.dateCreated = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                        this.submitIssue(result);
                    }
                });
            }
        }


        @Component({
            selector: 'custom-log-dialog-overview',
            templateUrl: './custom-log-dialog-overview.html',
            styleUrls: ['./custom-log-dialog-overview.scss']
        })

        export class CustomLogDialogOverview {
            constructor(
                public dialogRef: MatDialogRef<CustomLogDialogOverview>,
                @Inject(MAT_DIALOG_DATA) public data: any
            ) {}

            severities = [
                { value : 'low',    viewValue   : 'Low' },
                { value : 'med',    viewValue   : 'Medium' },
                { value : 'high',   viewValue   : 'High'}
            ];


            nameForm        = new FormControl('', [Validators.required]);
            severityForm    = new FormControl('', [Validators.required]);

            getErrorMessage() {
                if(this.nameForm.hasError('required') ||
                this.severityForm.hasError('required'))
                return 'You must enter a value';
            }
            onNoClick() : void {
                this.dialogRef.close();
            }
        }
