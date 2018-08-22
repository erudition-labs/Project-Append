import { User } from '../user/user.model';
export interface Event {
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isSignupRequired 			: boolean;
	startDate 					: Date;
	endDate 					: Date;
	OIC 						: User[];
	signedUp 					: User[];
}
