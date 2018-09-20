import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MatListModule } from '@angular/material';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NgbdModalContent } from './dashboard.component';




@NgModule({
  imports: [
    ThemeModule,
    MatListModule,
    NgbModalModule.forRoot(),
    MarkdownModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    NgbdModalContent,
  ],
  entryComponents: [NgbdModalContent]
})
export class DashboardModule { }
