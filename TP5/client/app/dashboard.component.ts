import { Component, ViewChild, OnInit } from '@angular/core';
import { StatsDetailsComponent } from './stats-details.component';

import { Question } from './question';
import { QuestionService } from './question.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit {

    questionCount: Number;

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

	@ViewChild(StatsDetailsComponent)
	public readonly modal: StatsDetailsComponent;

	showStatsWindow() {
		console.log("show stats");
	}

	submitted = false;

    onSubmit() {
        this.submitted = true;
    }



    ngOnInit() : void {
        this.initialise();
    }

}