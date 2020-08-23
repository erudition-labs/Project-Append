import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User } from '@core/user/user.model';
import { UsersState } from '@core/store/users/user.state';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { Event } from './../apps/events/_store/events.state.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(UsersState.allUsers) users$ : Observable<User[]>;
  private ngUnsubscribe = new Subject();

  upcomingEvents$ : Observable<Event[]>;
  pastEvents$: Observable<Event[]>;

  constructor(private _store: Store,
              private _tokenService: TokenAuthService,
              public _router: Router) { }

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
          this.upcomingEvents$.pipe(takeUntil(this.ngUnsubscribe));
          this.pastEvents$.pipe(takeUntil(this.ngUnsubscribe));
      }
    });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
