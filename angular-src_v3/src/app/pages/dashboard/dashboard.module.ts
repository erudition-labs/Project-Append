import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MatListModule } from '@angular/material';


@NgModule({
  imports: [
    ThemeModule,
    MatListModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
