import { NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';
import { BrowserModule          } from '@angular/platform-browser';
import { Routes, RouterModule   } from '@angular/router';


import { EventsComponent            } from './components/events/events.component';
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

    { path: 'events',           component: EventsComponent                                          },
    { path: '**',               redirectTo: 'events', pathMatch: 'full'                      },
    { path: '',                 redirectTo: 'events', pathMatch: 'full'                      },
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
