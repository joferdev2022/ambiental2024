import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisModel, Test } from 'src/app/models/analysisModel';

import { checkBox } from 'src/app/models/checkBox';
import { SelectModel } from 'src/app/models/selectModel';
import { DataService } from 'src/app/shared/services/data.service';
import { Default } from 'src/app/utils/default';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styles: [
  ]
})


export class AnalysisComponent implements OnInit {

  selectForm!: FormGroup;

  chemicalsSelected: Array<checkBox> = [];
  opcionTypes = Default.OPCION_TYPES;
  bacteriasDiccionario = Default.bacterias;
  objetoRespuestas: any = {};
  imprimirRespuesta: Array<any> = [];
  alerta: boolean = false;

  constructor(private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.chemicalsSelected = this.dataService.chemicals;
  }

  ngOnInit(): void {
    this.mostrarContent();
    this.createSelectForm();
  }

  private createSelectForm() {
    this.selectForm = this.formBuilder.group({
      // pruebas: this.formBuilder.array([
      //   this.formBuilder.control('')
      // ])
      pruebas: this.formBuilder.array([])
      // pruebas: [ null ]
    });
  }

  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     id: '',
  //     name: ''
  //   });
  // }

  // get pruebas() {
  //   return this.selectForm.get('pruebas') as FormArray;
  // }
  // addSelect() {
  //   this.pruebas.push(this.formBuilder.control(''));
  // }
  mostrarContent() {
    console.log(this.chemicalsSelected);
  }
  onChangeEventFunc(val: any, name: checkBox) {
    // console.log({val, name});

    const tempString = String(name)

    const pruebas = (this.selectForm.controls['pruebas'] as FormArray);

    this.objetoRespuestas[tempString] = val;

    // pruebas.push(new FormControl({val, name}));

    console.log(this.objetoRespuestas);



    // const index = pruebas.controls.findIndex(x => x.value.name === name);    
    // if(pruebas.length > 1 &&  pruebas.controls.includes()) {
    //   console.log(pruebas.value);

    //   pruebas.removeAt(index);
    // }

    // if(pruebas.controls[index].value.name === name) {


    // }
    // pruebas.removeAt(index);

    // if(e.source.selected) {
    //   const index = pruebas.controls.findIndex(x => x.value.name === name);

    //   if(pruebas.controls[index].value.name === name) {
    //     // console.log(pruebas.controls[index].value);
    //     pruebas.removeAt(index);
    //   }
    //   console.log('se selecciono: ' + e.value);
    // }

    // console.log(index);
    // if (isChecked['checked']) {
    //   pruebas.push(new FormControl(name));
    // } else {
    //   const index = pruebas.controls.findIndex(x => x.value === name);
    //   pruebas.removeAt(index);
    // }
  }

  onSearch() {


    const respuestas: any = [];

    this.bacteriasDiccionario.forEach(bacteria => {
      let match: boolean = false;
      let totalRespuestas = Object.keys(bacteria.pruebasObjeto).length
      let totalMatch = 0;
      const pruebasHechas: any = Object.keys(this.objetoRespuestas);


      Object.keys(this.objetoRespuestas).forEach(prueba => {
        const valor = this.objetoRespuestas[prueba];

        const result = (bacteria.pruebasObjeto[prueba] == valor);
        match = match || result;

        if (result) {
          totalMatch++;
        }
      });

      const pruebasNoHechas = Object.keys(bacteria.pruebasObjeto).filter(prueba => !pruebasHechas.includes(prueba));

      // pruebasNoHechas.forEach(prueba => {
      //   if (bacteria.pruebasObjeto[prueba] == '(+ o -)') {
      //     totalRespuestas--;
      //   }
      // })

      if (match) {
        respuestas.push({ ...bacteria, coincidencia: totalMatch * 100 / totalRespuestas, porcentaje: totalMatch * 100 / pruebasHechas.length });
      }
    })

    respuestas.sort((a: any, z: any) => {
      return z.coincidencia - a.coincidencia
    })

    console.log({ respuestas });

    this.imprimirRespuesta = respuestas;

    this.alerta = true;
    // console.log(this.objetoRespuestas);
    // console.log(this.bacteriasDiccionario);

  }


  getPorcentaje(value: any) {
    const valueRedondeado = Math.round(value);
    console.log(valueRedondeado)
    return `${value}`;
  }
  onMediums() {

    this.router.navigateByUrl('/medios');
  }
  onResults() {
    const activeMediumTitle = this.dataService.nombreMedio;
    const activeMediumIdx = this.dataService.mediums2.findIndex(item => item.name == activeMediumTitle );
    const activeMedium = this.dataService.mediums2[activeMediumIdx];

    Object.keys(this.objetoRespuestas).forEach(key => (
      activeMedium.tests[key] = this.objetoRespuestas[key]
    ));

    console.log(activeMedium);

    // const respuestasArray: Array<Test> = Object.keys(this.objetoRespuestas).map((key) => Test.createFromObject({
    //   testName: key,
    //   testResult: this.objetoRespuestas[key],
    // }));

    // this.dataService.paraPdf = AnalysisModel.createFromObject(respuestasArray, this.dataService.nombreMedio);


    // this.router.navigateByUrl('/results');
    // console.log(this.dataService.paraPdf);

  }

}
// const temp = [
//   {
//     MEDIO: "CETRIMIDE",
//     MEDIO_NOMBRE: "CETRIMIDE 1",
//     TESTS: {
//       "INDOL": "POSITIVO",
//       "RM": "NEGATIVO",
//     }
//   },
//   {
//     MEDIO: "CETRIMIDE",
//     MEDIO_NOMBRE: "CETRIMIDE 2",
//     TESTS: {
//       "INDOL": "POSITIVO",
//       "RM": "NEGATIVO",
//     }
//   },
//   {
//     MEDIO: "ALGA",
//     MEDIO_NOMBRE: "ALGA 1",
//     TESTS: {
//       "INDOL": "POSITIVO",
//       "RM": "NEGATIVO",
//     }
//   },
// ]