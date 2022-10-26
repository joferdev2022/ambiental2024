export interface MediumObject {
  uid: number;
  id: number;
  name: string;
  // subName: string;
  medio?: number;
  nameEdit: string;
  tests: { [key: string]: string };

}

export interface Test1 {
  name: string;
  resultado: string;
}   