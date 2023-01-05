import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

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
import { SelectMediumsComponent } from './select-mediums.component';
import { Medio } from 'src/app/models/medioModel';

describe('Select-mediums-component', () => {
  let component: SelectMediumsComponent;
  let fixture: ComponentFixture<SelectMediumsComponent>;
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
      declarations: [ SelectMediumsComponent ],
      providers: [
         DataService
      ]
    })
    // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMediumsComponent);
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

  it('Debería añadir  medios al array de medios y tener mas de 2 elementos', () => {

    let form = formBuilder.group({
      medioId: new FormControl( 1 ),
      subName: new FormControl('cetrimide'),
      uid: new FormControl('45'),
    });
    const mediumsForm = formBuilder.group({
      aliases: formBuilder.array([form])
    });
    component.mediumsForm = mediumsForm;
   
    
    component.addMedium();
    component.addMedium();

   
    console.log(component.aliases.length);
    console.log(component.mediumsForm);
    expect(component.aliases.length).toBeGreaterThan(2);
  });

  xit('Debería cargar datos al formulario si ya se edito antes', () => {

    const data: Medio = {
      id: 4,
      uid: 28,
      name: 'cetrimide',
      subName: 'm1',
      test: {
        'indol': 'positivo'
      },
      resultado: []
    }

   

    let form = formBuilder.group({
      medioId: new FormControl( '' ),
      subName: new FormControl(''),
      uid: new FormControl(''),
    });
    const mediumsForm = formBuilder.group({
      aliases: formBuilder.array([form])
    });
    component.mediumsForm = mediumsForm;
   
    component.dataForm();
    
    
   
    console.log(component.aliases.length);
    console.log(component.mediumsForm);
    expect(component.aliases.length).toBeGreaterThan(2);
  });
  // xit('Debe cargar los medios seleccionados', fakeAsync( ()=>{
  //   const header = ['Agar Acinetobacter', 'Agar de Aislamiento de Actinomiceto', 'Agar para Algas'];;
  //   dataService.medios = [];
  //   tick() // <= Will wait for for all microtransactions to finish
  //   expect(dataService.medios).toEqual(header);
  // }))

//   it('Init: Debe cargar los medios seleccionados', () => {

//     const medicos = ['Agar Acinetobacter', 'Agar de Aislamiento de Actinomiceto', 'Agar para Algas'];
//     spyOn(dataService, ).and.callFake( () => {
//         return from( [ medicos ] );
//     });

//     componente.ngOnInit();

//     expect( componente.medicos.length ).toBeGreaterThan(0);

// });

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
