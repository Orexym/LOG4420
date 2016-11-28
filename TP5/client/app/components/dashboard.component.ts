import { Component, ViewChild, OnInit } from '@angular/core';
import { StatsDetailsComponent } from './stats-details.component';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit {

	@ViewChild(StatsDetailsComponent)
	public readonly modal: StatsDetailsComponent;

	showStatsWindow() {
		console.log("show stats");
	}

    ngOnInit() : void {
        this.initialise();
    }

    private initialise() {

    }

}