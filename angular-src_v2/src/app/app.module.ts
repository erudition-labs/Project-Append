import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { SharedModule } from "@app/shared";
import { CoreModule } from "@app/core";

import { SettingsModule } from "./settings";
import { StaticModule } from "./static";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//import { FlatpickrModule } from 'angularx-flatpickr';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
	AppRoutingModule,
	AngularFontAwesomeModule,
	//	NgbModule.forRoot(),
	//NgbModalModule.forRoot(),
	//FlatpickrModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
