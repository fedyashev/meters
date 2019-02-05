const { Place, Meter, Consumer, Data, Register, SubAbonentSchema } = require('../index');

///////////////////////////////////////////////////////////////////////////////

Place.addHook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Place.addHook('afterDestroy', async (place, options) => {
    try {
        const countSubabonents = await SubAbonentSchema.destroy({ where: { SubAbonentId: place.id } });
        const countRegisters = await Register.update({GroupAbonentId: null}, {where: {GroupAbonentId: place.id}});
    } catch (err) {
        console.log(err);
    }
});

///////////////////////////////////////////////////////////////////////////////

Meter.addHook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Meter.addHook('afterDestroy', async (meter, options) => {
    try {
        console.log(meter);
        const countData = await Data.destroy({where: {MeterId: meter.id}});
        const [count, ...rest] = await Place.update({MeterId: null}, {where: {MeterId: meter.id}});
    } catch (err) {
        console.log(err);
    }
});

///////////////////////////////////////////////////////////////////////////////



