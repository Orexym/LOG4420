import {Component, OnInit, Input} from '@angular/core';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";
import {QuestionService} from "../services/question.service";

@Component({
    selector: 'my-stats',
    template: `
        <table class="statistiques"
        *ngIf="showGeneralStats">
          <caption>Statistiques g&eacute;n&eacute;rales</caption>
          <tr>
            <th>Nb tests r&eacute;ussis / effectu&eacute;s</th>
            <th>Moyenne examens</th>
          </tr>
          <tr>
            <td class="testScore">{{testScore}}</td>
            <td class="examScore">{{examScore}}</td>
          </tr>
        </table>
        <table class="statistiques"
        *ngIf="showExamens">
          <caption>R&eacute;sultats d&apos;examen</caption>
          <tr class="examenList">
            <th>Examen</th>
            <th>Domaine</th>
            <th>Score</th>
          </tr>
          <tr *ngFor="let exam of user?.examen?.previousexam | reverser | slice:0:9">
            <td>{{exam.date}}</td>
            <td>{{exam.domain | uppercase}}</td>
            <td>{{print(exam.score, exam.total)}} %</td>
          </tr>
        </table>
        <div id="statistics"
        *ngIf="showScoreCourant">
          <p id="scoreCourant">{{scoreCourant}}</p>
        </div>
    `
})

export class StatistiquesComponent implements OnInit {

    user: User;

    // strings
    scoreCourant: string;
    testScore: string;
    examScore: string;

    // booleans
    @Input()
    showGeneralStats:boolean;
    @Input()
    showExamens:boolean;
    @Input()
    showScoreCourant:boolean;

    constructor(
        private userService: UserService,
        private questionService: QuestionService
    ) {
        this.user = new User();
        questionService.refresh.subscribe( () => {
            this.userService.getUser().then(data => {
                this.user = data;
                this.populateStatistics();
            });
        });
        userService.newUser.subscribe( (newUser) => {
            this.user = newUser;
            this.populateStatistics();
        });
    }

    private initialise() {

    }

    print(score: number, total: number) : number {
        return (Math.round(score / total * 100) || 0);
    }

    populateStatistics() : void {
        if(this.user.mode == "examen") {
            this.scoreCourant = "Score courant :" + this.print(this.user.examen.currentexam.score, this.user.examen.currentexam.questionIndex) + "%";
        } else {
            this.scoreCourant = "Score courant :" + this.print(this.user.test.currenttest.score, this.user.test.currenttest.total) + "%";
        }
        this.testScore = (this.user.test.score+this.user.test.currenttest.score || 0) + " / " + (this.user.test.total+this.user.test.currenttest.total || 0);
        this.examScore = this.print(this.user.examen.score, this.user.examen.total) + "%";
    }

    ngOnInit() : void {
        this.initialise();
    }

}