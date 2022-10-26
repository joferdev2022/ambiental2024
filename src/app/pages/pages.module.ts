import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SelectTestsComponent } from './select-tests/select-tests.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ResultsComponent } from './results/results.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { SelectMediumsComponent } from './select-mediums/select-mediums.component';





@NgModule({
  declarations: [
    HomeComponent,
    SelectTestsComponent,
    RegisterComponent,
    PagesComponent,
    AnalysisComponent,
    ResultsComponent,
    SelectMediumsComponent
  ],
  exports: [
    HomeComponent,
    SelectTestsComponent,
    RegisterComponent,
    PagesComponent,
    AnalysisComponent,
    SelectMediumsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule
    RouterModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTableModule,
    FormsModule

  ]
})
export class PagesModule { }
