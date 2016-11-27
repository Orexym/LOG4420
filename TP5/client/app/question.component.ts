import { Component, OnInit } from '@angular/core';

import { Question } from './question';
import { User } from './user';
import { QuestionService } from './question.service';
import { UserService } from './user.service';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question'
})

export class QuestionComponent implements OnInit {

    question: Question;
    user: User;
    mode: String;


    constructor(
        private questionService: QuestionService,
        private userService: UserService
    ) {
        this.question = new Question();
    }

    initialise() : void {
        this.userService.getUser().then(data => {
            this.user = data;
            this.mode = this.user.mode;
            this.getNextQuestion();
        });
    }

    getNextQuestion() : void {
        this.questionService.getNextQuestion(this.mode).then(data => {
            this.question = data;
        });
    }








    ngOnInit() : void {
        this.initialise();
    }

}