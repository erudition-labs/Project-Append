import { User } from '../user/user.model';
export interface Event {
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isSignupRequired 			: boolean;
	startDate 					: any;
	endDate 					: any;
	OIC 						: any[];
	signedUp 					: any[];
	additionalDetails			: any[]
}
