import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";

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
        private userService: UserService,
        private router: Router
    ) {}

    onSubmit() : void {
        this.submitted = true;
        this.userService.configureTest().then(res => {
            this.router.navigateByUrl('question');
        });
    }


}