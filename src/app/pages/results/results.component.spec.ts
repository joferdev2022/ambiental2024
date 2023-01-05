import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPTY, Observable, of as staticOf, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DataService } from 'src/app/shared/services/data.service';
import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
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
      declarations: [ResultsComponent],
      providers: [
        DataService
      ]
    })
      // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    // wsreclinicadigitalService = fixture.debugElement.injector.get(WsreclinicadigitalService);
    // coreService = fixture.debugElement.injector.get(CoreService);
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    fixture.detectChanges();
    dataService.medios = [
      {
        uid: 123,
        id: 1,
        name: 'capicua',
        subName: 'm1',
        test: {
          'Indol': 'positivo'
        },
        resultado: []
        
        }
    ];

    component.dictMedios = [
      {
        uid: 123,
        id: 1,
        name: 'capicua',
        subName: 'm1',
        test: {
          'Indol': 'positivo'
        },
        resultado: []
        
        }
    ];
  });


  it('Debería llamar al servicio list tests', () => {

    const espia =  spyOn(dataService, 'listTests').and.callFake(() => EMPTY);
    component.listTests();
    expect(espia).toHaveBeenCalled();
  });
  it('Debería devolver un arreglo con al menos 1 elemento', () => {

    //const espia =  spyOn(dataService, 'listTests').and.callFake(() => EMPTY);
    component.getBodyTable();
    console.log(component.getBodyTable());
    
    expect(component.getBodyTable().length).toBeGreaterThanOrEqual(1);
  });
  it('Debería devolver un arreglo de headers con al menos 1 elemento', () => {

  
    component.getHeaders();
    console.log(component.getHeaders());
    
    expect(component.getHeaders().length).toBeGreaterThanOrEqual(1);
  });
  it('Debería devolver un arreglo con los elementos indicados', () => {

    const arreglo = ['Prueba bioquimica', 'capicua(m1)']
    component.getHeaders();
    console.log(component.getHeaders());
    
    expect(component.getHeaders()).toEqual(arreglo);
  });
});
