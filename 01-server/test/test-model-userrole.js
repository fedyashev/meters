const {assert} = require('chai');
const {User, UserRole} = require('../models');
const {truncateExceptRoles} = require('./truncate/truncate');

describe('Model UserRole', () => {

  const expectRoles = ["NONE", "ADMIN", "OWNER", "INSPECTOR", "CONSUMER"];

  beforeEach(async () => {
    await truncateExceptRoles();
  });

  it('Check user roles', async () => {
    const userRoles = await UserRole.findAll();
    assert.typeOf(userRoles, 'array');
    assert.equal(userRoles.length, expectRoles.length);
    assert.equal(userRoles.filter(p => expectRoles.includes(p.role)).length, userRoles.length);
  });
});