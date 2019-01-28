const dateformat = require('dateformat');

module.exports.toDate = date => {
    return new Date(date);
}

module.exports.prettyDate = date => {
    const datePattern = 'dd.mm.yyyy HH:MM:ss';
    return dateformat(new Date(date), datePattern);
}
