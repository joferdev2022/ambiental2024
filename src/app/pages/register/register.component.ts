import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabModel } from 'src/app/models/labModel';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  labForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService) { }

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
    
    // if (this.labForm.valid) {
      
      console.log(this.labForm.value);

      this.dataService.labData = LabModel.createFromObject(this.labForm.value);
      this.router.navigateByUrl('/medios');
    // }

  }

}
