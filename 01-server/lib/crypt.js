const bcrypt = require('bcryptjs');
const saltLength = 10;

module.exports.getPasswordHash = (password) => bcrypt.hash(password, saltLength);
module.exports.comparePassword = (password, hash) => bcrypt.compare(password, hash);
