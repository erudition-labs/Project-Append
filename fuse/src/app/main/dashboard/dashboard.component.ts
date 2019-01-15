import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User } from '@core/user/user.model';
import { UsersState } from '@core/store/users/user.state';
import { UsersStateModel } from '@core/store/users/users.state.model';
import { Subject, Observable, of } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';
import { AuthState } from '@core/store/auth/auth.state';
import { AuthStateModel } from '@core/store/auth/auth.state.model';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { Event } from './../apps/events/_store/events.state.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(UsersState.allUsers) users$ : Observable<User[]>;
  private ngUnsubscribe = new Subject();
  //user: User;
  upcomingEvents$ : Observable<Event[]>;
  pastEvents$: Observable<Event[]>;

  constructor(private _store: Store,
              private _tokenService: TokenAuthService) { }

  ngOnInit() {
    this.users$.pipe(takeUntil(this.ngUnsubscribe));

    this.users$.subscribe((users) => {
      let id = this._tokenService.getCurrUserId();
      let index = users.findIndex(x => x._id === id);

      if(index > -1) {
        let user = users[index];
        user.events.sort(function(a,b) {
          return new Date(b.date[0]).getTime() - new Date(a.date[0]).getTime();
        });

        user.events.reverse();

        this.upcomingEvents$ = of(
          user.events.filter(e => new Date(e.date[1]).getTime() >= new Date().getTime())
        );

        this.pastEvents$ = of(
          user.events.filter(e => new Date(e.date[1]).getTime() < new Date().getTime())
        );
        //this.events$ = of(user.events);
      }
    });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
