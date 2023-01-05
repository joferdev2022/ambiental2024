import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnalysisModel } from 'src/app/models/analysisModel';
import { checkBox } from 'src/app/models/checkBox.model';
import { LabModel } from 'src/app/models/labModel';
import { Medio } from 'src/app/models/medioModel';
import { MediumObject } from 'src/app/models/mediumObject';
import { TestRequestModel } from 'src/app/models/test-request.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private base_url = 'http://localhost:3000/api';
  private _chemicalsSelected: Array<checkBox> = [];
  private _mediumsSelected: Array<checkBox> = [];
  private _labData!: LabModel;
  private _paraPdf!: AnalysisModel;
  private _mediumNumber: number = 0;
  private _medioSelected: Medio;
  private _dictMedios: { [key: number]: Medio } = {
    // "1667314628895": {
    //   "uid": 1667314628895,
    //   "id": 31,
    //   "name": "Cetrimide",
    //   "subName": "m1",
    //   "test": {
    //     "Indol(I)": "NEGATIVO",
    //     "Rojo de Metilo(RM)": "NEGATIVO",
    //     "Voges-Proskauer(VP)": "NEGATIVO"
    //   }
    // },
    // "1667314629390": {
    //   "uid": 1667314629390,
    //   "id": 31,
    //   "name": "Cetrimide",
    //   "subName": "m2",
    //   "test": {
    //     "Rafinosa": "POSITIVO",
    //     "Ramnosa": "POSITIVO"
    //   }
    // }
  };

  // pruebas
  private _mediumsSelected2: Array<MediumObject> = [];

  public get mediums2(): Array<MediumObject> {
    return this._mediumsSelected2;
  }
  public set mediums2(value: Array<MediumObject>) {
    this._mediumsSelected2 = value;
  }


  constructor(public http: HttpClient) {
    console.log('Servicio Creado');
  }

  get chemicals(): Array<checkBox> {
    return this._chemicalsSelected;
  }

  set chemicals(value: Array<checkBox>) {
    this._chemicalsSelected = value;
  }

  get medios(): { [key: number]: Medio } {
    return this._dictMedios;
  }

  set medios(value: { [key: number]: Medio }) {
    this._dictMedios = value;
  }

  get mediums(): Array<checkBox> {
    return this._mediumsSelected;
  }

  set mediums(value: Array<checkBox>) {
    this._mediumsSelected = value;
  }

  get labData(): LabModel {
    return this._labData;
  }

  set labData(value: LabModel) {
    this._labData = value;
  }
  get mediumNumber(): number {
    return this._mediumNumber;
  }

  set mediumNumber(value: number) {
    this._mediumNumber = value;
  }
  get paraPdf(): AnalysisModel {
    return this._paraPdf;
  }

  set paraPdf(value: AnalysisModel) {
    this._paraPdf = value;
  }
  get medioSelected(): Medio {
    return this._medioSelected;
  }

  set medioSelected(value: Medio) {
    this._medioSelected = value;
  }

  public saveTest(test: TestRequestModel){
    const url = `${ this.base_url }/test`;
    return this.http.post(url, test);
                
  }

  public listTests(){
    const url = `${ this.base_url }/test`;
    return this.http.get<{ok: boolean, tests: { [key: number]: Medio }}>( url )
              .pipe(
                map( (resp) => resp.tests)
              );
                
  }
}
