const express = require('express');
const router = express.Router();

const empty = require('../controllers/empty');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

const access = require('../middleware/access');
const {Role, Roles} = access;

router.post('/auth/login', auth.login);
router.post('/auth/logout', access.session, auth.logout);

router.get('/users', access.allow(Roles.AO), users.getUsersList);
router.post('/users', access.allow(Roles.AO), users.createNewUser);

router.get('/users/:user_id', access.allowUserSelfExceptRoles(Roles.AO), users.getUserById);
//router.put('/users/:user_id', empty);

router.put('/users/:user_id/changePassword', access.allowUserSelfExceptRoles(Roles.AO), users.changeUserPassword);
router.put('/users/:user_id/changeRole', access.allowUserSelfExceptRoles(Roles.AO), users.changeUserRole);

module.exports = router;