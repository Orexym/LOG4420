import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

import { Examen } from '../objects/examen';

@Component({
    selector: 'examen-form',
    template: `
        <form 
        (ngSubmit)="onSubmit()"
        id="startExamen" method="post" action="/question">
          <p>
            <label for="domaine">Domaine :</label><span class="styled-select">
              <select id="domaine" name="domain"
                #domain
                (change)="selectOnChange(domain.value)">
                <option value="html">HTML5</option>
                <option value="css">CSS3</option>
                <option value="js">JavaScript</option>
              </select></span>
          </p>
          <p>
            <label for="nbquestions">Nombre de questions :</label>
            <input 
            [(ngModel)]="formModel.totalQuestion"
            (keypress)="cancel()"
            id="nbquestions" type="number" name="totalQuestions" value="3" step="1" min="1" max="{{tempTotal}}" />
          </p>
          <input type="submit" value="Commencer !"/>
        </form>
    `
})

export class ExamenComponent implements OnInit {

    submitted = false;
    @Input()
    exam_flag: number;
    tempTotal:number;

    formModel:Examen;

    constructor(
        private questionService: QuestionService,
        private router: Router
    ) {
        this.formModel = new Examen("html", 0);
        this.tempTotal = 0;
    }

    initialise() : void {
        this.questionService.getQuestionCount(this.formModel.domain).then(data => {
            this.formModel.totalQuestion = data;
            this.tempTotal = data;
        });
    }

    onSubmit() : void {

        if(this.exam_flag && !confirm("Un examen est déjà en cours. Voulez-vous abandonner et en débuter un nouveau?")) {
            return;
        }
        this.submitted = true;
        this.questionService.configureExamen(this.formModel.domain, this.formModel.totalQuestion).then(res => {
            this.router.navigateByUrl('question');
        });
    }


    selectOnChange(value: string) : void {
        this.formModel.domain = value;
        this.questionService.getQuestionCount(value).then(data => {
            this.tempTotal = data;
            if(data <= this.formModel.totalQuestion) {
                this.formModel.totalQuestion = data;
            }
        });
    }

    cancel() {
        return false;
    }


    ngOnInit() : void {
        this.initialise();
    }
}