import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of as staticOf, throwError } from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  Form
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
import { RegisterComponent } from './register.component';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { LabModel } from 'src/app/models/labModel';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      declarations: [ RegisterComponent ],
      providers: [
         DataService
      ]
    })
    // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    // wsreclinicadigitalService = fixture.debugElement.injector.get(WsreclinicadigitalService);
    // coreService = fixture.debugElement.injector.get(CoreService);
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    // component = new RegisterComponent(new FormBuilder(), new Router(), new DataService());
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de crear un formulario con 12 campos', () => {
    const form = component.labForm
    // formulario = new Form(new FormBuilder());
    expect(form.contains('managerName')).toBeTruthy();
    expect(form.contains('managerLastName')).toBeTruthy();
    expect(form.contains('clientDni')).toBeTruthy();
    expect(form.contains('clientName')).toBeTruthy();
    expect(form.contains('clientLastName')).toBeTruthy();
    expect(form.contains('clientInstitution')).toBeTruthy();
    expect(form.contains('startDate')).toBeTruthy();
    expect(form.contains('endDate')).toBeTruthy();
    expect(form.contains('departmentItem')).toBeTruthy();
    expect(form.contains('provinceItem')).toBeTruthy();
    expect(form.contains('districtItem')).toBeTruthy();
    expect(form.contains('ReferenceItem')).toBeTruthy();
    
});


it('Deberia de tener el formulario valido y enviar la data de forma correcta al servicio', () => {
  const form = component.labForm;
  let labData: LabModel;
  const date: Date= new Date('Tue Nov 01 2022 00:00:00 GMT-0500 (hora estándar de Perú)');  
  expect(form.valid).toBeFalsy();
  form.controls['managerName'].setValue("Fernando");
  form.controls['managerLastName'].setValue("Lovaton");
  form.controls['clientDni'].setValue("71002152");
  form.controls['clientName'].setValue("Jose");
  form.controls['clientLastName'].setValue("Lopez");
  form.controls['clientInstitution'].setValue("UNAS");
  form.controls['startDate'].setValue(date);
  form.controls['endDate'].setValue(date);
  form.controls['typeItem'].setValue("Tierra negra");
  form.controls['departmentItem'].setValue("Cusco");
  form.controls['provinceItem'].setValue("Cusco");
  form.controls['districtItem'].setValue("Cusco");
  form.controls['ReferenceItem'].setValue("BRUNAS");
  
  component.onSearch();
  labData = form.value;
  expect(form.valid).toBeTruthy();
  expect(dataService.labData).toEqual(LabModel.createFromObject(form.value));
});

  // it('Debería obtener valores de registro', () => {
  //   const form = new FormGroup({
  //     plan: new FormControl( '1', Validators.required),
  //     planPaymentFract: new FormControl( '10001', Validators.required),
  //     planPolicyStartDate: new FormControl('2020-09-11', Validators.required),
  //     planPolicyEndDate: new FormControl('2021-09-11', Validators.required),
  //   });
  //   component.planForm = form;
  // });

  // it('Debería cargar la relacion de precios', () => {
  //   Observable.of = staticOf;
  //   const mockRateResponse = staticOf(HelperUnitTest.ratesResponse);
  //   const apyRate = spyOn<any>(wsreclinicadigitalService, 'rates').and.returnValue(mockRateResponse);
  //   component.loadRates();
  //   expect(apyRate).toHaveBeenCalled();
  // });

  // it('Debería cargar el fraccionamiento de pagos', () => {
  //   Observable.of = staticOf;
  //   const mockParameterResponse = staticOf(HelperUnitTest.paremetersResponse);
  //   const apyParameter = spyOn<any>(wsreclinicadigitalService, 'rates').and.returnValue(mockParameterResponse);
  //   component.loadRates();
  //   expect(apyParameter).toHaveBeenCalled();
  // });
});
