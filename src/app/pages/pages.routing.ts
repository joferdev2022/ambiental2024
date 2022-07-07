import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from './register/register.component';
import { SelectTestsComponent } from './select-tests/select-tests.component';

export const routes: Routes = [

    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'select', component: SelectTestsComponent},
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