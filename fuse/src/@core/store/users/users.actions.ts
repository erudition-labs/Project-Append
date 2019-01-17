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

//user unregistered or removed from event
export class UserEventRemove {
    static readonly type = '[Users] User Event Remove';
    constructor(public readonly payload: { eventId: string, userId: string }) {}
}

export class UserEventRemoveSuccess {
    static readonly type = '[Users] User Event Remove Success';
    constructor(public readonly payload?: User) {}
}

export class UserEventRemoveFail {
    static readonly type = '[Users] User Event Remove Fail';
    constructor(public readonly payload?: any) {}
}

//Update a User
export class UserUpdate {
    static readonly type = '[Users] User Update';
    constructor(public readonly payload: { user: User }) {}
}

export class UserUpdateSuccess {
    static readonly type = '[Users] User Update Success';
    constructor(public readonly payload: { user: User }) {}
}

export class UserUpdateFail {
    static readonly type = '[Users] User Update Fail';
    constructor(public readonly payload?: any) {}
}

export type UsersActions = 
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | UserEventSignup
    | UserEventSignupSuccess
    | UserEventSignupFail
    | UserEventRemove
    | UserEventRemoveSuccess
    | UserEventRemoveFail
    | UserUpdate
    | UserUpdateSuccess
    | UserUpdateFail;