import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { checkBox } from 'src/app/models/checkBox.model';
import { Medio } from 'src/app/models/medioModel';
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
  dictMedios: { [key: number]: Medio } = {}

  arrayMedium!: Array<checkBox>;
  arrayMediums2!: { [key: number]: Medio };

  mediumsForm!: FormGroup;
  mediumsNumber: number = 0;
  nombreModificado = '';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService) {

    // this.arrayMedium = dataService.mediums ?  dataService.mediums : [];
    this.arrayMediums2 = dataService.medios || [];
    // console.log(this.arrayMediums2);
  }

  get mediumsSelected(): Array<any> {
    const selected = [];
    const dictMedios = this.dataService.medios;

    Object.keys(dictMedios).forEach(uid => {
      const medio: Medio = dictMedios[uid];
      selected.push(medio);
    })
    return selected;
  }

  ngOnInit(): void {
    this.createSelectForm();
  }
  private createSelectForm() {
    this.mediumsForm = this.formBuilder.group({
      aliases: this.formBuilder.array(
        [this.newMediumForm({})]
      )
    });
    this.dataForm();

  }
  newMediumForm({ uid = null, item = null }): FormGroup {
    return this.formBuilder.group({
      medioId: new FormControl(item ? item.id : ''),
      subName: new FormControl(item ? item.subName : ''),
      uid,
    });
  }

  get aliases(): FormArray {
    return this.mediumsForm.get('aliases') as FormArray;
  };

  dataForm() {
    this.aliases.clear();

    Object.keys(this.dataService.medios).forEach(uid => {
      const medio = this.dataService.medios[uid]
      this.aliases.push(this.newMediumForm({uid, item: medio}));
    })
  }

  addMedium(): void {
    const uid = (new Date()).getTime()

    this.dataService.medios[uid] = {
      uid: uid,
      id: null,
      name: "",
      subName: "",
      test: {},
      resultado: []
    }

    this.aliases.push(this.newMediumForm({ uid }));
  }

  removeMedium() {
    this.aliases.removeAt(this.aliases.length - 1);
    // this.aliases.clear();
  }

  onSubnameChange(e, listItem) {
    const subName = e.target.value;
    const uid = listItem.value.uid;

    this.dataService.medios[uid].subName = subName;
  }

  onMedioChange(medioId, listItem) {
    const uid = listItem.value.uid;

    const find = this.mediums.find(item => item.id == medioId);

    this.dataService.medios[uid].id = medioId;
    this.dataService.medios[uid].name = find?.name || '';
  }

  checar() {
    console.log("this.dataService.medios", this.dataService.medios);
  }
  onNext(medio: Medio) {
    this.dataService.medioSelected = medio;
    this.router.navigateByUrl('/select');
  }
}
