import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisModel, Test } from 'src/app/models/analysisModel';

import { checkBox } from 'src/app/models/checkBox.model';
import { SelectModel } from 'src/app/models/selectModel';
import { TestRequestModel } from 'src/app/models/test-request.model';
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
  responde: any;

  constructor(private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.chemicalsSelected = this.dataService.chemicals;
    
    console.log(this.dataService.medios);
    
  }

  ngOnInit(): void {
    this.createSelectForm();
  }

  private createSelectForm() {
    this.selectForm = this.formBuilder.group({
      pruebas: this.formBuilder.array([])
    });
  }

  onChangeEventFunc(val: any, name: checkBox) {
    const tempString = String(name)
    const pruebas = (this.selectForm.controls['pruebas'] as FormArray);
    this.objetoRespuestas[tempString] = val;
  }

  onSearch() {
    Object.keys(this.objetoRespuestas).forEach(key => {
      this.dataService.medioSelected.test[key] = this.objetoRespuestas[key]
  })
    const respuestas: any = [];
    let respuestasPdf: any = [];
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
      if (match) {
        const percent = Math.round(totalMatch * 100 / totalRespuestas);
        respuestas.push({ ...bacteria, coincidencia: percent, porcentaje: totalMatch * 100 / pruebasHechas.length });
        respuestasPdf.push({ ...bacteria, coincidencia: `${percent}%`, porcentaje: totalMatch * 100 / pruebasHechas.length });
      }
    })

    respuestas.sort((a: any, z: any) => {
      return z.coincidencia - a.coincidencia
    })
    this.imprimirRespuesta = respuestas;

    this.alerta = true;
    this.dataService.medioSelected.resultado = respuestasPdf.slice(0,3);
  }

  onMediums() {

    this.router.navigateByUrl('/medios');
  }
  onResults() {

    console.log(this.objetoRespuestas);

    this.router.navigateByUrl('/results');

    this.saveTest();
  }
  saveTest() {
    const data = TestRequestModel.createFromObject(this.dataService.labData, this.dataService.medios)
    this.dataService.saveTest(data).subscribe(resp => {
     
      this.responde = resp;
    })
  }

}
