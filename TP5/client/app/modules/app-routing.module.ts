import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from '../components/index.component';
import { DashboardComponent } from '../components/dashboard.component';
import { InstructionsComponent }  from '../components/instructions.component';
import { AdminComponent } from '../components/admin.component';

import { QuestionComponent } from '../components/question.component';
import { ResultatsComponent } from "../components/resultats.component";

const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'instructions', component: InstructionsComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'resultats', component: ResultatsComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
