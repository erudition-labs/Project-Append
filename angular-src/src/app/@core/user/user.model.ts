export interface NewUser {
	email				: string;
	password			: string;
	firstName			: string;
	lastName			: string;
	fullName			: string;
	rank				: string;
	flight				: string;
	team				: string;
	role				: string;
	phone				: string;
	events				: any[];
	isChangelogViewed	: boolean;
}

export interface User {
	_id					: any;
	email 				: string;
	firstName 			: string;
	lastName 			: string;
	fullName			: string;
	rank 				: string;
	flight 				: string;
	team 				: string;
	phone 				: string;
	role				: string;
	events				: any[];
	isChangelogViewed	: boolean;
}
