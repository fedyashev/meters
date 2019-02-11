const { assert } = require('chai');
const { Inspector } = require('../models');
const { truncateExceptRoles } = require('./truncate/truncate');

describe('Model Inspector', () => {
    beforeEach(async () => {
        await truncateExceptRoles();
    });

    describe('Create a valid user', () => {
        it('Create a valid user', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'object');
            assert.typeOf(inspector.name, 'string');
            assert.typeOf(inspector.UserId, 'number');
            assert.equal(inspector.name, testEntity.name);
            assert.equal(inspector.UserId, testEntity.UserId);
        });
    });

    describe('Name', () => {
        it('Not create inspector with name is null', async () => {
            const testEntity = { name: null, UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with name is empty string', async () => {
            const testEntity = { name: '', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with name is not string', async () => {
            const testEntity = { name: 123, UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with name length 1', async () => {
            const testEntity = { name: 'a', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Create inspector with name length 2', async () => {
            const testEntity = { name: 'ad', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'object');
            assert.typeOf(inspector.name, 'string');
            assert.equal(inspector.name, testEntity.name);
        });

        it('Not create inspector with name contain @<>!?,[]{}\\|/%$#^:;&*~+-=', async () => {
            const testEntity = { name: 'Иванов @<>!?,[]{}\\|/%$#^:;&*~+-=  И.И.', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with name contain whitespace at last character', async () => {
            const testEntity = { name: 'Иванов И.И. ', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with name contain whitespace at first character', async () => {
            const testEntity = { name: ' Иванов И.И.', UserId: 1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });
    });

    describe('UserId', () => {
        it('Not create inspector with UserId is null', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: null };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with UserId is string', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: ' 1' };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with UserId is float', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: 1.5 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with UserId is zero', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: 0 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });

        it('Not create inspector with UserId is negative integer number', async () => {
            const testEntity = { name: 'Иванов И.И.', UserId: -1 };
            let inspector = null;
            try {
                inspector = await Inspector.create({name: testEntity.name, UserId: testEntity.UserId});
            } catch (error) {
                
            }
            assert.typeOf(inspector, 'null');
        });        

    });
});