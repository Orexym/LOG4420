import {Component, OnInit, Input } from '@angular/core';
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
          <tr *ngFor="let exam of user?.examen?.previousexam | reverser | slice:0:10">
            <td>{{exam.date}}</td>
            <td>{{exam.domain | uppercase}}</td>
            <td>{{calculatePercent(exam.score, exam.total)}} %</td>
          </tr>
        </table>
        <div id="statistics"
        *ngIf="showScoreCourant">
          <p id="scoreCourant">{{scoreCourant}}</p>
        </div>
    `
})

export class StatistiquesComponent implements OnInit {

    static uIDgenerator: number = 0;
    uID: number;

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
        this.uID = StatistiquesComponent.uIDgenerator++;
        this.user = new User();
        questionService.refreshForStats.subscribe( (newUser) => {
            this.user = newUser;
            console.log("Updated user by refreshForStats in Stats by " + this.uID);
            this.populateStatistics();
        });
        userService.newUser.subscribe( (newUser) => {
            this.user = newUser;
            console.log("Updated user by newUser in Stats");
            this.populateStatistics();
        });
    }

    private initialise() {
        this.userService.getUser().then(data => {
            this.user = data;
            console.log("Updated user by init in Stats");
            this.populateStatistics();
        });
    }

    populateStatistics() : void {
        if(this.user.mode == "examen") {
            this.scoreCourant = "Score courant : " + this.calculatePercent(this.user.examen.currentexam.score, this.user.examen.currentexam.questionIndex) + "%";
        } else {
            this.scoreCourant = "Score courant : " + this.calculatePercent(this.user.test.currenttest.score, this.user.test.currenttest.total) + "%";
        }
        this.testScore = (this.user.test.score+this.user.test.currenttest.score || 0) + " / " + (this.user.test.total+this.user.test.currenttest.total || 0);
        this.examScore = this.calculatePercent(this.user.examen.score, this.user.examen.total) + "%";
    }

    ngOnInit() : void {
        this.initialise();
    }

    calculatePercent(score: number, total: number) : number {
        return (Math.round(score / total * 100) || 0);
    }

}