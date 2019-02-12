const PdfDocument = require('pdfkit');
const {prettyDate} = require('../../lib/helpers');
const PdfPrinter = require('pdfmake');

module.exports.report = report => {
    const doc = new PdfDocument({});
    doc.registerFont('Roboto', 'fonts/Roboto/Roboto-Regular.ttf');
    doc.font('Roboto');
    doc.text(`Отчет № ${report.id}`);
    doc.text(`Дата: ${prettyDate(report.date)}`);
    doc.text(`Инспектор: ${report.Inspector.name}`);
    doc.text(`Потребитель: ${report.Consumer.name}`);
    doc.text(`Место: ${report.Place.name}`);
    doc.text(`Счетчик: ${report.Meter.number}`);
    doc.text(` `);
    doc.text(`Предыдущие показания:`);
    doc.text(`   дата: ${report.LastData ? prettyDate(report.LastData.date) : '---'}`);
    doc.text(`   показания: ${report.LastData ? report.LastData.value : '---'}`);
    doc.text(` `);
    doc.text(`Текущие показания:`);
    doc.text(`   дата: ${report.CurrentData ? prettyDate(report.CurrentData.date) : '---'}`);
    doc.text(`   показания: ${report.CurrentData ? report.CurrentData.value : '---'}`);
    doc.text(` `);
    const w = report.LastData ? report.CurrentData.value - report.LastData.value : report.CurrentData.value;
    doc.text(`Потребление за период: ${w}`);
    doc.text(` `);

    if (report.Sign) {
        const fileContent = Buffer.from(report.Sign.data, 'base64');
        doc.text(`Подпись потребителя:`);
        doc.image(fileContent, 75, 330, { width: 100 });
        doc.moveTo(75, 430)
            .lineTo(275, 430)
            .stroke();
    }
    return doc;
};

module.exports.reportBrand = report => {
    const fonts = {
        Roboto: {
            normal: 'fonts/Roboto/Roboto-Regular.ttf',
            bold: 'fonts//Roboto/Roboto-Medium.ttf',
            italics: 'fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };
    
    const printer = new PdfPrinter(fonts);
    
    const dd = {
        pageSize: 'A4',
        pageMargins: [ 60, 10, 30, 30 ],
        content: [
            {
                table: {
                    widths: ['*', 150, '*'],
                    body: [
                        [
                            {
                                text: '',
                                border: [0,0,0,0],
                            },
                            {
                                image: 'lib/pdf-templates/image/logo.png',
                                width: 150,
                                height: 150,
                                border: [0,0,0,0]
                            },
                            {
                                text: '',
                                border: [0,0,0,0]
                            }
                        ]
                    ]
                },
                margin: [0, 0, 0, 15]
            },
            {
                text: 'AKT',
                bold: true,
                fontSize: 14,
                alignment: 'center'
            },
            {
                text: 'приема-передачи электрической энергии',
                bold: true,
                fontSize: 14,
                alignment: 'center',
                margin: [0, 0, 0, 30]
            },
            {
                table: {
                    widths: [ '35%', '*' ],
                    body: [
                        [
                            {
                                border: [false, false, true, true],
                                text: 'Инспектор',
                                alignment: 'right',
                                margin: [0, 5, 10, 5]
                            },
                            {
                                border: [true, false, false, true],
                                text: `ООО "Инстасервис"\n${report.Inspector.name}`,
                                alignment: 'center'
                            },
                        ],
                        [
                            {
                                border: [false, false, true, true],
                                text: 'Потребитель',
                                alignment: 'right',
                                margin: [0, 5, 10, 5]
                            },
                            {
                                border: [true, false, false, true],
                                text: `${report.Consumer.name}`,
                                alignment: 'center',
                                margin: [0, 5, 0, 5]
                            },
                        ],
                        [
                            {
                                border: [false, false, true, true],
                                text: 'Номер счетчика',
                                alignment: 'right',
                                margin: [0, 5, 10, 5]
                            },
                            {
                                border: [true, false, false, true],
                                text: `№${report.Meter.number}`,
                                alignment: 'center',
                                margin: [0, 5, 0, 5]
                            },
                        ],
                        [
                            {
                                border: [false, false, true, true],
                                text: 'Место установки счетчика',
                                alignment: 'right',
                                margin: [0, 5, 10, 5]
                            },
                            {
                                border: [true, false, false, true],
                                text: `Рынок "Северный" ${report.Place.name}`,
                                alignment: 'center',
                                margin: [0, 5]
                            },
                        ],
                    ]
                },
                margin: [0, 0, 0, 30]
            },
            {
                table: {
                    widths: ['35%', '35%', '*'],
                    body: [
                        [
                            {
                                text: 'Предыдущие показания',
                                alignment: 'center',
                                margin: [0, 5]
                            },
                            {
                                text: 'Текущие показания',
                                alignment: 'center',
                                margin: [0, 5]
                            },
                            {
                                rowSpan: 4,
                                text: 'Потребление электроэнергии за отчетный период,\nкВтч',
                                alignment: 'center',
                                margin: [0, 40, 0, 0]
                            },
                        ],
                        [
                            {
                                text: 'Дата, время',
                                alignment: 'center'
                            },
                            {
                                text: 'Дата, время',
                                alignment: 'center'
                            },
                        ],
                        [
                            {
                                text: `${report.LastData ? prettyDate(report.LastData.date) : '---'}`,
                                fontSize: 14,
                                bold: true,
                                alignment: 'center',
                                margin: [30, 5]
                            },
                            {
                                text: `${report.CurrentData ? prettyDate(report.CurrentData.date) : '---'}`,
                                fontSize: 14,
                                bold: true,
                                alignment: 'center',
                                margin: [30, 5]
                            },
                        ],
                        [
                            {
                                text: 'Показания счетчика',
                                alignment: 'center',
                                margin: [0, 5]
                            },
                            {
                                text: 'Показания счетчика',
                                alignment: 'center',
                                margin: [0, 5]
                            },
                        ],
                        [
                            {
                                text: `${report.LastData ? report.LastData.value : '---'}`,
                                fontSize: 14,
                                bold: true,
                                alignment: 'center',
                                margin: [0, 5]
                            },
                            {
                                text: `${report.CurrentData ? report.CurrentData.value : '---'}`,
                                fontSize: 14,
                                bold: true,
                                alignment: 'center',
                                margin: [0, 5]
                            },
                            {
                                text: `${report.LastData ? report.CurrentData.value - report.LastData.value : report.CurrentData.value}`,
                                fontSize: 20,
                                bold: true,
                                color: 'red',
                                alignment: 'center',
                                margin: [0, 1]
                                
                            },
                        ],
                    ]
                },
                margin: [0, 0]
            },
            {
                table: {
                    widths: ['30%', 100, '*'],
                    body: [
                        [
                            {
                                text: 'Подпись потребителя',
                                alignment: 'right',
                                border: [0,0,0,0],
                                margin: [0, 85, 0, 0]
                            },
                            // {
                            //     //text: '123',
                            //     image: 'sampleImage.jpg',
                            //     width: 100,
                            //     height: 100,
                            //     border: [0,0,0,1]
                            // },
                            (report.Sign.data ?
                                {
                                    //image: 'data:image/png;base64,' + Buffer.from(report.Sign.data, 'base64'),
                                    image: report.Sign.data,
                                    width: 100,
                                    height: 100,
                                    border: [0,0,0,1]
                                } :
                                {
                                    text: '',
                                    border: [0,0,0,1]
                                }
                            ),
                            {
                                text: '',
                                border: [0,0,0,0]
                            }
                        ]
                    ]
                },
                margin: [0, 0, 0, 90]
            },
            {
                text: 'Обслуживание электрохозяйства',
                alignment: 'right',
                color: 'gray'
            },
            {
                text: 'ООО «Инстасервис»',
                alignment: 'right',
                color: 'gray'
            },
            {
                text: 'instaservice.by',
                link: 'http://instaservice.by',
                alignment: 'right',
                color: 'gray'
            },
            {
                text: '8 (029) 530-51-15',
                alignment: 'right',
                color: 'gray'
            },
        ],
    };
    
    const pdfDoc = printer.createPdfKitDocument(dd);
    // pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
    // pdfDoc.end();
    return pdfDoc;
};