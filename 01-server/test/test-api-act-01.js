const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { truncateExceptRoles } = require('./truncate/truncate');
const { assert } = require('chai');

const { User, Inspector, Consumer, Place, Meter, Data, act_01, Sign } = require('../models');

chai.use(chaiHttp);

describe('API /doc/act_01', () => {
  beforeEach(async () => {
    await truncateExceptRoles();
  });

  describe('Create act_01 - POST /api/v1/doc/act_01', () => {

    beforeEach(async () => {
      const userInspector = await User.create({login: 'i1', passwordHash: 'cat', UserRoleId: '4'});
      const userConsumer = await User.create({login: 'c1', passwordHash: 'cat', UserRoleId: '5'});
      const inspector = await Inspector.create({name: 'Иванов Иван', UserId: userInspector.id});
      const consumer = await Consumer.create({name: 'ИП Петров', email: 'ivanov.meters@instaservice.by', phone: '80293334455', UserId: userConsumer.id});
      const meter = await Meter.create({number: '001'});
      const place = await Place.create({name: 'Ролет А1', ConsumerId: consumer.id, MeterId: meter.id, isSignNeed: true});

      const datas = await Data.bulkCreate([
        {MeterId: meter.id, date: '2019-02-15 11:00:00', value: 0},
        {MeterId: meter.id, date: '2019-02-15 11:30:00', value: 30},
        {MeterId: meter.id, date: '2019-02-15 11:50:00', value: 50},
        //{MeterId: meter.id, date: '2019-02-15 14:00:00', value: 150}
      ]);

    });    

    it('Create act a valid act ', (done) => {
      const tmp = {
        date: '2019-02-15 13:00:00',
        inspector: 'Иванов Иван',
        consumer: 'ИП Петров',
        place: 'Ролет А1',
        meter: '001',
        value: 135
      };

      chai.request(app)
        .post('/api/v1/doc/act_01')
        .send(tmp)
        .end((err, res) => {
          if (err) done(err);

          assert.equal(res.status, 200);

          act_01
            .findOne({
              where: { date: tmp.date }
            })
            .then(act => {
              assert.isObject(act, 'object');
              assert.isString(act.inspector);
              assert.isString(act.consumer);
              assert.isString(act.place);
              assert.isString(act.meter);

              assert.equal(act.inspector, tmp.inspector);
              assert.equal(act.consumer, tmp.consumer);
              assert.equal(act.meter, tmp.meter);
              assert.equal(act.place, tmp.place);

              assert.equal(typeof act.last_date, 'object');
              assert.isNumber(act.last_value);
              assert.equal(typeof act.current_date, 'object');
              assert.isNumber(act.current_value);

              assert.equal(act.current_date.valueOf(), (new Date(tmp.date)).valueOf());
              assert.equal(act.current_value, tmp.value);

              assert.equal(act.last_date.valueOf() < act.current_date.valueOf(), true);
              assert.equal(act.last_value <= act.current_value, true);

              done();
            })
            .catch(err => done(err));

        });
    });
  });
});