const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const uploader = multer({storage});

const todo = require('../controllers/empty');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const inspector = require('../controllers/inspestor');
const consumer = require('../controllers/consumer');
const meter = require('../controllers/meter');
const place = require('../controllers/place');
const data = require('../controllers/data');
const sign = require('../controllers/sign');
const report = require('../controllers/report')

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

router.get('/inspectors', inspector.getAll);
router.post('/inspectors', inspector.createInspector);

router.get('/inspectors/:inspector_id', inspector.getInspectorById);
router.put('/inspectors/:inspector_id', inspector.updateInspectorById);  // Change name
router.delete('/inspectors/:inspector_id', inspector.deleteInspectorById);

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

router.get('/data', data.getAll);
router.post('/data',data.create);

router.get('/data/:data_id', data.getById);
router.put('/data/:data_id', data.updateById);
router.delete('/data/:data_id', data.deteleById);

router.get('/signs', sign.getAll);
router.post('/signs', uploader.single('sign'), sign.create);

router.get('/signs/:sign_id', sign.getById);
router.put('/signs/:sign_id', uploader.single('sign'), sign.updateById);
router.delete('/signs/:sign_id', sign.deleteById);

router.get('/reports', report.getAll);
router.post('/reports', report.create);

router.get('/reports/:report_id', report.getById);
router.put('/reports/:report_id', report.updateById);
router.delete('/reports/:report_id', report.deleteById);

module.exports = router;