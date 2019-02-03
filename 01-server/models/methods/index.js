const { Register, SubAbonentSchema, Place, Consumer, Meter, Data } = require('../index');

Register.getRegisterById = async (register_id) => {
    try {
        if (!register_id) {
            throw new Error('Incorrect id parameter');
        }

        const register = await Register
            .findOne({
                where: { id: register_id },
                include: [
                    {
                        model: Place,
                        as: 'GroupAbonent',
                        include: [
                            { model: Consumer },
                            { model: Meter }
                        ]
                    }
                ]
            });

        if (!register) {
            //throw new Error('Register not found');
            return null;
        }

        let consumer = null;
        let meter = null;
        let group_abonent = null;
        if (register.GroupAbonent) {
            consumer = register.GroupAbonent.Consumer || null;
            meter = register.GroupAbonent.Meter || null;
            if (meter) {
                let data = await Data
                    .findAll({
                        where: { MeterId: meter.id },
                        order: [['date', 'desc']],
                        limit: 2,
                    })
                    .map(d => {
                        return {
                            id: d.id,
                            date: d.date,
                            value: d.value
                        };
                    });
                let currData = data[0];
                let month = (new Date(Date.now())).getMonth();
                if (currData) {
                    const currMonth = (new Date(currData.date)).getMonth()
                    if (month !== currMonth) {
                        data = [null, currData];
                    }
                }
                meter = {
                    id: register.GroupAbonent.Meter.id,
                    number: register.GroupAbonent.Meter.number,
                    data: data
                }
            }
            group_abonent = {
                id: register.GroupAbonent.id,
                name: register.GroupAbonent.name,
                consumer: consumer,
                meter: meter
            }
        }

        const raw_sub_abonents = await SubAbonentSchema
            .findAll({
                where: { RegisterId: register_id },
                include: [
                    {
                        model: Place,
                        as: 'SubAbonent',
                        include: [
                            { model: Consumer },
                            { model: Meter }
                        ]
                    }
                ]
            });

        const subabonentesPromise = await raw_sub_abonents
            .map(async (record) => {
                if (!record.SubAbonent) return null;
                const place = record.SubAbonent;
                let data = [];
                if (place.Meter) {
                    data = await Data
                        .findAll({
                            where: { MeterId: place.Meter.id },
                            order: [['date', 'desc']],
                            limit: 2,
                        })
                        .map(d => {
                            return {
                                id: d.id,
                                date: d.date,
                                value: d.value
                            };
                        });
                }

                let currData = data[0];
                let month = (new Date(Date.now())).getMonth();
                if (currData) {
                    const currMonth = (new Date(currData.date)).getMonth()
                    if (month !== currMonth) {
                        data = [null, currData];
                    }
                }

                return {
                    id: place.id,
                    name: place.name,
                    isSignNeed: place.isSignNeed,
                    consumer: place.Consumer ?
                        {
                            id: place.Consumer.id,
                            name: place.Consumer.name,
                            email: place.Consumer.email
                        } : null,
                    meter: place.Meter ?
                        {
                            id: place.Meter.id,
                            number: place.Meter.number,
                            data: data
                        } : null
                };
            });

        return Promise
            .all(subabonentesPromise)
            .then(subabonents => {
                return {
                    id: register.id,
                    name: register.name,
                    group_abonent: group_abonent,
                    sub_abonents: subabonents
                };
            })
            .catch(err => {throw err});
    } catch (err) {
        throw err;
    }
}