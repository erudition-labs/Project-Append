import { User as UserModel} from '@core/user/user.model';
export class User implements UserModel {
    _id					: any;
	email 				: string;
	firstName 			: string;
	lastName 			: string;
	rank 				: string;
	flight 				: string;
	team 				: string;
	phone 				: string;
	role				: string;
	events				: any[];
	fullName			: string;
	isChangelogViewed	: boolean;
}