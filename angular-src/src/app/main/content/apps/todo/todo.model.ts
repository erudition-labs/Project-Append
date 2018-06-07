export class Todo
{
    id: string;
    title: string;
    notes: string;
    startDate: string;
    dueDate: boolean;
    completed: boolean;
    starred: boolean;
    important: boolean;
    deleted: boolean;
    tags: [
        {
            'id': number,
            'name': string,
            'label': string,
            'color': string
        }
        ];

    constructor(todo)
    {
        {
            this.id = todo.id;
            this.title = todo.title;
            this.notes = todo.notes;
            this.startDate = todo.startDate;
            this.dueDate = todo.dueDate;
            this.completed = todo.completed;
            this.starred = todo.starred;
            this.important = todo.important;
            this.deleted = todo.deleted;
            this.tags = todo.tags || [];
        }
    }

    toggleStar()
    {
        this.starred = !this.starred;
    }

    toggleImportant()
    {
        this.important = !this.important;
    }

    toggleCompleted()
    {
        this.completed = !this.completed;
    }

    toggleDeleted()
    {
        this.deleted = !this.deleted;
    }
}
