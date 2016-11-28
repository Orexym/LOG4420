import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from '../components/app.component';

import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

import { IndexComponent } from '../components/index.component';
import { DashboardComponent } from '../components/dashboard.component';
import { InstructionsComponent }  from '../components/instructions.component';

import { StatsDetailsComponent }  from '../components/stats-details.component';
import { QuestionComponent } from '../components/question.component';

import { TestRapideComponent } from '../forms/test-rapide-form.component';
import { ExamenComponent } from '../forms/examen-form.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        DashboardComponent,
        InstructionsComponent,
        QuestionComponent,
        StatsDetailsComponent,
        TestRapideComponent,
        ExamenComponent
    ],
    providers: [
        QuestionService,
        UserService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
