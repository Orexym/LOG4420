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
import { AdminComponent } from '../components/admin.component';
import { ResultatsComponent } from "../components/resultats.component";

import { StatsDetailsPopupComponent }  from '../components/stats-details-popup.component';
import { QuestionComponent } from '../components/question.component';
import { StatistiquesComponent } from "../components/statistiques.component";

import { TestRapideComponent } from '../forms/test-rapide-form.component';
import { ExamenComponent } from '../forms/examen-form.component';
import { ContinuerExamenComponent } from "../forms/continuer-exam-form.component";
import { ReversePipe } from "../pipes/reverse.pipe";

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
        StatsDetailsPopupComponent,
        TestRapideComponent,
        ExamenComponent,
        AdminComponent,
        ContinuerExamenComponent,
        StatistiquesComponent,
        ResultatsComponent,
        ReversePipe
    ],
    providers: [
        QuestionService,
        UserService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
