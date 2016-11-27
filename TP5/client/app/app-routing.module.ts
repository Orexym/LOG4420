import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard.component';
import { InstructionsComponent }  from './instructions.component';

import { QuestionComponent } from './question.component';


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
