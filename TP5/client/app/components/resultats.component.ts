import { Component, OnInit } from '@angular/core';
import { User } from "../objects/user";
import { UserService } from "../services/user.service";

const messagesList: string[] = [
    'Score final inacceptable.',
    'Score final &agrave; am&eacute;liorer.',
    'Score final passable.',
    'Score final excellent.',
    'Score final parfait.'
];

@Component({
    selector: 'my-results',
    templateUrl: 'templates/resultats'
})

export class ResultatsComponent implements OnInit {

    user: User;
    step: number = 25;
    finalScore: number;
    palier: number;
    message: string;

    constructor(
        private userService: UserService,
    ) {
        this.user = new User();
    }

    private initialise() {
        this.userService.getUser().then(result => {

             this.user = result;


             this.finalScore = this.calculatePercent(this.user.examen.currentexam.score, this.user.examen.currentexam.totalQuestions);
             this.palier = Math.floor(this.finalScore / this.step);
             this.message = messagesList[this.palier];

        })
    }

    ngOnInit() : void {
        this.initialise();
    }


    calculatePercent(score: number, total: number) : number {
        return (Math.round(score / total * 100) || 0);
    }
}