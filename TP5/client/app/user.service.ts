import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    getUser(): Promise<User> {
        return this.http.get('api/user/load').toPromise().then(response => {
            let user = new User();
            user.username = response.json().data.n.username;
            user.password = response.json().data.n.password;
            user.test = response.json().data.n.test;
            user.examen = response.json().data.n.examen;
            user.exam_flag = response.json().data.n.exam_flag;
            return user;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }

}