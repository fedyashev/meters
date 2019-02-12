const {assert} = require('chai');
const {Place} = require('../models');
const {truncateExceptRoles} = require('./truncate/truncate');

describe('Model Place', () => {
  beforeEach(async () => {
    await truncateExceptRoles();
  });

  describe('Create a valid place', () => {
    it('Create a valid place', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.name, 'string');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.typeOf(place.ConsumerId, 'number');
      assert.typeOf(place.MeterId, 'number');
      assert.equal(place.name, tmp.name);
      assert.equal(place.isSignNeed, tmp.isSignNeed);
      assert.equal(place.ConsumerId, tmp.ConsumerId);
      assert.equal(place.MeterId, tmp.MeterId);
    });
  });

  describe('Name', () => {
    it('Not create place with name is null', async () => {
      const tmp = {
        name: null,
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name is undefined', async () => {
      const tmp = {
        name: undefined,
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name is boolean', async () => {
      const tmp = {
        name: true,
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name is symbol', async () => {
      const sym = Symbol();
      const tmp = {
        name: sym,
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name is object', async () => {
      const tmp = {
        name: {name: 'Ролет №1'},
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name is empty string', async () => {
      const tmp = {
        name: '',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name contain whitespaces at begin', async () => {
      const tmp = {
        name: ' Ролет №1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name contain whitespaces at end', async () => {
      const tmp = {
        name: 'Ролет №1 ',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name contain whitespaces at begin and end', async () => {
      const tmp = {
        name: ' Ролет №1 ',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with name length 1', async () => {
      const tmp = {
        name: 'А',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Create place with name length 2', async () => {
      const tmp = {
        name: 'А1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.name, 'string');
      assert.equal(place.name, tmp.name);
    });    
  });

  describe('isSignNeed', () => {
    it('Not create place with isSignNeed is null', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: null,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Create place with default value isSignNeed is false when isSignNeed is undefined', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: undefined,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.equal(place.isSignNeed, false);
    });

    it('Not create place with isSignNeed is not valid string', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: 'asd',
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Create place with isSignNeed is valid string "true"', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: 'true',
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.equal(place.isSignNeed, true);
    });

    it('Create place with isSignNeed is valid string "false"', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: 'false',
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.equal(place.isSignNeed, false);
    });

    it('Not create place with isSignNeed is number', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: 123,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with isSignNeed is symbol', async () => {
      const sym = Symbol();
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: sym,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Not create place with isSignNeed is object', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: {sign: true},
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'null');
    });

    it('Create place with isSignNeed is false', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: false,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.equal(place.isSignNeed, tmp.isSignNeed);
    });

    it('Create place with isSignNeed is true', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.isSignNeed, 'boolean');
      assert.equal(place.isSignNeed, tmp.isSignNeed);
    });
  });

  describe('ConsumerId', () => {
    it('Create place with ConsumerId is null', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: null,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.ConsumerId, 'null');
    });

    it('Create place with ConsumerId is undefined. Place.ConsumerId must be a null.', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: undefined,
        MeterId: 1
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.ConsumerId, 'null');
    });
  });

  describe('MeterId', () => {
    it('Create place with MeterId is null', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: null
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.MeterId, 'null');
    });

    it('Create place with MeterId is undefined. Place.MeterId must be a null.', async () => {
      const tmp = {
        name: 'Ролет №1',
        isSignNeed: true,
        ConsumerId: 1,
        MeterId: undefined
      };
      let place = null;
      try {
        place = await Place.create({name: tmp.name, isSignNeed: tmp.isSignNeed, ConsumerId: tmp.ConsumerId, MeterId: tmp.MeterId});
        place = await Place.findOne({where: {id: place.id}});
      } catch (err) {}
      assert.typeOf(place, 'object');
      assert.typeOf(place.MeterId, 'null');
    });
  });

});