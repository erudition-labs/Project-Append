export interface NewUser {
	email		: string;
	password	: string;
	firstName	: string;
	lastName	: string;
	rank		: string;
	flight		: string;
	team		: string;
	role		: string;
	phone		: string;
}

export interface User {
	_id			: any;
	email 		: string;
	firstName 	: string;
	lastName 	: string;
	rank 		: string;
	flight 		: string;
	team 		: string;
	phone 		: string;
}
