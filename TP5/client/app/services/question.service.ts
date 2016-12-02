import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from '../objects/question';
import { Subject } from 'rxjs/Subject';
import { User } from "../objects/user";

@Injectable()
export class QuestionService {
    constructor(private http: Http) {}

    refreshForStats : Subject<User> = new Subject<User>();
    refreshForQuestion : Subject<User> = new Subject<User>();

    getNextQuestion(mode: string): Promise<Question> {
        return this.http.get('api/'+mode+'/question').toPromise().then(response => {
            this.refreshForQuestion.next(response.json().n);
            return response.json().q;
        }).catch(this.handleError);
    }

    getQuestionCountTotal(): Promise<number> {
        return this.http.get('api/question/count').toPromise().then(response => {
            return response.json().count;
        }).catch(this.handleError);
    }

    getQuestionCount(domain): Promise<number> {
        return this.http.get('api/question/count/'+domain).toPromise().then(response => {
            return response.json().count;
        }).catch(this.handleError);
    }

    emptyQuestionDatabase() : Promise<boolean> {
        return this.http.delete('api/question/emptyDB').toPromise().then(res => {
            return res.status == 200;
        }).catch(this.handleError);
    }

    validateQuestion(attemptedAnswer: string) : Promise<number> {
        return this.http.post('api/question/validate', attemptedAnswer).toPromise().then(res => {
            this.refreshForStats.next(res.json().n);
            return res.json().goodAnswer;
        }).catch(this.handleError);
    }

    addQuestion(question: any) : Promise<boolean> {
        return this.http.post('api/question/add', question).toPromise().then(res => {
            return res.status == 200;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }
}
