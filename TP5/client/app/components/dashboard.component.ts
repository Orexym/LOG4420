import { Component, ViewChild, OnInit } from '@angular/core';
import { StatsDetailsPopupComponent } from './stats-details-popup.component';
import { User } from "../objects/user";
import { UserService } from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService,
        private router: Router
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

    gotoAdmin() : void {
        this.router.navigateByUrl('admin');
    }

}
