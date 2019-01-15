const express = require('express');
const router = express.Router();

const todo = require('../controllers/empty');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const inspector = require('../controllers/inspestor');
const consumer = require('../controllers/consumer');
const meter = require('../controllers/meter');

const access = require('../middleware/access');

const {Role, Roles} = require('../lib/roles');

router.post('/auth/login', auth.login);
router.post('/auth/logout', access.session, auth.logout);

router.get('/users', access.allow(Roles.AO), users.getUsersList);
router.post('/users', access.allow(Roles.AO), users.createNewUser);

router.get('/users/:user_id', access.allowUserSelfExceptRoles(Roles.AO), users.getUserById);
//router.put('/users/:user_id', empty);

router.put('/users/:user_id/changePassword', access.allowUserSelfExceptRoles(Roles.AO), users.changeUserPassword);
router.put('/users/:user_id/changeRole', access.allowUserSelfExceptRoles(Roles.AO), users.changeUserRole);

router.get('/inspectors', access.allow(Roles.AO), inspector.getAll);
router.post('/inspectors', access.allow(Roles.AO), inspector.createInspector);

router.get('/inspectors/:inspector_id', access.allowInspectorSelfExceptRoles(Roles.AO), inspector.getInspectorById);
router.put('/inspectors/:inspector_id', access.allowInspectorSelfExceptRoles(Roles.AO), inspector.updateInspectorById);  // Change name
router.delete('/inspectors/:inspector_id', access.allow(Roles.AO), inspector.deleteInspectorById);

router.get('/consumers', consumer.getAll);
router.post('/consumers', consumer.create);

router.get('/consumers/:consumer_id', consumer.getById);
router.put('/consumers/:consumer_id', consumer.updateById);  // Change name, email
router.delete('/consumers/:consumer_id', consumer.deleteById);

router.get('/meters', meter.getAll);
router.post('/meters', meter.create);

router.get('/meters/:meter_id', meter.getById);
router.put('/meters/:meter_id', meter.updateById);  // Change number
router.delete('/meters/:meter_id', meter.deleteById);

router.get('/places', todo);
router.post('/places', todo);

router.get('/places/:place_id', todo);
router.put('/places/:place_id', todo);

module.exports = router;