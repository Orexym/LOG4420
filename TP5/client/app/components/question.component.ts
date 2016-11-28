import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    mode: String;


    constructor(
        private questionService: QuestionService,
        private userService: UserService,
        private router: Router
    ) {
        this.question = new Question();
        this.user = new User();
        this.mode = "";

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