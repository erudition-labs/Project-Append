import { User } from '@core/user/user.model';

export class LoadUsers {
    static readonly type = '[Users] Load Users';
}

export class LoadUsersSuccess {
    static readonly type = '[Users] Load Users Success';
    constructor(public readonly payload: User[]) {}
}

export class LoadUsersFail {
    static readonly type = '[Users] Load Users Fail';
    constructor(public readonly payload?: any) {}
}

//USER GOT ACCEPTED TO SIGNUP FOR EVENT
export class UserEventSignup {
    static readonly type = '[Users] User Event Signup';
    constructor(public readonly payload: { eventId: string, userId: string }) {}
}

export class UserEventSignupSuccess {
    static readonly type = '[Users] User Event Signup Success';
    constructor(public readonly payload: User) {}
}

export class UserEventSignupFail {
    static readonly type = '[Users] User Event Signup Fail';
    constructor(public readonly payload?: any) {}
}

export type UsersActions = 
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | UserEventSignup
    | UserEventSignupSuccess
    | UserEventSignupFail;