import { User } from '@core/user/user.model';

export interface UsersStateModel {
    users: User[],
    loaded: boolean,
    loading: boolean,
};