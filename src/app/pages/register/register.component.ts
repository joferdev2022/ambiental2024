import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabModel } from 'src/app/models/labModel';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { TestRequestModel } from 'src/app/models/test-request.model';
// import { MatDateFormats, MAT_NATIVE_DATE_FORMATS } from '@angular/material';

 const DATE_FORMATS: MatDateFormats  = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ]
})
export class RegisterComponent implements OnInit {

  labForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private readonly adapter: DateAdapter<Date>) {
              this.adapter.setLocale("es-ES");
               }

  ngOnInit(): void {
    this.createLabForm();
  }

  
  private createLabForm() {
    this.labForm = new FormGroup({
      managerName: new FormControl('', Validators.required),
      managerLastName: new FormControl('', Validators.required),
      clientDni: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      clientLastName: new FormControl('', Validators.required),
      clientInstitution: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      typeItem: new FormControl('', Validators.required),
      departmentItem: new FormControl('', Validators.required),
      provinceItem: new FormControl('', Validators.required),
      districtItem: new FormControl('', Validators.required),
      ReferenceItem: new FormControl('', Validators.required),
    });
  }
  onSearch() {
    if (this.labForm.valid) {
      console.log(this.labForm.value);
      console.log(this.labForm);
      this.dataService.labData = LabModel.createFromObject(this.labForm.value);
      
      this.router.navigateByUrl('/medios');
    }
  }



//   test() {
//     const date = moment();
    
//     let todayDate = date.locale("es").format('dddd/MMMM/YYYY');
//     let hoy = date.locale("es").format('D [de] MMMM [del] YYYY')
//     console.log(hoy);
// }

}
