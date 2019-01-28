const PdfDocument = require('pdfkit');
const {prettyDate} = require('../lib/helpers');

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
}