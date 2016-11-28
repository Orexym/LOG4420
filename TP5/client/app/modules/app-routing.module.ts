import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from '../components/index.component';
import { DashboardComponent } from '../components/dashboard.component';
import { InstructionsComponent }  from '../components/instructions.component';

import { QuestionComponent } from '../components/question.component';


const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'instructions', component: InstructionsComponent },
    { path: 'question', component: QuestionComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
