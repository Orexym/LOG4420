import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

@Component({
    selector: 'continuer-exam-form',
    template: `
        <form 
        (ngSubmit)="onSubmit()"
        *ngIf="exam_flag"
        id="continueExamen" method="post" action="./examen">
          <p>Continuer l'examen précédent</p>
          <input type="submit" value="Continuer !"/>
        </form>
    `
})

export class ContinuerExamenComponent implements OnInit, OnChanges {

    submitted = false;
    @Input()
    exam_flag: number;

    constructor(
        private questionService: QuestionService,
        private router: Router
    ) {
    }

    onSubmit() : void {
        this.submitted = true;
        this.questionService.configureTest().then(res => {
            console.log(res);
            this.router.navigateByUrl('question');
        });
    }

    initialise() : void {

    }


    ngOnChanges(changes : SimpleChanges) : void {
    }

    ngOnInit() : void {
        this.initialise();
    }
}