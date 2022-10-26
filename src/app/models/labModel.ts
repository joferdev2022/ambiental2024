
export class LabModel {
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


    static createFromObject(obj: any): LabModel {
        const newObj = new LabModel();
        newObj.managerName = obj.managerName;
        newObj.managerLastName = obj.managerLastName;
        newObj.clientDni = obj.clientDni;
        newObj.clientName = obj.clientName;
        newObj.clientLastName = obj.clientLastName;
        newObj.clientInstitution = obj.clientInstitution;
        newObj.startDate = obj.startDate;
        newObj.endDate = obj.endDate;
        newObj.typeItem = obj.typeItem;
        newObj.departmentItem = obj.departmentItem;
        newObj.provinceItem = obj.provinceItem;
        newObj.districtItem = obj.districtItem;
        newObj.ReferenceItem = obj.ReferenceItem;
        
        
        return newObj;
      }

      static createFromObjects(_objs: any): Array<LabModel> {
        const newObjs = [];
        if (_objs instanceof Array) {
          for (const item of _objs) {
            newObjs.push(LabModel.createFromObject(item));
          }
        }
        return newObjs;
      }
}