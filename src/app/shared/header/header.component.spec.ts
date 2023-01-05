import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of as staticOf, throwError } from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
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
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DataService } from 'src/app/shared/services/data.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dataService: DataService;
  // let wsreclinicadigitalService: WsreclinicadigitalService;
  let formBuilder: FormBuilder;
  // let coreService: CoreService;
  // let confirmation: ConfirmationModel;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatExpansionModule,
      ],
      declarations: [ HeaderComponent ],
      providers: [
         DataService
      ]
    })
    // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    // wsreclinicadigitalService = fixture.debugElement.injector.get(WsreclinicadigitalService);
    // coreService = fixture.debugElement.injector.get(CoreService);
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });



});
