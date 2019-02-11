const { assert } = require('chai');
const { Meter } = require('../models');
const { truncateExceptRoles } = require('./truncate/truncate');

describe('Model Meter', () => {
    beforeEach(async () => {
        await truncateExceptRoles();
    });

    describe('Create a valid meter', () => {
        it('Create a valid meter', async () => {
            const tmp = { number: '00123' };
            let meter = null;
            try {
                meter = await Meter.create({ number: tmp.number });
            } catch (err) {

            }
            assert.typeOf(meter, 'object');
            assert.typeOf(meter.number, 'string');
            assert.equal(meter.number, tmp.number);
        });
    });

    describe('Number', () => {
        it('Not create meter with number is null', async () => {
            const tmp = { number: null };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is undefined', async () => {
            const tmp = { number: undefined };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is boolean', async () => {
            const tmp = { number: true };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is number', async () => {
            const tmp = { number: 123 };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is symbol', async () => {
            const sym = Symbol();
            const tmp = { number: sym };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is object', async () => {
            const tmp = { number: {num: '123123123'} };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number is empty string', async () => {
            const tmp = { number: '' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number that begin at whitespace', async () => {
            const tmp = { number: ' 12313' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number that end at whitespace', async () => {
            const tmp = { number: '12313 ' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number that begin and end at whitespace', async () => {
            const tmp = { number: ' 12313 ' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number that contain !@#$%^&*()_+={}|":>?<,./;\'\~` ', async () => {
            const tmp = { number: '12!@#$%^&*()_+={}|":>?<,./;\'\~`313' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });

        it('Not create meter with number that contain whitespace', async () => {
            const tmp = { number: '12 313' };
            let meter = null;
            try { meter = await Meter.create({ number: tmp.number }) } catch (err) { };
            assert.typeOf(meter, 'null');
        });
    });
});