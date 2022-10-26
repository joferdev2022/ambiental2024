import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { checkBox } from 'src/app/models/checkBox';
import { MediumObject } from 'src/app/models/mediumObject';
import { DataService } from 'src/app/shared/services/data.service';
import { Default } from 'src/app/utils/default';

@Component({
  selector: 'app-select-mediums',
  templateUrl: './select-mediums.component.html',
  styles: [
  ]
})
export class SelectMediumsComponent implements OnInit {

  mediums: Array<checkBox> = Default.mediums;
  arrayMedium!: Array<checkBox>;
  arrayMediums2!: Array<MediumObject>;
  
  mediumsForm!: FormGroup;
  mediumsNumber: number = 0;
  nombreModificado = '';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService) {

    // this.arrayMedium = dataService.mediums ?  dataService.mediums : [];
    this.arrayMediums2 = dataService.mediums2 || [];
    console.log(this.arrayMediums2);


  }

  get mediumsSelected(): Array<checkBox> {

    const mediums: Array<any> = this.aliases.value.filter(item => item.medio !== '');

    const mediumsSelected = [];

    // podría ser usar un objeto con el id como key
    mediums.forEach(medium => {
      const medioEncontrado = this.mediums.find(medio => medio.id == medium.medio);
      if (medioEncontrado) {
        mediumsSelected.push({ ...medioEncontrado, uid: medium.uid, subName: medium.subName })
      }
    })

    console.log("mediumsSelected", mediumsSelected);


    return mediumsSelected;
  }

  ngOnInit(): void {

    // console.log(this.dataService.labData);
    // console.log("this.dataService.mediums2", this.dataService.mediums2);

    this.createSelectForm();
    console.log(this.mediumsSelected);

  }

  // private createSelectForm() {
  //   this.mediumsForm = this.formBuilder.group({
  //     aliases: this.formBuilder.array(
  //       [ (this.formBuilder.control('') )]
  //       // this.arrayMedium.map( medio => this.formBuilder.control(''))
  //       ) 
  //   });
  // }
  private createSelectForm() {
    this.mediumsForm = this.formBuilder.group({
      aliases: this.formBuilder.array(
        [this.newMediumForm2()]
      )
    });
    this.dataForm();

  }

  // newMediumForm(item?: any): FormGroup {
  //   // console.log(item);
  //   return this.formBuilder.group({
  //     uid: (new Date).getTime(),
  //     medio: new FormControl(item ? item.medio : ''),
  //     subName: new FormControl(''),
  //   });
  // }

  newMediumForm2(item?: MediumObject): FormGroup {
    // console.log(item);
    return this.formBuilder.group({
      medio: new FormControl(item ? item.id : ''),
      subName: new FormControl(item ? item.nameEdit : ''),
      uid: item ? item.uid : (new Date).getTime(),
    });
  }

  // public mediumValues(index: number, medio: any) {
  //   this.aliases.at(index).get('medio')?.setValue(medio ? medio : '');

  // }

  get aliases(): FormArray {
    return this.mediumsForm.get('aliases') as FormArray;
  };

  dataForm() {

    // while (this.aliases.length) {
    //   this.aliases.removeAt(0);
    // }

    // if (this.dataService.mediumNumber > 0) {
    //   for (let i = 1; i <= this.dataService.mediumNumber; i++) {
    //     this.aliases.push(this.newMediumForm(this.dataService.mediums[i - 1]));
    //     console.log('entro aqui');
    //     // this.mediumValues(i, this.dataService.mediums[i-1]);
    //   }
    // }

    this.aliases.clear();

    // if(this.aliases.length) {

    this.arrayMediums2.forEach(item => {
      this.aliases.push(this.newMediumForm2(item));
    });
    // }


  }

  // simulacionDeCambio (event) {
  //   // console.log(event);
  //   const ids: Array<number> = this.aliases.value.map(item => item.medio);
  //   this.mediumsSelected = this.mediums.filter(medio => ids.includes(medio.id));
  // }

  addMedium(): void {
    // this.aliases.push(this.formBuilder.control(''));
    // while (this.aliases.length) {
    //   this.aliases.removeAt(0);
    // }



    // for (let i = 1; i <= this.dataService.mediumNumber; i++) {
    //   console.log('entro aqui');

    //   if (this.dataService.mediumNumber >= i) {
    //     this.aliases.push(this.newMediumForm(this.dataService.mediums[i - 1]));
    //   } else {
    //     console.log('entro aqui');
    //     this.aliases.push(this.newMediumForm());
    //   }
    // }
    this.aliases.push(this.newMediumForm2());
    console.log(this.mediumsForm.value);
  }
  removeMedium() {
    this.aliases.removeAt(this.aliases.length - 1);
    // this.aliases.clear();
  }

  // public onMediumValues(index: number, value: any) {
  //   this.aliases.at(index).get('medio')?.setValue(value ? value.name : '');
  // }

  // onChangeEventFunc(name: string, isChecked: any) {
  //   const pruebas = (this.mediumsForm.controls['name'] as FormArray);

  //   if (isChecked['checked']) {
  //     pruebas.push(new FormControl(name));
  //   } else {
  //     const index = pruebas.controls.findIndex(x => x.value === name);
  //     pruebas.removeAt(index);
  //   }
  // }
  onNext(valor: string) {

    this.dataService.mediums2 = this.mediumsSelected.map(item => ({
      ...item,
      uid: item.uid,
      nameEdit: (this.dataService.mediums2.find(item3 => item3.id == item.id)?.nameEdit || ''),
      tests: (this.dataService.mediums2.find(item2 => item2.id == item.id)?.tests || {}),
    }));

    // console.log("this.dataService.mediums2", this.dataService.mediums2);


    // .map(item => ({...item.medio, tests: []}));

    // console.log(this.dataService.mediums);

    this.dataService.mediumNumber = this.aliases.length
    this.dataService.nombreMedio = valor;
    this.router.navigateByUrl('/select');
    // console.log(this.mediumsForm.value);
    console.log(this.aliases.value);
    console.log(this.mediumsSelected);



  }
}
