export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccess {
    static readonly type = '[Auth] Login Success'
    constructor(public readonly payload: string) {}
}

export class LoginFail {
    static readonly type = '[Auth] Login Fail'
    constructor(public readonly payload?: string) {}
}
  
  export class Logout {
    static readonly type = '[Auth] Logout';
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFail
    | Logout;