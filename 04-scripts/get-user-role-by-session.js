const {User, UserRole, Session} = require('../01-server/models');
//'90837fa7672190e7bf22c136aef72c17'
Session.findOne({
    where: {
        token: '90837fa7672190e7bf22c136aef72c17'
    },
    include: [{
        model: User,
        include: [{model: UserRole}]
    }]
})
    .then(session => {
        console.log(session);
        const {token, User} = session.dataValues;
        console.log({login: User.login, role: User.UserRole.role, token});
    })
    .catch(err => console.log(err));