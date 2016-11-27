import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';

import { QuestionService } from './question.service';
import { UserService } from './user.service';

import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard.component';
import { InstructionsComponent }  from './instructions.component';

import { StatsDetailsComponent }  from './stats-details.component';
import { QuestionComponent } from './question.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [ AppComponent, IndexComponent, DashboardComponent, InstructionsComponent, QuestionComponent, StatsDetailsComponent ],
    providers: [ QuestionService, UserService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
