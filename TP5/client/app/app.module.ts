import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';

import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard.component';
import { InstructionsComponent }  from './instructions.component';
import { StatsDetailsComponent }  from './stats-details.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [ AppComponent, IndexComponent, DashboardComponent, InstructionsComponent, StatsDetailsComponent ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
