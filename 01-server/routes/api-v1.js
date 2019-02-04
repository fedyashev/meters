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
const register = require('../controllers/register');

const {login, jwt, allow} = require('../passport/middleware');
const self = require('../passport/self-predicate');

const {Role, Roles} = require('../lib/roles');
const {Role: {ADMIN, OWNER, INSPECTOR}} = require('../lib/roles');

router.post('/auth/login', login);

router.get('/users', jwt, allow([Role.ADMIN, Role.OWNER]), user.getAll);
router.post('/users', jwt, allow([Role.ADMIN, Role.OWNER]), user.create);

router.get('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER], self.user), user.getById);
router.put('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER]), user.updateById);
router.put('/users/:user_id/changePassword', jwt, allow([Role.ADMIN, Role.OWNER], self.user), user.changePassword);
router.put('/users/:user_id/changeRole', jwt, allow([Role.ADMIN, Role.OWNER]), user.changeRole);
router.delete('/users/:user_id', jwt, allow([Role.ADMIN, Role.OWNER]), user.deleteById);

router.get('/userroles', jwt, allow([Role.ADMIN, Role.OWNER]), userrole.getAll);

router.get('/inspectors', jwt, allow([ADMIN, OWNER]), inspector.getAll);
router.get('/inspectors/count', jwt, allow([ADMIN, OWNER]), inspector.count);
router.get('/inspectors/user/:user_id', jwt, allow([ADMIN, OWNER, INSPECTOR]), inspector.getByUserId);
router.post('/inspectors', jwt, allow([ADMIN, OWNER]), inspector.create);

router.get('/inspectors/:inspector_id', jwt, allow([ADMIN, OWNER], self.inspector), inspector.getById);
router.put('/inspectors/:inspector_id', jwt, allow([ADMIN, OWNER]), inspector.updateById);  // Change name
router.delete('/inspectors/:inspector_id', jwt, allow([ADMIN, OWNER]), inspector.deleteById);

router.get('/consumers', jwt, allow([ADMIN, OWNER, INSPECTOR]), consumer.getAll);
router.get('/consumers/count', jwt, allow([ADMIN, OWNER]), consumer.count);
router.post('/consumers', jwt, allow([ADMIN, OWNER]), consumer.create);

router.get('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER], self.consumer), consumer.getById);
router.put('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.updateById);  // Change name, email
router.delete('/consumers/:consumer_id', jwt, allow([Role.ADMIN, Role.OWNER]), consumer.deleteById);

router.get('/meters', jwt, allow([ADMIN, OWNER]), meter.getAll);
router.get('/meters/count', jwt, allow([ADMIN, OWNER]), meter.count);
router.get('/meters/notInPlace', jwt, allow([ADMIN, OWNER, INSPECTOR]), meter.getAllNotInPlace);
router.post('/meters', jwt, allow([ADMIN, Role]), meter.create);

router.get('/meters/:meter_id', jwt, allow([ADMIN, OWNER]), meter.getById);
router.put('/meters/:meter_id', jwt, allow([ADMIN, OWNER]), meter.updateById);  // Change number
router.delete('/meters/:meter_id', jwt, allow([ADMIN, OWNER]), meter.deleteById);

router.get('/places', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.getAll);
router.get('/places/count', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.count);
//router.get('/places/audit', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.getAllForAudit);
router.post('/places', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.create);

router.get('/places/:place_id', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.getById);
router.put('/places/:place_id', jwt, allow([ADMIN, OWNER, INSPECTOR]), place.updateById); // Change name, isSignNeed, Consumer, Meter
router.delete('/places/:place_id', jwt, allow([Role.ADMIN, Role.OWNER]), place.deleteById);

router.get('/data', jwt, allow([ADMIN, OWNER]), data.getAll);
router.get('/data/count', jwt, allow([ADMIN, OWNER]), data.count);
router.post('/data', jwt, allow([ADMIN, OWNER]), data.create);

router.get('/data/:data_id', jwt, allow([ADMIN, OWNER]), data.getById);
router.put('/data/:data_id', jwt, allow([ADMIN, OWNER]), data.updateById);
router.delete('/data/:data_id', jwt, allow([ADMIN, OWNER]), data.deteleById);

router.get('/signs', jwt, allow([Role.ADMIN, Role.OWNER]), sign.getAll);
router.post('/signs', jwt, allow([ADMIN, OWNER, INSPECTOR]), uploader.single('sign'), sign.create);

//router.get('/signs/:sign_id', jwt, allow([Role.ADMIN, Role.OWNER]), sign.getById);
router.get('/signs/:sign_id', sign.getById);
router.put('/signs/:sign_id', jwt, allow([ADMIN, OWNER]), uploader.single('sign'), sign.updateById);
router.delete('/signs/:sign_id', jwt, allow([ADMIN, OWNER, INSPECTOR]), sign.deleteById);

router.get('/reports', jwt, allow([ADMIN, OWNER, INSPECTOR]), report.getAll);
router.get('/reports/count', jwt, allow([ADMIN, OWNER, INSPECTOR]), report.count);
router.post('/reports', jwt, allow([ADMIN, OWNER, INSPECTOR]), report.create);

router.get('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.getById);
router.get('/reports/:report_id/pdf', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.getByIdPdf);
router.get('/reports/:report_id/sendEmail', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.sendEmailById);
//router.get('/reports/:report_id/pdf', report.getByIdPdf);
router.put('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER, Role.INSPECTOR]), report.updateById);
router.delete('/reports/:report_id', jwt, allow([Role.ADMIN, Role.OWNER]), report.deleteById);

router.get('/registers', register.getAll);
router.post('/registers', register.create);
router.get('/registers/:register_id', register.getById);
router.get('/registers/:register_id/pdf', register.getPdfById);
router.get('/registers/:register_id/xlsx', register.downloadXlsxById);
router.put('/registers/:register_id', register.updateById);
router.delete('/registers/:register_id', register.deleteById);

module.exports = router;