import { Component, Input, Output, EventEmitter, OnInit, Injectable, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { UsersState } from '@core/store/users/user.state';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'usermang',
  templateUrl: './usermang.component.html',
})
export class UserMangComponent implements OnInit, OnDestroy {
  constructor(private _store: Store) 
  {   }



  @Input() userList: Array<any> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Select(UsersState.allUsers) users$ : Observable<any[]>
  private ngUnsubscribe = new Subject();

  ngOnInit() {
    this.users$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(u => {
      this.userList = u;      
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateUser(row:any) {
    console.log(row.currentData);
  }

  applyFilter(filterValue: string) {
		//this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}

