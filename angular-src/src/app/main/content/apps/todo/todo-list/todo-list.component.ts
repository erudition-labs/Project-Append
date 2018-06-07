import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
    selector   : 'fuse-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls  : ['./todo-list.component.scss'],
    animations : fuseAnimations
})
export class FuseTodoListComponent implements OnInit, OnDestroy
{
    todos: Todo[];
    currentTodo: Todo;

    onTodosChanged: Subscription;
    onCurrentTodoChanged: Subscription;

    constructor(
        private route: ActivatedRoute,
        private todoService: TodoService,
        private location: Location
    )
    {
    }

    ngOnInit()
    {
        // Subscribe to update todos on changes
        this.onTodosChanged =
            this.todoService.onTodosChanged
                .subscribe(todos => {
                    this.todos = todos;
                });

        // Subscribe to update current todo on changes
        this.onCurrentTodoChanged =
            this.todoService.onCurrentTodoChanged
                .subscribe(currentTodo => {
                    if ( !currentTodo )
                    {
                        // Set the current todo id to null to deselect the current todo
                        this.currentTodo = null;

                        // Handle the location changes
                        const tagHandle    = this.route.snapshot.params.tagHandle,
                              filterHandle = this.route.snapshot.params.filterHandle;

                        if ( tagHandle )
                        {
                            this.location.go('apps/todo/tag/' + tagHandle);
                        }
                        else if ( filterHandle )
                        {
                            this.location.go('apps/todo/filter/' + filterHandle);
                        }
                        else
                        {
                            this.location.go('apps/todo/all');
                        }
                    }
                    else
                    {
                        this.currentTodo = currentTodo;
                    }
                });
    }

    ngOnDestroy()
    {
        this.onTodosChanged.unsubscribe();
        this.onCurrentTodoChanged.unsubscribe();
    }

    /**
     * Read todo
     * @param todoId
     */
    readTodo(todoId)
    {
        // Set current todo
        this.todoService.setCurrentTodo(todoId);
    }

    onDrop(ev)
    {

    }
}
