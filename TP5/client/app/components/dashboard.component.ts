import { Component, ViewChild, OnInit } from '@angular/core';
import { StatsDetailsComponent } from './stats-details.component';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService,
    ) {
        this.user = new User();
    }

	@ViewChild(StatsDetailsComponent)
	public readonly modal: StatsDetailsComponent;

	showStatsWindow() {
		console.log("show stats");
	}

    private initialise() {
        this.userService.getUser().then(data => {
            this.user = data;
        });
    }

    ngOnInit() : void {
        this.initialise();
    }


}