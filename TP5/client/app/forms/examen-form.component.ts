import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';


@Component({
    selector: 'examen-form',
    template: `
        <form 
        (submit)="onSubmit()"
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
            #totalQuestions
            (change)="inputOnChange(totalQuestions.value)"
            id="nbquestions" type="number" name="totalQuestions" value="3" step="1" min="1" max="10" />
          </p>
          <input type="submit" value="Commencer !"/>
        </form>
    `
})

export class ExamenComponent implements OnInit {

    submitted = false;
    data: String;

    domain: String;
    questionCount: Number = 0;

    formModel

    constructor(
        private questionService: QuestionService
    ) {
        this.questionCount = 0;
    }

    initialise() : void {
        this.questionService.getQuestionCountTotal().then(data => {
            this.questionCount = data;
        });
    }

    onSubmit(data) : void {
        this.submitted = true;
        this.data = JSON.stringify(data, null, 2);
        console.log(this.data);
    }


    selectOnChange(value: string) : void {
        this.questionService.getQuestionCount(value).then(data => {
            this.questionCount = data;
        });
    }

    inputOnChange(value: string) : void {
        console.log(value);
    }


    ngOnInit() : void {
        this.initialise();
    }
}