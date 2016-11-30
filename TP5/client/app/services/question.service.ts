import {Injectable, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from '../objects/question';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QuestionService {
    constructor(private http: Http) {}

    refresh : Subject<boolean> = new Subject<boolean>();

    getNextQuestion(mode: string): Promise<Question> {
        return this.http.get('api/'+mode+'/question').toPromise().then(response => {
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

    emptyQuestionDatabase() : Promise<boolean> {
        return this.http.delete('/api/question/emptyDB').toPromise().then(res => {
            return res.status === 200;
        }).catch(this.handleError);
    }

    validateQuestion(attemptedAnswer: string) : Promise<number> {
        return this.http.post('/api/question/validate', attemptedAnswer).toPromise().then(res => {
            this.refresh.next(true);
            return res.json().goodAnswer;
        }).catch(this.handleError);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }
}
