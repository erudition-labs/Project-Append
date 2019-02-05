import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { UsersState } from '@core/store/users/user.state';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { User } from '@core/user/user.model';
import { UserFormDialogComponent } from './user-form/user-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserUpdateSuccess } from '@core/store/users/users.actions';
import { UtilsService } from '@core/utils/utils.service';


@Component({
  selector: 'usermang',
  templateUrl: './usermang.component.html',
})
export class UserMangComponent implements OnInit, OnDestroy {
  constructor(private _store: Store,
              private _matDialog: MatDialog,
              private _actions$: Actions,
              private _utils: UtilsService
    ) { }

  userList: Array<User> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Select(UsersState.allUsers) users$ : Observable<User[]>

  dataSource: MatTableDataSource<User>;
  dialogRef : MatDialogRef<UserFormDialogComponent>
  private ngUnsubscribe = new Subject();

  displayedColumns: string[] = ['Name', 'Rank', 'Flight', 'Team', 'Email', 'Phone'];

  ngOnInit() {
    this.users$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(u => {
      this.userList = u; 
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;    
    });

    this._actions$.pipe(ofActionDispatched(UserUpdateSuccess))
    .subscribe(() => { 
        this._utils.success("Updated");
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openProfile(user) {
    this.dialogRef = this._matDialog.open(UserFormDialogComponent, {
      panelClass: 'user-form-dialog',
      data : user as User 
  });
  }

}

