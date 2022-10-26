import { Injectable } from '@angular/core';
import { AnalysisModel } from 'src/app/models/analysisModel';
import { checkBox } from 'src/app/models/checkBox';
import { LabModel } from 'src/app/models/labModel';
import { MediumObject } from 'src/app/models/mediumObject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _chemicalsSelected: Array<checkBox> = [];
  private _mediumsSelected: Array<checkBox> = [];
  private _labData!: LabModel;
  private _paraPdf!: AnalysisModel;
  private _mediumNumber: number = 0;
  private _nombreMedio: string = '';

  // pruebas
  private _mediumsSelected2: Array<MediumObject> = [];

  public get mediums2(): Array<MediumObject> {
    return this._mediumsSelected2;
  }
  public set mediums2(value: Array<MediumObject>) {
    this._mediumsSelected2 = value;
  }


  constructor() { 
    console.log('Servicio Creado');
  }

  get chemicals(): Array<checkBox> {
    return this._chemicalsSelected;
  }

  set chemicals(value: Array<checkBox>) {
    this._chemicalsSelected = value;
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
  get nombreMedio(): any {
    return this._nombreMedio;
  }

  set nombreMedio(value: any) {
    this._nombreMedio = value;
  }
}
