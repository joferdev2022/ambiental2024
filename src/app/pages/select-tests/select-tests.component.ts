import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from 'src/app/shared/services/data.service';
import { Default } from 'src/app/utils/default';
import { checkBox } from '../../models/checkBox.model';

@Component({
  selector: 'app-select-tests',
  templateUrl: './select-tests.component.html',
  styles: [
  ]
})


export class SelectTestsComponent implements OnInit {

  checkForm!: FormGroup;

  nuevoArray = [];
  title = '';
  nombreModificado = '';

  chemicals: Array<checkBox> = Default.chemicals;
  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router) {

    const activeMedio = this.dataService.medioSelected;
    console.log("activeMedio", activeMedio);
    
    this.nuevoArray = this.dataService.mediums;
    this.title = activeMedio?  `${activeMedio.name} - ${activeMedio.subName}`: '';
    // this.title = "";
  }

  ngOnInit(): void {
    this.createCheckForm();
    console.log(this.nuevoArray[0]);
  }
  
  private createCheckForm() {
    this.checkForm = this.formBuilder.group({
      name: this.formBuilder.array([])
    });
  }
  onChangeEventFunc(name: string, isChecked: any) {
   
   
    
    const pruebas = (this.checkForm.controls['name'] as FormArray);

    if (isChecked['checked']) {
      pruebas.push(new FormControl(name));
      console.log(isChecked);
    } else {
      const index = pruebas.controls.findIndex(x => x.value === name);
      pruebas.removeAt(index);
    }
  }
  onNext() {

    this.dataService.chemicals = this.checkForm.value.name;
    const testsArray: Array<string> = this.checkForm.value.name;

    // const medioIdx = this.dataService.mediums2.findIndex(item => {
    //   return item.name === this.title
    // });
    this.dataService.medioSelected.test = this.checkForm.value.name.reduce((obj,test) => {
      obj[test] = '';
      return obj
    }, {});

    // this.dataService.mediums2[medioIdx].tests = testsArray.reduce((obj, test) => {
    //   obj[test] = '';
    //   return obj;
    // }, {});

    // this.dataService.mediums2[medioIdx].nameEdit = this.nombreModificado;

    console.log(testsArray);
    console.log(this.checkForm.value);
    // console.log("medios", this.dataService.mediums[medioIdx]);
    this.router.navigateByUrl('/analysis');
  }

}
