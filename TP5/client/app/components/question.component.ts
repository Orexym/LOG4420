import { Component, OnInit } from '@angular/core';

import { Question } from '../objects/question';
import { QuestionService } from '../services/question.service';
import { User } from '../objects/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question'
})

export class QuestionComponent implements OnInit {

    question: Question;
    user: User;

    constructor(
        private questionService: QuestionService,
        private userService: UserService,
    ) {
        this.question = new Question();
        this.user = new User();
    }

    initialise() : void {
        this.userService.getUser().then(data => {
            this.user = data;
            this.getNextQuestion();
        });
    }

    getNextQuestion() : void {
        this.questionService.getNextQuestion(this.user.mode).then(data => {
            this.question = data;
        });
    }

    validateQuestion() : void {

    }

    ngOnInit() : void {
        this.initialise();
    }

}