import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesRoutingModule, routedComponents } from './updates-routing.module';
import { ThemeModule 								} from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { TuiModule } from 'ngx-tui-editor';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    UpdatesRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),
    TuiModule,

  ],
  declarations: [
    ...routedComponents,
  ]
})
export class UpdatesModule { }
