import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {
    constructor(private http: Http) {}

    getNextQuestion(mode: String): Promise<Question> {
        return this.http.get('api/'+mode+'/question').toPromise().then(response => {
                let question = new Question();
                question.question = response.json().data.q.question;
                question.ans = response.json().data.q.ans;
                question.domain = response.json().data.q.domain;
                question.trueAnswer = response.json().data.q.trueAnswer;
                return question;
        }).catch(this.handleError);
    }

    getQuestionCountTotal(): Promise<Number> {
        return this.http.get('api/question/count').toPromise().then(response => {
            return response.json().data.count;
        }).catch(this.handleError);
    }

    getQuestionCountByDomain(domain): Promise<Number> {
        return this.http.get('api/question/count/'+domain).toPromise().then(response => {
            return response.json().data.count;
        }).catch(this.handleError);
    }




    private handleError(error: any) : Promise<any> {
        console.error('An error occured', error); // for demo
        return Promise.reject(error.message || error);
    }
}
