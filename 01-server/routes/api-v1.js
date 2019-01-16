const express = require('express');
const router = express.Router();

const todo = require('../controllers/empty');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const inspector = require('../controllers/inspestor');
const consumer = require('../controllers/consumer');
const meter = require('../controllers/meter');
const place = require('../controllers/place');

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

router.get('/places', place.getAll);
router.post('/places', place.create);

router.get('/places/:place_id', place.getById);
router.put('/places/:place_id', place.updateById); // Change name, isSignNeed, Consumer, Meter
router.delete('/places/:place_id', place.deleteById);

router.get('/data', todo);
router.post('/data', todo);

router.get('/data/:data_id', todo);
router.put('/data/:data_id', todo);
router.detele('/data/:data_id', todo);

router.get('/signs', todo);
router.post('/signs', todo);

router.get('/signs/:sign_id', todo);
router.put('/signs/:sign_id', todo);
router.detele('/signs/:sign_id', todo);

router.get('/report', todo);
router.post('/report', todo);

router.get('/report/:report_id', todo);
router.put('/report/:report_id', todo);
router.detele('/report/:report_id', todo);

module.exports = router;