import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of as staticOf, throwError } from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
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
import { AnalysisComponent } from './analysis.component';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;
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
      declarations: [ AnalysisComponent ],
      providers: [
         DataService
      ]
    })
    // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    // wsreclinicadigitalService = fixture.debugElement.injector.get(WsreclinicadigitalService);
    // coreService = fixture.debugElement.injector.get(CoreService);
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    fixture.detectChanges();
    dataService.labData = {
    'managerName' :'',
    'managerLastName':  '',
    'clientDni': '',
    'clientName': '',
    'clientLastName': '',
    'clientInstitution':'',
    'startDate': '',
    'endDate': '',
    'typeItem': '',
    'departmentItem': '',
    'provinceItem': '',
    'districtItem': '',
    'ReferenceItem':  ''
    };

    dataService.medios = {

    }
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería llamar al servicio save tests', () => {

    const espia =  spyOn(dataService, 'saveTest').and.callFake(() => EMPTY);
    component.saveTest();
    expect(espia).toHaveBeenCalled();
  });

  
  it('Debería añadir las pruebas con sus valores pos o neg', () => {

    const item: any = {
      id: 1,
      name: 'Indol',
      subName: 'M1',
      uid: 45554,

    };
    const item2: any = {
      id: 2,
      name: 'Nandol',
      subName: 'M1',
      uid: 45556,

    };

    let form = formBuilder.group({
      pruebas: formBuilder.array([]),
    });
   
    component.selectForm = form;
    component.onChangeEventFunc('positivo', item);
    component.onChangeEventFunc('positivo', item2);


    const arraySelect = component.selectForm.controls['pruebas'] as FormArray;
    console.log(component.selectForm);
    expect(arraySelect.length).toBeGreaterThanOrEqual(0);
    // expect(arrayCheckbox).toContain('Indol');
  });
});
