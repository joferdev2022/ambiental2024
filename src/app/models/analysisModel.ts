
export class AnalysisModel {
    mediumName: string = '';
    mediumName_edit?: string = '';
    tests: Array<Test> = [];
  
    


    static createFromObject(tests: Array<Test>, mediumName): AnalysisModel {
        const newObj = new AnalysisModel();
        newObj.mediumName = mediumName;
        newObj.tests = tests;

        return newObj;
      }

      static createFromObjects(_objs: any): Array<AnalysisModel> {
        const newObjs = [];
        if (_objs instanceof Array) {
          for (const item of _objs) {
          
            console.log(item);
            
            //  newObjs.push(AnalysisModel.createFromObject(item,));
          }
        }
        return newObjs;
      }
}

export class Test {
  testName: string;
  testResult: string;
  


  static createFromObject(obj: any): Test {
    const newObj = new Test();
    newObj.testName = obj.testName;
    newObj.testResult = obj.testResult;
   
    return newObj;
  }

  static createFromObjects(_objs: any): Array<Test> {
    const newObjs = [];
    if (_objs instanceof Array) {
      for (const item of _objs) {
        console.log('entro aqui');
        
        console.log(item);
        
        newObjs.push(Test.createFromObject(item));
      }
    }
    return newObjs;
  }
}
