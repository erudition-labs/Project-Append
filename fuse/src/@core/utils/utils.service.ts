import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    constructor(private toast: ToastrService) {}

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

    public error(msg : string) : void {
		this.toast.error(msg, 'Error!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}

	public success(msg: string) : void {
		this.toast.success(msg, 'Success!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
    }
    
    public compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}