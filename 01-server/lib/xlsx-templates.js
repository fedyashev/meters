const XlsxPopulate = require('xlsx-populate');

module.exports.registerToXlsx = register => {
  if (!register) return null;
  return XlsxPopulate.fromBlankAsync()
    .then(workbook => {
      registerSheet(workbook.sheet(0), register);
      return workbook.outputAsync();
    })
};

module.exports.registersAllToXlsx = registers => {
  if (!registers || !Array.isArray(registers)) return null;
  return XlsxPopulate.fromBlankAsync()
    .then(workbook => {
      registers.forEach(register => {
        workbook.cloneSheet(workbook.activeSheet(), `${register.id}`);
        const sheet = workbook.sheet(`${register.id}`);
        registerSheet(sheet, register);
      });
      workbook.deleteSheet('Sheet1');
      return workbook.outputAsync();
    })
}

const registerSheet = (sheet, register) => {

  if (!sheet || !register) return;

  sheet
    .name(`${register.id}`)
    .range(`A1:Z100`)
    .style({ fontFamily: 'TimesNewRoman', fontSize: '10' });

  let row = 1;

  sheet
    .range(`A${row}:G${row}`)
    .merged(true)
    .value(register.name)
    .style({ bold: true, horizontalAlignment: 'center' });

  row++;
  row++;

  let itemsfirstRow = null;
  let subsConsumptionRow = null;
  if (register.sub_abonents && register.sub_abonents.length > 0) {
    const { sub_abonents } = register;

    sheet
      .range(`A${row}:G${row}`)
      .merged(true)
      .value('Субабоненты')
      .style({ border: 'medium', bold: true, horizontalAlignment: 'center' });

    row++;

    tableHeader(sheet, row);

    row += 2;

    itemsfirstRow = new Number(row);

    sub_abonents.forEach(p => {
      tableItem(sheet, row, p);
      row++;
    });

    subsConsumptionRow = new Number(row);

    sheet
      .range(`A${row}:E${row}`)
      .merged(true)
      .value('Итого:')
      .style({ bold: true, horizontalAlignment: 'right', verticalAlignment: 'center' });

    sheet
      .cell(`F${row}`)
      .formula(`SUM(F${itemsfirstRow}:F${row - 1})`)
      .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

    sheet
      .range(`A${row}:G${row}`)
      .style({ border: 'medium' });
  }

  if (register.group_abonent) {
    row++;

    sheet
      .range(`A${row}:G${row}`)
      .merged(true)
      .value('Групповой абонент')
      .style({ border: 'medium', bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

    row++;

    if (register.sub_abonents || register.sub_abonents.length === 0) {
      tableHeader(sheet, row);
      row++;
      row++;
    }

    tableItem(sheet, row, register.group_abonent);

    sheet
      .cell(`F${row}`)
      .style({ bold: true });

    row++;

    if (subsConsumptionRow) {
      sheet
        .range(`A${row}:E${row}`)
        .merged(true)
        .value('Потери:')
        .style({ bold: true, horizontalAlignment: 'right', verticalAlignment: 'center' });

      sheet
        .cell(`F${row}`)
        .formula(`F${row - 1}-F${subsConsumptionRow}`)
        .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

      sheet
        .range(`A${row}:G${row}`)
        .style({ border: 'medium' });
    }
  }
  sheet.column('A').width(20);
  sheet.column('B').width(20);
  sheet.column('C').width(12);
  sheet.column('D').width(12);
  sheet.column('E').width(12);
  sheet.column('F').width(12);
  sheet.column('G').width(20);

  if (register.sub_abonents && register.sub_abonents > 0 || register.group_abonent) {
    sheet
      .range(`A3:G${subsConsumptionRow ? row : row - 1}`)
      .style({ border: 'medium' });
  }
}

const tableHeader = (sheet, row) => {
  sheet.range(`A${row}:A${row + 1}`).merged(true).value('Место')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`B${row}:B${row + 1}`).merged(true).value('Потребитель')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`C${row}:C${row + 1}`).merged(true).value('Счетчик')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`D${row}:E${row}`).merged(true).value('Показания')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`D${row + 1}`).value('Предыдущие')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`E${row + 1}`).value('Текущие')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`F${row}:F${row + 1}`).merged(true).value('Потребление')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`G${row}:G${row + 1}`).merged(true).value('Примечание')
    .style({ bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.range(`A${row}:G${row + 1}`).style({ border: true, borderStyle: 'medium' });
  return sheet;
}

const tableItem = (sheet, row, place) => {

  if (!sheet || !row || !place) return;

  sheet.cell(`A${row}`)
    .value(place.name)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`B${row}`)
    .value(place.consumer ? place.consumer.name : null)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`C${row}`)
    .value(place.meter ? place.meter.number : null)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`D${row}`)
    .value(place.meter && place.meter.data[1] ? place.meter.data[1].value : null)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`E${row}`)
    .value(place.meter && place.meter.data[0] ? place.meter.data[0].value : null)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  const last = place.meter && place.meter.data[1] ? place.meter.data[1].value : null;
  const curr = place.meter && place.meter.data[0] ? place.meter.data[0].value : null;

  sheet.cell(`F${row}`)
    .value(calculateConsumption(last, curr))
    .style({ leftBorder: 'medium', bottomBorder: 'thin', horizontalAlignment: 'center', verticalAlignment: 'center' });

  sheet.cell(`G${row}`)
    .style({ leftBorder: 'medium', bottomBorder: 'thin', rightBorder: 'medium', horizontalAlignment: 'center', verticalAlignment: 'center' });
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