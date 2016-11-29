import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../objects/user';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    getUser(): Promise<User> {
        return this.http.get('api/user/load').toPromise().then(response => {
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