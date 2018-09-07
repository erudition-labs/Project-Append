import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule, routedComponents } from './user-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    UserManagementRoutingModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class UserManagementModule { }
