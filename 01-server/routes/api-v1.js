const express = require('express');
const router = express.Router();

const multer = require('multer');
// const storage = multer.memoryStorage();
// const uploader = multer({storage});
const uploader = multer(multer.memoryStorage());

const todo = require('../controllers/empty');
const user = require('../controllers/user');
//const auth = require('../controllers/auth');
const inspector = require('../controllers/inspestor');
const consumer = require('../controllers/consumer');
const meter = require('../controllers/meter');
const place = require('../controllers/place');
const data = require('../controllers/data');
const sign = require('../controllers/sign');
const report = require('../controllers/report')
const userrole = require('../controllers/userrole');

const {login, jwt, allow} = require('../passport/middleware');
const self = require('../passport/self-predicate');

const {Role, Roles} = require('../lib/roles');

router.post('/auth/login', login);

router.get('/users', jwt, allow([Role.ADMIN, Role.OWNER]), user.getAll);
router.post('/users', jwt, allow([Role.ADMIN, Role.OWNER]), user.create);

router.get('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER], self.user), user.getById);
router.put('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER]), user.updateById);
router.put('/users/:user_id/changePassword', jwt, allow([Role.ADMIN, Role.OWNER], self.user), user.changePassword);
router.put('/users/:user_id/changeRole', jwt, allow([Role.ADMIN, Role.OWNER]), user.changeRole);
router.delete('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER]), user.deleteById);

router.get('/userroles', jwt, allow([Role.ADMIN, Role.OWNER]), userrole.getAll);

router.get('/inspectors', jwt, allow([Role.ADMIN, Role.OWNER]), inspector.getAll);
router.post('/inspectors', jwt, allow([Role.ADMIN, Role.OWNER]), inspector.create);

router.get('/inspectors/:inspector_id', jwt, allow([Role.ADMIN, Role.OWNER], self.inspector), inspector.getById);
router.put('/inspectors/:inspector_id', jwt, allow([Role.ADMIN, Role.OWNER]), inspector.updateById);  // Change name
router.delete('/inspectors/:inspector_id', jwt, allow([Role.ADMIN, Role.OWNER]), inspector.deleteById);

router.get('/consumers', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.getAll);
router.post('/consumers', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.create);

router.get('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER], self.consumer), consumer.getById);
router.put('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.updateById);  // Change name, email
router.delete('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.deleteById);

router.get('/meters', jwt, allow([Role.ADMIN, Role.OWNER]), meter.getAll);
router.get('/meters/notInPlace', jwt, allow([Role.ADMIN, Role.OWNER]), meter.getAllNotInPlace);
router.post('/meters', jwt, allow([Role.ADMIN, Role.OWNER]), meter.create);

router.get('/meters/:meter_id', jwt, allow([Role.ADMIN, Role.OWNER]), meter.getById);
router.put('/meters/:meter_id', jwt, allow([Role.ADMIN, Role.OWNER]), meter.updateById);  // Change number
router.delete('/meters/:meter_id', jwt, allow([Role.ADMIN, Role.OWNER]), meter.deleteById);

router.get('/places', jwt, allow([Role.ADMIN, Role.OWNER]), place.getAll);
router.get('/places/audit', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), place.getAllForAudit);
router.post('/places', jwt, allow([Role.ADMIN, Role.OWNER]), place.create);

router.get('/places/:place_id', jwt, allow([Role.ADMIN, Role.OWNER]), place.getById);
router.put('/places/:place_id', jwt, allow([Role.ADMIN, Role.OWNER]), place.updateById); // Change name, isSignNeed, Consumer, Meter
router.delete('/places/:place_id', jwt, allow([Role.ADMIN, Role.OWNER]), place.deleteById);

router.get('/data', jwt, allow([Role.ADMIN, Role.OWNER]), data.getAll);
router.post('/data', jwt, allow([Role.ADMIN, Role.OWNER]), data.create);

router.get('/data/:data_id', jwt, allow([Role.ADMIN, Role.OWNER]), data.getById);
router.put('/data/:data_id', jwt, allow([Role.ADMIN, Role.OWNER]), data.updateById);
router.delete('/data/:data_id', jwt, allow([Role.ADMIN, Role.OWNER]), data.deteleById);

router.get('/signs', jwt, allow([Role.ADMIN, Role.OWNER]), sign.getAll);
router.post('/signs', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), uploader.single('sign'), sign.create);

router.get('/signs/:sign_id', jwt, allow([Role.ADMIN, Role.OWNER]), sign.getById);
router.put('/signs/:sign_id', jwt, allow([Role.ADMIN, Role.OWNER]), uploader.single('sign'), sign.updateById);
router.delete('/signs/:sign_id', jwt, allow([Role.ADMIN, Role.OWNER]), sign.deleteById);

router.get('/reports', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.getAll);
router.post('/reports', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.create);

router.get('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.getById);
router.put('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER]), report.updateById);
router.delete('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER]), report.deleteById);

module.exports = router;