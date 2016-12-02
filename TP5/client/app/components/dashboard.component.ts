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
    
    bannerText: string;
    
    private bannerHidden = true;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user = new User();
        this.hideBanner();
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
				this.bannerText = "Scores effacés";
				this.showBanner();
				setTimeout(() => this.hideBanner(), 2000);
            }
        })
    }

    ngOnInit() : void {
        this.initialise();
    }

    gotoAdmin() : void {
        this.router.navigateByUrl('admin');
    }
    
    hideBanner() : void {
		this.bannerHidden = true;
    }
    
    showBanner() : void {
		this.bannerHidden = false;
    }

}
