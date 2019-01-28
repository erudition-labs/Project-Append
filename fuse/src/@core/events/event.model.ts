export interface Event {
	_id							?: string;
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isClosed		 			: boolean;
	summary						: string;
	date 						: any[];
	OIC 						: any[];
	signedUp 					: any[];
	pending						: any[];
	additionalDetails			: string;
	spots						: number;
	author						: any;
}
