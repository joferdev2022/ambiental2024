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
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
      declarations: [ HomeComponent ],
      providers: [
         DataService
      ]
    })
    // .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [ConfirmationModalComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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

  it('Debería cargar el formularios', () => {

    component.ngOnInit();
  
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
