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
          console.log(err);
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
            //name: tmp.name,
            email: tmp.email,
            phone: tmp.phone,
            UserId: tmp.UserId
          });
        } catch (err) {

        }
        //console.log(consumer);
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

      it('Not create consumer with name length 1', async () => {
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

      it('Create consumer with valid name with length 2', async () => {
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

    describe('Email', () => {
      it('Not create consumer with email is null', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: null,
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

      it('Not create consumer with email is undefined', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: undefined,
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

      it('Not create consumer with email is number', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 123,
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

      it('Not create consumer with email is symbol', async () => {
        const sym = Symbol();
        const tmp = {
          name: 'ООО "Horns"',
          email: sym,
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

      it('Not create consumer with email is object', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: {email: 'motor@ex.com'},
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

      it('Not create consumer with email is empty string', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: '',
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

      it('Not create consumer with short email (length is 7)', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'a@a.com',
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

      it('Create consumer with email length is 8', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'c@ex.com',
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
        assert.typeOf(consumer.email, 'string');
        assert.equal(consumer.email, tmp.email);
      });

      it('Not create consumer with email that begin at whitespace', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: ' c@ex.com',
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

      it('Not create consumer with email that end at whitespace', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'c@ex.com ',
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

      it('Not create consumer with email that begin and end at whitespaces', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: ' c@ex.com ',
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

    describe('Phone', () => {
      it('Create consumer with phone is null', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: null,
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
        assert.typeOf(consumer.phone, 'null');
      });

      it('Create consumer with phone is undefined', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: undefined,
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
          consumer = await Consumer.findOne({where: {name: tmp.name}});
        } catch (err) {

        }
        assert.typeOf(consumer, 'object');
        assert.typeOf(consumer.phone, 'null');
      });

      it('Not create consumer with phone is boolean', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: true,
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

      it('Not create consumer with phone is number', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: 80295104040,
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

      it('Not create consumer with phone is symbol', async () => {
        const sym = Symbol();
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: sym,
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

      it('Not create consumer with phone is object', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: {phone: '80295001020'},
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

      it('Not create consumer with phone is empty string', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: '',
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

      it('Not create consumer with phone length 4', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: '1235',
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

      it('Not create consumer with phone length 21', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: '123456789012345678901',
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

      it('Not create consumer with phone that begin at whitespace', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: ' 80293004050',
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

      it('Not create consumer with phone that end at whitespace', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: '80293004050 ',
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

      it('Not create consumer with phone that begin and end at whitespace', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: ' 80293004050 ',
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

      it('Not create consumer with phone that contain not valid characters (othen than 0-9+-())', async () => {
        const tmp = {
          name: 'ООО "Horns"',
          email: 'motor@ex.com',
          phone: '#+375(29)3455667@c',
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