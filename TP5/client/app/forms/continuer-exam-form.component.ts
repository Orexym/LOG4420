import {Component, Input, OnInit } from '@angular/core';
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

export class ContinuerExamenComponent implements OnInit {

    submitted = false;
    @Input()
    exam_flag: number;

    constructor(
        private router: Router
    ) {
    }

    onSubmit() : void {
        this.submitted = true;
        this.router.navigateByUrl('question');
    }

    initialise() : void {

    }

    ngOnInit() : void {
        this.initialise();
    }
}