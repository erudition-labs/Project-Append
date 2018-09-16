import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})

export class UtilsService {
    constructor() {}

    public getIds(data : any[]) : string[] {
		let ids = [];
		for (let i=data.length-1; i>=0; i--) { 
			ids.push(data[i]._id);
		}
		return ids;
	}
}