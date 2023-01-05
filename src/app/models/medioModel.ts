export interface Medio  {
    uid: number
    id: number;
    name: string;
    subName?: string;
    test: {[key: string]: string}
    resultado: []
  }