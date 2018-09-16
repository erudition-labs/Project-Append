import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})

export class UtilsService {
    constructor() {}

    public getIds(data : any[]) : string[] {
        if(!data) return [];
        if(data.length === 0) return [];

		let ids = [];
		for (let i=data.length-1; i>=0; i--) { 
            if(data[i] &&  data[i]._id) 
            {
                ids.push(data[i]._id);
            }
        }
		return ids;
	}
}