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

module.exports.formatDate = date => {
  const tmp = new Date(date);
  const year = tmp.getFullYear();
  let month = tmp.getMonth() + 1;
  let day = tmp.getDate();
  let hour = tmp.getHours();
  let minutes = tmp.getMinutes();
  let seconds = tmp.getSeconds();

  month = month < 9 ? `0${month}` : month;
  day = day < 9 ? `0${day}` : day;
  hour = hour < 9 ? `0${hour}` : hour;
  minutes = minutes < 9 ? `0${minutes}` : minutes;
  seconds = seconds < 9 ? `0${seconds}` : seconds;
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};
