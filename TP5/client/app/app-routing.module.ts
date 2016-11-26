import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard.component';
import { InstructionsComponent }  from './instructions.component';
/*import { QuestionComponent } from './question.component';
import { ResultComponent } from './results.component';
import { StatsComponent } from './stats.component';
import { AdminComponent } from './admin.component';*/

const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'instructions', component: InstructionsComponent },
    /*{ path: 'admin', component: AdminComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'results', component: ResultComponent },
    { path: 'stats', component: StatsComponent }*/
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
