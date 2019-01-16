import { Component, Input, Output, EventEmitter, OnInit, Injectable, OnDestroy } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from './User';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { UsersState } from '@core/store/users/user.state';
import { User as UserModel } from '@core/user/user.model';



class Person {
  name: string;
  age: number;
}

@Injectable()
class PersonValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      '_id'       : new FormControl(null, Validators.required),
      'email'     : new FormControl(null, Validators.required),
      'firstName' : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required),
      'rank'      : new FormControl(),
      'flight'    : new FormControl(),
      'team'      : new FormControl(),
      'phone'     : new FormControl(),
      'role'      : new FormControl(null, Validators.required),
      'events'    : new FormControl(null, Validators.required),
      'fullName'  : new FormControl(null, Validators.required),
      'isChangelogViewed' : new FormControl(Validators.required)
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
export class UserMangComponent implements OnInit, OnDestroy {
  constructor(private personValidator: ValidatorService,
              private _store: Store) { }

  displayedColumns = ['First Name', 
                      'Last Name',
                      'Rank', 
                      'Flight',
                      'Team',
                      'Phone',
                      'Email',
                      'actionsColumn'];

  @Input() userList = [];
  @Output() userListChange = new EventEmitter<User[]>();
  dataSource: TableDataSource<User>;

  @Select(UsersState.allUsers) users$ : Observable<User[]>
  private ngUnsubscribe = new Subject();


  ngOnInit() {
    this.users$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(u => {
      this.userList = u;
      this.dataSource = new TableDataSource<any>(this.userList, User, this.personValidator);
      this.dataSource.datasourceSubject.subscribe(userList => this.userListChange.emit(userList));
    });



  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

