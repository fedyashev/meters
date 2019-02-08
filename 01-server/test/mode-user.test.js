const {assert} = require('chai');
const {User} = require('../models');
const {truncateExceptRoles} = require('./truncate/truncate');
const crypt = require('../lib/crypt');

describe('Model User', () => {

  beforeEach(async () => {
    await truncateExceptRoles();
  });

  describe('Create a valid user', () => {
    it('Create a valid user', async () => {
      const testUser = {login: 'admin', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {

      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
      assert.equal(user.passwordHash, hash);
      assert.equal(user.UserRoleId, testUser.role);
      assert.equal(await crypt.comparePassword(testUser.password, user.passwordHash), true);
    });
  });

  describe('User login', () => {
    it('Not create user with empty login', async () => {
      const testUser = {login: '', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with null login', async () => {
      const testUser = {login: null, password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login lenth 1', async () => {
      const testUser = {login: '1', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login lenth 17', async () => {
      const testUser = {login: 'asdfg12345asdfg12', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

    it('Create user with login lenth 2', async () => {
      const testUser = {login: 'as', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
    });

    it('Create user with login lenth 16', async () => {
      const testUser = {login: 'asdfg12345asdfg1', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
    });

    it('Not create user with not alphanumerical login', async () => {
      const testUser = {login: 'u_12', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login wich firts character is digit', async () => {
      const testUser = {login: '1u', password: 'testPassword', role: 2};
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({login: testUser.login, passwordHash: hash, UserRoleId: testUser.role});
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

  });



});