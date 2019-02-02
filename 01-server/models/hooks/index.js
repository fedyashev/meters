const { Place, SubAbonentSchema } = require('../index');

Place.hook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Place.hook('afterDestroy', async (place, options) => {
    try {
        const countSubabonents = await SubAbonentSchema.destroy({ where: { SubAbonentId: place.id } });
    } catch (err) {
        console.log(err);
    }
});