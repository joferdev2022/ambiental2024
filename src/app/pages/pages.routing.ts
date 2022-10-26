import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './register/register.component';
import { ResultsComponent } from './results/results.component';
import { SelectMediumsComponent } from './select-mediums/select-mediums.component';
import { SelectTestsComponent } from './select-tests/select-tests.component';

export const routes: Routes = [

    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'select', component: SelectTestsComponent},
            {path: 'analysis', component: AnalysisComponent},
            {path: 'results', component: ResultsComponent},
            {path: 'medios', component: SelectMediumsComponent},
            {path: 'notfound', component: NotFoundComponent},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
      },
];

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],

    exports: [ 
        RouterModule
    ]
})
export class PagesRoutingModule {}