import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

@Component({
    selector: 'test-rapide-form',
    template: `
        <form 
        (ngSubmit)="onSubmit()"
        id="startTest" method='post' action='/question'>
          <input type='submit'  value='Commencer !'/>
        </form>
    `
})

export class TestRapideComponent {

    submitted = false;

    constructor(
        private questionService: QuestionService,
        private router: Router
    ) {}

    onSubmit() : void {
        this.submitted = true;
        this.questionService.configureTest().then(res => {
            console.log(res);
            this.router.navigateByUrl('question');
        });
    }


}