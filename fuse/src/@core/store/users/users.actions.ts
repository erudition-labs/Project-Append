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

export type UsersActions = 
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail