import { Component,ViewChild } from '@angular/core';
import { StatsDetailsComponent } from './stats-details.component';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'templates/dashboard'
})

export class DashboardComponent {

	@ViewChild(StatsDetailsComponent)
	public readonly modal: StatsDetailsComponent;

	showStatsWindow() {
		console.log("show stats");
	}

	submitted = false;

    onSubmit() {
        this.submitted = true;
    }

}