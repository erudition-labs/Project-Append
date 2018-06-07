import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
    selector   : 'fuse-todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls  : ['./todo-details.component.scss'],
    animations : fuseAnimations
})
export class FuseTodoDetailsComponent implements OnInit, OnDestroy
{
    todo: Todo;
    tags: any[];
    formType: string;
    todoForm: FormGroup;
    @ViewChild('titleInput') titleInputField;

    onFormChange: any;
    onCurrentTodoChanged: Subscription;
    onTagsChanged: Subscription;
    onNewTodoClicked: Subscription;

    constructor(
        private todoService: TodoService,
        private formBuilder: FormBuilder
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update the current todo
        this.onCurrentTodoChanged =
            this.todoService.onCurrentTodoChanged
                .subscribe(([todo, formType]) => {

                    if ( todo && formType === 'edit' )
                    {
                        this.formType = 'edit';

                        this.todo = todo;

                        this.todoForm = this.createTodoForm();

                        this.onFormChange =
                            this.todoForm.valueChanges.pipe(
                                debounceTime(500),
                                distinctUntilChanged()
                            ).subscribe(data => {
                                this.todoService.updateTodo(data);
                            });
                    }
                });

        // Subscribe to update on tag change
        this.onTagsChanged =
            this.todoService.onTagsChanged
                .subscribe(labels => {
                    this.tags = labels;
                });

        // Subscribe to update on tag change
        this.onNewTodoClicked =
            this.todoService.onNewTodoClicked
                .subscribe(() => {
                    this.todo = new Todo({});
                    this.todo.id = FuseUtils.generateGUID();
                    this.formType = 'new';
                    this.todoForm = this.createTodoForm();
                    this.focusTitleField();
                    this.todoService.onCurrentTodoChanged.next([this.todo, 'new']);
                });
    }

    ngOnDestroy()
    {
        if ( this.onFormChange )
        {
            this.onFormChange.unsubscribe();
        }

        this.onCurrentTodoChanged.unsubscribe();
        this.onNewTodoClicked.unsubscribe();
    }

    focusTitleField()
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }

    createTodoForm()
    {
        return this.formBuilder.group({
            'id'       : [this.todo.id],
            'title'    : [this.todo.title],
            'notes'    : [this.todo.notes],
            'startDate': [this.todo.startDate],
            'dueDate'  : [this.todo.dueDate],
            'completed': [this.todo.completed],
            'starred'  : [this.todo.starred],
            'important': [this.todo.important],
            'deleted'  : [this.todo.deleted],
            'tags'     : [this.todo.tags]
        });
    }

    toggleStar(event)
    {
        event.stopPropagation();
        this.todo.toggleStar();
        this.todoService.updateTodo(this.todo);
    }

    toggleImportant(event)
    {
        event.stopPropagation();
        this.todo.toggleImportant();
        this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Completed
     * @param event
     */
    toggleCompleted(event)
    {
        event.stopPropagation();
        this.todo.toggleCompleted();
        this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Deleted
     * @param event
     */
    toggleDeleted(event)
    {
        event.stopPropagation();
        this.todo.toggleDeleted();
        this.todoService.updateTodo(this.todo);
    }

    toggleTagOnTodo(tagId)
    {
        this.todoService.toggleTagOnTodo(tagId, this.todo);
    }

    hasTag(tagId)
    {
        return this.todoService.hasTag(tagId, this.todo);
    }

    addTodo()
    {
        this.todoService.updateTodo(this.todoForm.getRawValue());
    }
}
