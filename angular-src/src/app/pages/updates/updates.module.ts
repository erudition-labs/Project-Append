import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesRoutingModule, routedComponents } from './updates-routing.module';
import { ThemeModule 								} from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    UpdatesRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),

  ],
  declarations: [
    ...routedComponents,
  ]
})
export class UpdatesModule { }
