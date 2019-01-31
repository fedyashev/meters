'use strict'
const XlsxPopulate = require('xlsx-populate');

const data = [
  {id: 0, name: 'Иванов И.И.', salary: 100},
  {id: 1, name: 'Петров П.П.', salary: 200}
];

XlsxPopulate.fromBlankAsync()
  .then(workbook => {
    let row = 1;
    data.forEach(d => {
      workbook.sheet(0).cell(`A${row}`).value(d.id);
      workbook.sheet(0).cell(`B${row}`).value(d.name);
      workbook.sheet(0).cell(`C${row}`).value(d.salary);
      workbook.sheet(0).cell(`D${row}`).formula(`C${row}/5`).style('numberFormat', '0.00');
      row++;
    });
    workbook.sheet(0).cell(`C${row}`).formula(`SUM(C1:C${row-1})`).style('numberFormat', '0.00');
    workbook.sheet(0).cell(`D${row}`).formula(`SUM(D1:D${row-1})`).style('numberFormat', '0.00');
    workbook.sheet(0).range(`A${row}:B${row}`).merged(true).value('Итого:');
    return workbook.toFileAsync("./test.xlsx");
  })
  .then(done => {
    console.log('done');
  })
  .catch(err => console.log(err));