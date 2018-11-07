import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})

export class UtilsService {
    MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
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
    
    public getMonthString(x: number) : string {
        return this.MONTHS[x];
    }
}