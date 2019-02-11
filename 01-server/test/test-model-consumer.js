const { assert } = require('chai');
const { Consumer } = require('../models');
const { truncateExceptRoles } = require('./truncate/truncate');

describe('Model Consumer', () => {
    beforeEach(async () => {
        await truncateExceptRoles();
    });

    describe('Create valid consumer', () => {
      it('Create a valid consumer', async () => {
        const tmp = {
          name: `УП "MOTOR"`,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'object');
        assert.typeOf(consumer.name, 'string');
        assert.typeOf(consumer.email, 'string');
        assert.typeOf(consumer.phone, 'string');
        assert.equal(consumer.name, tmp.name);
        assert.equal(consumer.email, tmp.email);
        assert.equal(consumer.phone, tmp.phone);
      });
    });

    describe('Name', () => {
      it('Not create consumer with name is null', async () => {
        const tmp = {
          name: null,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is undefined', async () => {
        const tmp = {
          name: undefined,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is boolean', async () => {
        const tmp = {
          name: true,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is number', async () => {
        const tmp = {
          name: 123,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is symbol', async () => {
        const sym = Symbol();
        const tmp = {
          name: sym,
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is object', async () => {
        const tmp = {
          name: { x: 1 },
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name is empty string', async () => {
        const tmp = {
          name: '',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name lenght 1', async () => {
        const tmp = {
          name: 'q',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Create consumer with valid name with lenght 2', async () => {
        const tmp = {
          name: 'ИП',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'object');
        assert.typeOf(consumer.name, 'string');
        assert.equal(consumer.name, tmp.name);
      });

      it('Not create consumer with name begin whitespaces', async () => {
        const tmp = {
          name: ' ИП',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name end whitespaces', async () => {
        const tmp = {
          name: 'ИП ',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

      it('Not create consumer with name constains @<>!?,[]{}\\|/%$#^:;&*~+-=', async () => {
        const tmp = {
          name: 'ИП ',
          email: 'motor@ex.com',
          phone: '80295550011',
          UserId: 1
        };
        let consumer = null;
        try {
          consumer = await Consumer.create({
            name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        assert.typeOf(consumer, 'null');
      });

    });
});