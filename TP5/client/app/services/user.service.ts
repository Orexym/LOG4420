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
            return response.json().n;
        }).catch(this.handleError);
    }

    configureExamen(domain: string, totalQuestions: number): Promise<boolean> {
        return this.http.put('api/examen/configure', { domain: domain, totalQuestions: totalQuestions }).toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    configureTest() : Promise<boolean> {
        return this.http.put('api/test/configure', {}).toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    finishExamen() : Promise<boolean> {
        return this.http.post('api/examen/finish', {}).toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    finishTest() : Promise<boolean> {
        return this.http.post('api/test/finish', {}).toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    resetScores() : Promise<boolean> {
        return this.http.delete('api/user/resetScores').toPromise().then(response => {
            this.newUser.next(response.json().n);
            return response.status === 200;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }

}