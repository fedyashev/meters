const { Place, SubAbonentSchema } = require('../index');

Place.addHook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Place.addHook('afterDestroy', async (place, options) => {
    try {
        const countSubabonents = await SubAbonentSchema.destroy({ where: { SubAbonentId: place.id } });
    } catch (err) {
        console.log(err);
    }
});