import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NewsModule } from 'app/main/news/news.module';
import { DashboardModule } from './main/dashboard/dashboard.module';

import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '@core/core.module';
import { AuthModule } from './main/authentication/auth.module';
import { AppsModule } from './main/apps/apps.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';






const appRoutes: Routes = [ //see auth midule below
    {
        path      : '**',
        redirectTo: 'dashboard',
        
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        //npm installs
        ToastrModule.forRoot(),

        // App modules
        LayoutModule,
        NewsModule,
        DashboardModule,
        CoreModule.forRoot(),
        AuthModule, //since I have this..each of those modules handle their own routing
        //so i dont need it in thte app routing
        AppsModule,
        NgxsModule.forRoot([]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
