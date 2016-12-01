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
	public readonly modal: StatsDetailsPopupComponent;

	showStatsWindow() {
		console.log("show stats");
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
                /*
                 $("#banner").html("Résultats précédents vidés avec succès");
                 $("#banner").animate({
                 right: '20px'
                 },400)
                 .delay(2000)
                 .animate({
                 right: '-270px'
                 },400);
                 */
            }
        })
    }

    ngOnInit() : void {
        this.initialise();
    }


}