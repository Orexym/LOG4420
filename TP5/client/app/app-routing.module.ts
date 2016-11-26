import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard.component';
import { InstructionsComponent }  from './instructions.component';


const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'instructions', component: InstructionsComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
