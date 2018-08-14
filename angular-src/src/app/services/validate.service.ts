import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

constructor() { }

validateRegister(user) {
    if(user.name == undefined || user.email == undefined ||
        user.username == undefined || user.password == undefined) {
            return false;
        } else {
            return true;
        }
    }

    validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    validateIssueLog(issue) {
        if(issue.name == undefined || issue.severity == undefined
            || issue.dateCreated == undefined) {
                return false;
            } else {
                return true;
            }
        }
}
