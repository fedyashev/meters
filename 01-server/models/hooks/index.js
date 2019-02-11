const { Place, Meter, Report, Data, Register, SubAbonentSchema, Sign } = require('../index');

///////////////////////////////////////////////////////////////////////////////

Place.addHook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Place.addHook('afterDestroy', async (place, options) => {
    try {
        const countSubabonents = await SubAbonentSchema.destroy({ where: { SubAbonentId: place.id } });
        const countRegisters = await Register.update({GroupAbonentId: null}, {where: {GroupAbonentId: place.id}});
        const countReports = await Report.destroy({where: {PlaceId: place.id}});
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
        const countData = await Data.destroy({where: {MeterId: meter.id}});
        const [count, ...rest] = await Place.update({MeterId: null}, {where: {MeterId: meter.id}});
    } catch (err) {
        console.log(err);
    }
});

///////////////////////////////////////////////////////////////////////////////

Report.addHook('beforeBulkDestroy', options => {
    options.individualHooks = true;
    return options;
});

Report.addHook('afterDestroy', async (report, options) => {
    try {
        if (report.isSignNeed && report.SignId) {
            const countSign = await Sign.destroy({where: {id: report.SignId}});
        }
    } catch (err) {
        console.log(err);
    }
});

///////////////////////////////////////////////////////////////////////////////