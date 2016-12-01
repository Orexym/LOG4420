import { Component, ViewChild, OnInit } from '@angular/core';
import { StatsDetailsPopupComponent } from './stats-details-popup.component';
import { User } from "../objects/user";
import { UserService } from "../services/user.service";

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

	@ViewChild(StatsDetailsPopupComponent)
	public modal: StatsDetailsPopupComponent;

	showStatsWindow() {
		console.log("show stats");
		this.modal.show();
	}

    private initialise() {
        this.userService.getUser().then(data => {
            this.user = data;
        });
    }

    resetStats() : void {
	    this.userService.resetScores().then(hasDeleted => {
	        if(hasDeleted) {
	            // show banner
            }
        })
    }

    ngOnInit() : void {
        this.initialise();
    }


}
