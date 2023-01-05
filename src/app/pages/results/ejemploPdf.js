content: [
    {
        columns: [
            {
                width: 100,
                stack: [
                    {
                        image: "americana",
                        width: 100,
                    },
                ],
            },
            {
                stack: [
                    "AMERICANA DE TURISMO EIRL",
                    "Calle Garcilazo N° 265 Int. 2, Cusco - Perú",
                    "Cusco - Perú",
                    "https://americanadeturismo.net",
                    "email: operaciones@americanadeturismo.net",
                    "       facturacion@americanadeturismo.net",
                    "telf: 51-240999 ; 241999 - 245999 | fax: 51-26360",
                ],
                color: "#757575",
                width: "*",
            },
            {
                stack: [
                    {
                        table: {
                            body: [
                                [
                                    {
                                        stack: ["RUC: 20358806237", payload.header.tipo, "REPRESENTACIÓN IMPRESA", `${payload.header.serie}-${payload.header.numero}`],
                                        alignment: "center",
                                    },
                                ],
                            ],
                        },
                    },
                ],
                width: "auto",
            },
        ],
    },
    {
        columns: [
            {
                width: "40%",
                stack: [
                    {
                        text: ["Sr(es): ", { text: payload.header.denominacion, bold: false }],
                        margin: [0, 0, 0, 2],
                    },
                    {
                        text: ["E-mail: ", { text: payload.header.email, bold: false }],
                    },
                ],
            },
            {
                width: "40%",
                stack: [{ text: ["RUC/DNI: ", { text: payload.header.numeroDoc, bold: false }], margin: [0, 0, 0, 2] }, { text: ["Dirección: ", { text: payload.header.direccion, bold: false }] }],
            },
            {
                width: "40%",
                stack: [{ text: ["Fecha Emisión: ", { text: payload.header.fechaEmision, bold: false }], margin: [0, 0, 0, 2] }],
            },
        ],
        margin: [0, 15, 0, 15],
    },
    table,
    // ...userMark(pContent.userMark, pContent.dateMark),
    {
        alignment: "left",
        margin: [0, 5, 0, 0],
        columns: [
            {
                width: "*",
                stack: [tableInfo],
            },
            {
                alignment: "center",
                width: 130,
                stack: [
                    {
                        qr: payload.header.qr,
                        eccLevel: "Q",
                        fit: 130,
                    },
                ],
            },
        ],
    },
]

// images: {
//     americana:
//         "data:image/jpeg;base64,/9j/4...",
// },