import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../objects/user';
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    newUser : Subject<User> = new Subject<User>();

    getUser(): Promise<User> {
        return this.http.get('api/user/load').toPromise().then(response => {
            this.newUser.next(response.json().n);
            return response.json().n;
        }).catch(this.handleError);
    }

    resetScores() : Promise<boolean> {
        return this.http.delete('/user/resetScores').toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }

}