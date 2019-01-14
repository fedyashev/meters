const Role = Object.freeze({
    'NONE': 'NONE',
    'ADMIN': 'ADMIN',
    'OWNER': 'OWNER',
    'INSPECTOR': 'INSPECTOR',
    'CONSUMER': 'CONSUMER'
});

const Roles = Object.freeze({
    'AO' : [Role.ADMIN, Role.OWNER]
});

module.exports.Role = Role;
module.exports.Roles = Roles;