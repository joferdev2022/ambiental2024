import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SelectTestsComponent } from './select-tests/select-tests.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    SelectTestsComponent,
    RegisterComponent,
    PagesComponent
  ],
  exports: [
    HomeComponent,
    SelectTestsComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule
    RouterModule
  ]
})
export class PagesModule { }
