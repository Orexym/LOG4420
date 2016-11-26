import {Component} from "@angular/core";

@Component({
    selector: `mon-app`,
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLinkActive="active" routerLink="/heroes">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `
})


export class AppComponent {
    title = "Tour of heroes";
}