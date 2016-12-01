import { Component, OnInit } from '@angular/core';
import { User } from "../objects/user";
import { UserService } from "../services/user.service";

@Component({
    selector: 'my-results',
    templateUrl: 'templates/resultats'
})

export class ResultatsComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService,
    ) {
        this.user = new User();
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