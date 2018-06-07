import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule } from '@angular/material';

import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';

import { TodoService } from './todo.service';
import { FuseTodoComponent } from './todo.component';
import { FuseTodoMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseTodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { FuseTodoListComponent } from './todo-list/todo-list.component';
import { FuseTodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
    {
        path     : 'all',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'all/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'tag/:tagHandle',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'tag/:tagHandle/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path     : 'filter/:filterHandle/:todoId',
        component: FuseTodoComponent,
        resolve  : {
            todo: TodoService
        }
    },
    {
        path      : '**',
        redirectTo: 'all'
    }
];

@NgModule({
    declarations: [
        FuseTodoComponent,
        FuseTodoMainSidenavComponent,
        FuseTodoListItemComponent,
        FuseTodoListComponent,
        FuseTodoDetailsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,

        NgxDnDModule,

        FuseSharedModule,
    ],
    providers   : [
        TodoService
    ]
})
export class FuseTodoModule
{
}
