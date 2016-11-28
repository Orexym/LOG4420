import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../objects/user';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    getUser(): Promise<User> {
        return this.http.get('api/user/load').toPromise().then(response => {
            let user = new User();
            user.username = response.json().n.username;
            user.password = response.json().n.password;
            user.test = response.json().n.test;
            user.examen = response.json().n.examen;
            user.exam_flag = response.json().n.exam_flag;
            return user;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }

}