const XlsxPopulate = require('xlsx-populate');

module.exports.registerToXlsx = register => {
  if (!register) return null;
  return XlsxPopulate.fromBlankAsync()
    .then(workbook => {
      registerSheet(workbook.sheet(0), register);
      return workbook.outputAsync();
    })
};

const registerSheet = (sheet, register) => {
  if (!sheet || !register) return;
  let row = 1;
  sheet.range(`A${row}:G${row}`).merged(true).value('Реестр'); row++;
  sheet.range(`A${row}:G${row}`).merged(true).value(register.name); row++;
  row++;
  let itemsfirstRow = null;
  let subsConsumptionRow = null;
  if (register.sub_abonents) {
    const {sub_abonents} = register;
    sheet.range(`A${row}:G${row}`).merged(true).value('Субабоненты'); row++;
    tableHeader(sheet, row);
    row += 2;
    itemsfirstRow = new Number(row);
    sub_abonents.forEach(p => {
      tableItem(sheet, row, p);
      row++;
    });
    subsConsumptionRow = new Number(row);
    sheet.range(`A${row}:E${row}`).merged(true).value('Итого:');
    sheet.cell(`F${row}`).formula(`SUM(F${itemsfirstRow}:F${row - 1})`);
    row++;
  }
  if (register.group_abonent) {
    sheet.range(`A${row}:G${row}`).merged(true).value('Групповой абонент'); row++;
    tableItem(sheet, row, register.group_abonent);
    row++;
    if (subsConsumptionRow !== null) {
      sheet.range(`A${row}:E${row}`).merged(true).value('Потери:');
      sheet.cell(`F${row}`).formula(`F${row - 1}-F${subsConsumptionRow}`);
    }
  }
  sheet.column('A').width(20);
  sheet.column('B').width(20);
  sheet.column('C').width(20);
  sheet.column('D').width(15);
  sheet.column('E').width(15);
  sheet.column('F').width(15);
  sheet.column('G').width(20);
}

const tableHeader = (sheet, row) => {
  sheet.range(`A${row}:A${row + 1}`).merged(true).value('Место');
  sheet.range(`B${row}:B${row + 1}`).merged(true).value('Потребитель');
  sheet.range(`C${row}:C${row + 1}`).merged(true).value('Счетчик');
  sheet.range(`D${row}:E${row}`).merged(true).value('Показания');
  sheet.cell(`D${row + 1}`).value('Предыдущие');
  sheet.cell(`E${row + 1}`).value('Текущие');
  sheet.range(`F${row}:F${row + 1}`).merged(true).value('Потребление');
  sheet.range(`G${row}:G${row + 1}`).merged(true).value('Примечание');
  return sheet;
}

const tableItem = (sheet, row, place) => {
  if (!sheet || !row || !place) return;
  sheet.cell(`A${row}`).value(place.name);
  sheet.cell(`B${row}`).value(place.consumer ? place.consumer.name : null);
  sheet.cell(`C${row}`).value(place.meter ? place.meter.number : null);
  sheet.cell(`D${row}`).value(place.meter && place.meter.data[1] ? place.meter.data[1].value : null);
  sheet.cell(`E${row}`).value(place.meter && place.meter.data[0] ? place.meter.data[0].value : null);
  const last = place.meter && place.meter.data[1] ? place.meter.data[1].value : null;
  const curr = place.meter && place.meter.data[0] ? place.meter.data[0].value : null;
  sheet.cell(`F${row}`).value(calculateConsumption(last, curr));
}

const calculateConsumption = (last, curr) => {
    if (last && curr && !isNaN(last) && !isNaN(curr)) {
        return curr - last;
    }
    else if (curr && !isNaN(curr)) {
        return curr;
    }
    else {
        return null;
    }
};