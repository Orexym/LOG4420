import {Component, OnInit } from '@angular/core';

import { Question } from '../objects/question';
import { QuestionService } from '../services/question.service';
import { User } from '../objects/user';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question'
})

export class QuestionComponent implements OnInit {

    question: Question;
    user: User;

    private bannerHidden = true;

    // classes
    addDragClass: boolean = false;
    addDragEnterClass: boolean = false;
    isValid: boolean = false;
    isInvalid: boolean = false;

    // attributes
    draggable: boolean = true;
    disable: boolean = true;

    title: string = "Question";
    index: number;
    examenSeparator: string = " / ";
    validityTest: string = "D&eacute;poser ici";
    nextButton: string = "Prochaine question";
    isExamenOver: boolean = false;

    constructor(
        private questionService: QuestionService,
        private userService: UserService,
        private router: Router
    ) {
        this.question = new Question();
        this.user = new User();
        questionService.refreshForQuestion.subscribe( (newUser) => {
            this.user = newUser;
            console.log(this.user.mode.toUpperCase());
            console.log("Updated user by refreshForStats in Question");
            this.updateView();
        });
    }

    initialise() : void {
        console.log("Must open once");
        this.userService.getUser().then(newUser => {
            this.user = newUser;
            console.log(this.user.mode.toUpperCase());
            console.log("Updated user by init in Question");
            this.updateView();
            this.getNextQuestion();
        });
    }

    getNextQuestion() : void {
        this.questionService.getNextQuestion(this.user.mode).then(data => {
            this.question = data;
        });
    }

    validateQuestion(attemptedAnswer) : void {
        console.log();
        this.questionService.validateQuestion(attemptedAnswer).then(data => {
            this.disable = false;
            if(data == 1) {
                this.isValid = true;
                this.validityTest = "&#x2713;";
            } else {
                this.isInvalid = true;
                this.validityTest = "&#x2717;";
            }
        })
    }

    updateView() : void {
        if(this.user.mode == "examen") {
            this.index = this.user.examen.currentexam.questionIndex;
            this.examenSeparator = " / " + this.user.examen.currentexam.totalQuestions;

            if(this.user.examen.currentexam.questionIndex >= this.user.examen.currentexam.totalQuestions) {
                this.nextButton = "Terminer";
                this.isExamenOver = true;
            }

        } else if(this.user.mode == "test") {
            this.index = this.user.test.currenttest.total;
            this.examenSeparator = "";
        }
    }

    // drag events
    onDragStart(event) : void {
        event.dataTransfer.setData("answer", event.target.id);
        event.dataTransfer.effectAllowed = "move";
    }

    onDragEnd() : void {
        this.addDragClass = false;
    }

    // drop events
    onDragEnter() : void {
        this.addDragEnterClass = true;
    }

    onDragLeave() : void {
        this.addDragEnterClass = false;
    }

    onDragOver(event) : void {
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();
    }

    onDrop(event) : void {
        event.preventDefault();

        console.log("Dropped ONCE");

        this.draggable = false;
        this.addDragEnterClass = false;

        let attemptedAnswer = event.dataTransfer.getData("answer");
        this.validateQuestion({ "attemptedAnswer" : attemptedAnswer });
    }

    // extra styling
    onMouseDown() : void {
        this.addDragClass = true;
    }

    onMouseUp() : void {
        this.addDragClass = false;
    }

    onSubmit() : void {
        if(this.isExamenOver) {
            this.userService.finishExamen().then(() => {
                this.router.navigateByUrl('resultats');
            });
        } else {
            this.reset();
            this.getNextQuestion();
        }
    }

    giveUp() : void {
        if(this.user.mode == "examen") {
            this.userService.finishExamen().then( () => {
                this.router.navigateByUrl('resultats');
            });
        } else if(this.user.mode == "test") {
            this.userService.finishTest().then( () => {
                this.router.navigateByUrl('dashboard');
            });
        }
    }

    reset() : void {
        this.draggable = true;
        this.disable = true;
        this.validityTest = "D&eacute;poser ici";
        this.isInvalid = false;
        this.isValid = false;
    }

    ngOnInit() : void {
        this.initialise();
    }

}
