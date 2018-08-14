import { BrowserModule                      } from '@angular/platform-browser';
import { NgModule                           } from '@angular/core';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule                   } from '@angular/common/http';
import { RouterModule, Routes               } from '@angular/router';
import { AppRoutingModule, routes           } from './app.routing';
import { ComponentsModule                   } from './components/components.module';
import { FlashMessagesModule                } from 'angular2-flash-messages';
import { HttpModule                         } from '@angular/http';


//services
import { ValidateService        } from './services/validate.service';
import { AuthService            } from './services/auth.service';
import { LogService             } from './services/logs.service';
import { AuthGuard              } from './guards/auth.guard';
import { MessageService         } from './services/message.service';
import { UsersService           } from './services/users.service';
import { ControlBoxService      } from './services/controlBoxes.service';
import { IrrigationZoneService  } from './services/irrigationZones.service';


//tabs are below
import { AppComponent                                               } from './app.component';
import { MapsComponent                                              } from './components/maps/maps.component';
import { NotificationsComponent, CustomLogDialogOverview            } from './components/notifications/notifications.component';
import { EventsComponent                                            } from './components/events/events.component';
import { ScheduleComponent                                          } from './components/schedule/schedule.component';
import { WeatherComponent                                           } from './components/weather/weather.component';
import { RolesComponent                                             } from './components/roles/roles.component';
import { ManOperationsComponent                                     } from './components/man-operations/man-operations.component';
import { ReportsComponent                                           } from './components/reports/reports.component';
import { RegisterComponent                                          } from './components/register/register.component';
import { SplashPageComponent                                        } from './components/splashPage/splashPage.component';
import { IrrigationZonesComponent, DialogOverviewZoneInfoDialog     } from './components/irrigation-zones/irrigation-zones.component';

import { MatAutocompleteModule, MatInputModule   } from '@angular/material';
import { BrowserAnimationsModule                 } from '@angular/platform-browser/animations';
import { MatSelectModule                         } from '@angular/material/select';
import { MatCardModule                           } from '@angular/material/card';
import { MatExpansionModule                      } from '@angular/material/expansion';
import { MatChipsModule                          } from '@angular/material/chips';
import { MatListModule                           } from '@angular/material/list';
import { MatDialogModule                         } from '@angular/material/dialog';
import { MatButtonModule                         } from '@angular/material/button';
import { MatFormFieldModule                      } from '@angular/material/form-field';
import { MatStepperModule                        } from '@angular/material/stepper';
import { MatGridListModule                       } from '@angular/material/grid-list';
import { MatDividerModule                        } from '@angular/material/divider';





import { DragulaModule } from 'ng2-dragula';
import { PopoverModule } from 'ngx-popover';

@NgModule({
    declarations: [
        AppComponent,
        EventsComponent,
        ScheduleComponent,
        WeatherComponent,
        RolesComponent,
        ManOperationsComponent,
        MapsComponent,
        NotificationsComponent,
        ReportsComponent,
        RegisterComponent,
        CustomLogDialogOverview,
        SplashPageComponent,
        IrrigationZonesComponent,
        DialogOverviewZoneInfoDialog
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatStepperModule,
        MatGridListModule,
        MatDividerModule,
        DragulaModule,
        PopoverModule,
        FlashMessagesModule.forRoot(),
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        ValidateService, //services go here
        AuthService,
        AuthGuard,
        LogService,
        MessageService,
        UsersService,
        ControlBoxService,
        IrrigationZoneService
    ],

    entryComponents: [
        CustomLogDialogOverview,
        DialogOverviewZoneInfoDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
