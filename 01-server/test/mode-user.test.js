const { assert } = require('chai');
const { User } = require('../models');
const { truncateExceptRoles } = require('./truncate/truncate');
const crypt = require('../lib/crypt');

describe('Model User', () => {

  beforeEach(async () => {
    await truncateExceptRoles();
  });

  describe('Create a valid user', () => {
    it('Create a valid user', async () => {
      const testUser = { login: 'admin', password: 'testPassword', role: 2 };
      const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: hash, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
      assert.equal(user.passwordHash, hash);
      assert.equal(user.UserRoleId, testUser.role);
      assert.equal(await crypt.comparePassword(testUser.password, user.passwordHash), true);
    });
  });

  describe('Login', () => {
    it('Not create user with empty login', async () => {
      const testUser = { login: '', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with null login', async () => {
      const testUser = { login: null, password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login lenth 1', async () => {
      const testUser = { login: '1', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login lenth 17', async () => {
      const testUser = { login: 'asdfg12345asdfg12', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Create user with login lenth 2', async () => {
      const testUser = { login: 'as', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
    });

    it('Create user with login lenth 16', async () => {
      const testUser = { login: 'asdfg12345asdfg1', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'object');
      assert.equal(user.login, testUser.login);
    });

    it('Not create user with not alphanumerical login', async () => {
      const testUser = { login: 'u_12', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login wich firts character is digit', async () => {
      const testUser = { login: '1u', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login as type number', async () => {
      const testUser = { login: 123, password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login with only whitespaces', async () => {
      const testUser = { login: '     ', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login contain firts whitespace', async () => {
      const testUser = { login: ' login', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login contain last whitespace', async () => {
      const testUser = { login: 'login ', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with login contain any whitespace', async () => {
      const testUser = { login: 'login login', password: 'testPassword', role: 2 };
      //const hash = await crypt.getPasswordHash(testUser.password);
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

  });

  describe('Password', () => {

    it('Not create user with passwordHash is null', async () => {
      const testUser = { login: 'TestUser123', password: null, role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with passwordHash is empty', async () => {
      const testUser = { login: 'TestUser123', password: '', role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with passwordHash contain whitespace characters', async () => {
      const testUser = { login: 'TestUser123', password: 'qwe qwe', role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with passwordHash length 1', async () => {
      const testUser = { login: 'TestUser123', password: 'q', role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Create user with passwordHash length 2', async () => {
      const testUser = { login: 'TestUser123', password: 'q1', role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'object');
      assert.equal(user.passwordHash, testUser.password);
    });

    it('Not create user with passwordHash number', async () => {
      const testUser = { login: 'TestUser123', password: 123, role: 2 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {
        
      }
      assert.typeOf(user, 'null');
    });

  });

  describe('UserRoleId', () => {
    it('Not create user with UserRoleId is null', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: null };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with UserRoleId string', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: 'f' };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with UserRoleId is empty string', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: '' };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with UserRoleId is float', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: 1.5 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with UserRoleId is 0', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: 0 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });

    it('Not create user with UserRoleId is negative integer', async () => {
      const testUser = { login: 'TestUser123', password: 'P@ssw0rd', role: -1 };
      let user = null;
      try {
        user = await User.create({ login: testUser.login, passwordHash: testUser.password, UserRoleId: testUser.role });
      } catch (err) {

      }
      assert.typeOf(user, 'null');
    });
  });

});