import { Component, OnInit } from '@angular/core';
import { LabModel } from 'src/app/models/labModel';
import { DataService } from 'src/app/shared/services/data.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Medio } from 'src/app/models/medioModel';
import { Constants } from 'src/app/utils/constants';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columns: any = [];
  data: Array<LabModel> = [];
  dictMedios = {};
  headerTable = ['Prueba Bioquimica'];
  logo1 = Constants.LOGO1;
  logo2 = Constants.LOGO2;
  actualDate: string = '';
  listaTests: any = '';

  constructor(private dataService: DataService) {
    this.dictMedios = this.dataService.medios;
    const date = moment();
    
   this.actualDate = date.locale("es").format('D [de] MMMM [del] YYYY');
  }

  ngOnInit(): void {
    console.log(this.data);
    this.dataService.labData
    this.tableRules();
  }

  listTests() {
 
    this.dataService.listTests().subscribe(resp => {
      
      this.listaTests = resp;
    })

  }
  
  getHeaders() {
    const headers = ["Prueba bioquimica"];

    Object.values(this.dictMedios).forEach((medio: Medio) => {
      headers.push(`${medio.name}(${medio.subName})`);
    })

    return headers;

  }

  getBodyResults() {

    let body = [];

    Object.values(this.dictMedios).forEach((medio: Medio) => {
      const fila = [`${medio.name}(${medio.subName})`];

      const resultados: { bacteria: string, coincidencia: string }[] = medio.resultado

      const nombres = resultados.map((resultado) => resultado.bacteria).join(", ");
      fila.push(nombres);

      const primerResultado = resultados[0];

      fila.push(primerResultado.coincidencia)
      
      body.push(fila);
    })
    console.log(body);
    
    return body;
  }


  getBodyTable() {
    let totalTests = [];

    Object.values(this.dictMedios).forEach((medio: Medio) => {
      totalTests.push(...Object.keys(medio.test))
    })

    totalTests = [...new Set(totalTests)];

    const body = [];

    totalTests.forEach(prueba => {
      const fila = [prueba];
      Object.values(this.dictMedios).forEach((medio: Medio) => {
        if(!medio.test?.[prueba]) {
          fila.push('vacio');
        } else if(medio.test?.[prueba] == 'POSITIVO') {
          fila.push('+');
        } else if (medio.test?.[prueba] == 'NEGATIVO') {
          fila.push('-')
        }
        // fila.push(medio.test?.[prueba] || 'No tiene xd');
      })
      body.push(fila)
    })

    return body;
  }

  crearPdf() {

    const pdfDefinition: any = {
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
              ],
              color: "#757575",
              width: "*",
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
                  text: `Muestra: ${this.dataService.labData.typeItem}`,
                  margin: [2, 2],

                },
                {
                  text: `Procedencia: ${this.dataService.labData.districtItem} - ${this.dataService.labData.clientInstitution}`,
                  margin: [2, 2],

                },
                {
                  text: `Solicitante: ${this.dataService.labData.clientName} ${this.dataService.labData.clientLastName}`,
                  margin: [2, 2],
                },
                {
                  text: 'Analisis solicitados:',
                  margin: [2, 2],
                },
              ]
            },
            {
              text: `Fecha de recepción: ${this.dataService.labData.startDate}`,
              alignment: 'justify',
            }
          ]
        },
        {
          alignment: "center",
          margin: [0, 5, 0, 15],
          table: {
            alignment: "justify",
            widths : 'auto',
            body: [
              this.getHeaders(),
              ...this.getBodyTable(),
            ]
          }
        },
        {
          alignment: 'center',
          margin: [0, 5, 0, 15],
          table: {
            widths: [100, '*', 100],
            body: [
              ['Resultado', '         ', 'Efectividad de reconocimiento'],
              ...this.getBodyResults()
            ],
          },
          layout: 'noBorders'
        },
        {
          text: `Tingo María, ${this.actualDate}` ,
          // style: 'header',
          alignment: 'left'
        },
        {
          text: this.actualDate,
          // style: 'header',
          alignment: 'right'
        }
      ],
      images: {
        // is supported loading images via url with custom headers (minimal version: 0.2.5)
        logo1: this.logo1,
        logo2: this.logo2
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
        cell: (element: LabModel) => `${element.ReferenceItem}`,
      },
      {
        columnDef: 'name',
        header: 'Nombres',
        cell: (element: LabModel) => `${element.clientName}`,
      },
      {
        columnDef: 'lastName',
        header: 'Apellidos',
        cell: (element: LabModel) => `${element.clientLastName}`,
      },
      {
        columnDef: 'state',
        header: 'Estado',
        cell: (element: LabModel) => `${element.state}`,
      },
      {
        columnDef: 'institution',
        header: 'Institución',
        cell: (element: LabModel) => `${element.clientInstitution}`,
      },
      {
        columnDef: 'startDate',
        header: 'Fecha de inicio',
        cell: (element: LabModel) => `${element.startDate}`,
      },
      {
        columnDef: 'actions',
        header: 'Acciones',
      },
    ];
    this.data = this.data;
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

}
