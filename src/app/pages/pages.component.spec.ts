import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';




describe('Pages Component', () => {

  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
      ],
      declarations: [
        PagesComponent
      ],
    }).compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear registercomponent', () => {
    
    expect(component).toBeTruthy();
  });

});