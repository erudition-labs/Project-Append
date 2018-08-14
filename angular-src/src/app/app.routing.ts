import { NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';
import { BrowserModule          } from '@angular/platform-browser';
import { Routes, RouterModule   } from '@angular/router';


import { MapsComponent              } from './components/maps/maps.component';
import { NotificationsComponent     } from './components/notifications/notifications.component';
import { EventsComponent            } from './components/events/events.component';
import { ScheduleComponent          } from './components/schedule/schedule.component';
import { WeatherComponent           } from './components/weather/weather.component';
import { RolesComponent             } from './components/roles/roles.component';
import { ManOperationsComponent     } from './components/man-operations/man-operations.component';
import { ReportsComponent           } from './components/reports/reports.component';
import { RegisterComponent          } from './components/register/register.component';
import { SplashPageComponent        } from './components/splashPage/splashPage.component';
import { IrrigationZonesComponent   } from './components/irrigation-zones/irrigation-zones.component';


import { AuthGuard              } from './guards/auth.guard';

/*
*const appRoutes: Routes = [
{ path:'',          component: HomeComponent      },
{ path:'register',  component: RegisterComponent  },
{ path:'login',     component: LoginComponent     },
{ path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard] }, //protect pages if not logged in
{ path:'profile',   component: ProfileComponent   , canActivate:[AuthGuard] },
]
* */


/*
* To hide certain buttons or something, do this in the html
* <ul class="nav navbar-nav navbar-left">
*      <li [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a [routerLink]="['/']">Home</a></li>
* </ul>
*
*  <ul class="nav navbar-nav navbar-right">
*      <li *ngIf="authService.loggedIn()" [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a[routerLink]="['/dashboard']">Dashboard</a></li>
*      <li *ngIf="authService.loggedIn()" [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a[routerLink]="['/profile']">Profile</a></li>
*
* */

//also note that logout is in navbar html


export const routes: Routes =[

    { path: 'notifications',    component: NotificationsComponent, canActivate:[AuthGuard]          },
    { path: 'login',            component: SplashPageComponent                                      },
    { path: 'register',         component: RegisterComponent                                        },
    { path: 'events',           component: EventsComponent                                          },
    { path: 'man-operations',   component: ManOperationsComponent                                   },
    { path: 'weather',          component: WeatherComponent                                         },
    { path: 'schedule',         component: ScheduleComponent, canActivate:[AuthGuard]               }, //protect pages if not logged in
    { path: 'roles',            component: RolesComponent                                           },
    { path: 'maps',             component: MapsComponent                                            },
    { path: 'reports',          component: ReportsComponent                                         },
    { path: 'irrigation-zones', component: IrrigationZonesComponent                                 },
    { path: '**',               redirectTo: 'notifications', pathMatch: 'full'                      },
    { path: '',                 redirectTo: 'notifications', pathMatch: 'full'                      },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
