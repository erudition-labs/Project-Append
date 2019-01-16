import { Component, Input, Output, EventEmitter, OnInit, Injectable } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from './User';
class Person {
  name: string;
  age: number;
}

@Injectable()
class PersonValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(),
      });
  }
}

@Component({
  selector: 'usermang',
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorService }
  ],
  templateUrl: './usermang.component.html',
})
export class UserMangComponent implements OnInit {

  constructor(private personValidator: ValidatorService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() personList = [ 
    { name: 'Mark', age: 15 },
    { name: 'Brad', age: 50 },
    ] ;
  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: TableDataSource<Person>;


  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);

    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
  }
}

