import { Component, OnInit } from '@angular/core';
import { LabModel } from 'src/app/models/labModel';
import { DataService } from 'src/app/shared/services/data.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columns:any = [];
  data: Array<LabModel> = [];
  arrayMediums = [];
  headerTable = ['Prueba Bioquimica'] 

  constructor(private dataService: DataService) {
   
   
    this.arrayMediums = this.dataService.mediums;
    console.log(this.arrayMediums);
    
   }

  ngOnInit(): void {
    console.log(this.data);
    this.dataService.labData
    this.tableRules();
    this.crearHeaders();
  }

  crearHeaders() {
    for (let index = 0; index < this.arrayMediums.length; index++) {
      this.headerTable.push(this.arrayMediums[index].medio.name);
      
    }
    console.log(this.headerTable);
  }

  getBodyTable () {

    const body = [];

    this.dataService.paraPdf.tests.forEach(test => {
      body.push([test.testName, test.testResult]);
    })

    return body;
  }

  crearPdf() {

    const pdfDefinition: any  = {
      content: [
        {
          columns: [
            {
              image: 'logo1',
              width: 50,
              height: 50
            },
            {
              stack: [
                {
                  text: 'UNIVERSIDAD NACIONAL AGRARIA DE LA SELVA – Tingo María',
                  style: 'header',
                  alignment: 'center'
                },
                {
                  text: 'Laboratorio de Microbiología General',
                  style: 'header',
                  alignment: 'center'
                },
                {
                  text: '---------------------------------------------',
                  style: 'header',
                  alignment: 'center'
                },
                {
                  text: 'SERVICIO DIAGNÓSTICO MICROBIOLÓGICO',
                  style: 'header',
                  alignment: 'center'
                },
                      ]
            },
            {
              image: 'logo2',
              width: 50,
              height: 50
            }
          ],
        },
        {
          alignment: 'center',
          margin: 7,
          columns: [
            {
              alignment: 'justify',
              stack: [
                {
                  text: `Muestra: ${ this.dataService.labData.typeItem}`,
                  margin: [2,2],
                  
                },
                {
                  text: `Procedencia: ${ this.dataService.labData.districtItem} - ${ this.dataService.labData.clientInstitution}`,
                  margin: [2,2],
                  
                },
                {
                  text: `Solicitante: ${ this.dataService.labData.clientName} ${ this.dataService.labData.clientLastName}`,
                  margin: [2,2],
                },
                {
                  text: 'Analisis solicitados:',
                  margin: [2,2],
                },
              ]
            },
            {
              text: `Fecha de recepción: ${ this.dataService.labData.startDate}`,
              alignment: 'justify',
            }
          ]
        },
        {
          margin: [0, 5, 0, 15],
          table: {
            body: [
              this.headerTable,
              ...this.getBodyTable(),
            ]
          }
        },
        {
          alignment: 'center',
          margin: 7,
          columns: [
            {
              stack: [
                {
                  text: 'Resultado'
                },
                {
                  type: 'none',
                  ul: [
                    'item 1',
                    'item 2',
                    'item 3',
                  ]
                }
              ]
            },
            {
              stack: [
                {
                  text: 'Efectividad de reconocimiento'
                },
                {
                  type: 'none',
                  ul: [
                    'item 1',
                    'item 2',
                    'item 3',
                  ]
                }
              ]
            }
          ]
        }
      ],
      images: {
        // is supported loading images via url with custom headers (minimal version: 0.2.5)
        logo1: {
          url: 'https://picsum.photos/id/1/200/300',
        },
        logo2: {
          url: 'https://picsum.photos/seed/picsum/200/300',
        },
      },
      styles: {
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  tableRules() {
    this.columns = [
      {
        columnDef: 'position',
        header: 'No.',
        cell: (element: LabModel) => `${element.clientDni}`,
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: LabModel) => `${element.clientName}`,
      },
      {
        columnDef: 'weight',
        header: 'Weight',
        cell: (element: LabModel) => `${element.clientLastName}`,
      },
      {
        columnDef: 'symbol',
        header: 'Symbol',
        cell: (element: LabModel) => `${element.managerName}`,
      },
    ];
    this.data = this.data;
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }
  
}
