const dateformat = require('dateformat');

module.exports.toDate = date => {
    return new Date(date);
}

module.exports.prettyDate = date => {
    const datePattern = 'dd.mm.yyyy HH:MM:ss';
    return dateformat(new Date(date), datePattern);
}

module.exports.prettyDateToDate = str => {
  const [date, time] = str.split(' ');
  const [day, month, year] = date.split('.');
  const [hours, minutes, seconds] = time.split(':');
  return new Date(year, Number(month) - 1, day, hours, minutes, seconds);
}
