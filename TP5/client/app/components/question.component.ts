import {Component, OnInit, SecurityContext} from '@angular/core';

import { Question } from '../objects/question';
import { QuestionService } from '../services/question.service';
import { User } from '../objects/user';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question'
})

export class QuestionComponent implements OnInit {

    question: Question;
    user: User;

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

        });
    }

    validateQuestion(attemptedAnswer) : void {
        this.questionService.validateQuestion(attemptedAnswer).then(data => {
            this.disable = false;
            this.draggable = false;
            if(data == 1) {
                this.isValid = true;
                this.validityTest = "&#x2713;";
            } else {
                this.isInvalid = true;
                this.validityTest = "&#x2717;";
            }
        })
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
            this.router.navigateByUrl('resultats');
        } else {
            this.reset();
            this.getNextQuestion();
        }
    }

    reset() : void {
        this.disable = true;
        this.validityTest = "D&eacute;poser ici";
        this.isInvalid = false;
        this.isValid = false;
    }

    ngOnInit() : void {
        this.initialise();
    }

}