import { LabModel } from "./labModel";
import { Medio } from "./medioModel";

export class TestRequestModel {
    managerName: string = '';
    managerLastName: string = '';
    clientDni: string = '';
    clientName: string = '';
    clientLastName: string = '';
    clientInstitution: string = '';
    startDate: string = '';
    endDate: string = '';
    typeItem: string = '';
    departmentItem: string = '';
    provinceItem: string = '';
    districtItem: string = '';
    ReferenceItem: string = '';
    medios: { [key: number]: Medio } = {};

  static createFromObject(labData: LabModel, medioData: { [key: number]: Medio }): TestRequestModel {
    const newObj = new TestRequestModel();
    newObj.managerName = labData.managerName;
    newObj.managerLastName = labData.managerLastName;
    newObj.clientDni = labData.clientDni;
    newObj.clientName = labData.clientName;
    newObj.clientLastName = labData.clientLastName;
    newObj.clientInstitution = labData.clientInstitution;
    newObj.startDate = labData.startDate;
    newObj.endDate = labData.endDate;
    newObj.typeItem = labData.typeItem;
    newObj.departmentItem = labData.departmentItem;
    newObj.provinceItem = labData.provinceItem;
    newObj.districtItem = labData.districtItem;
    newObj.ReferenceItem = labData.ReferenceItem;
    newObj.medios = medioData;
    return newObj;
  }

  
}