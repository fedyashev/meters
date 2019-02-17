const createError = require('http-errors');
const { act_01, Inspector, Consumer, Place, Meter, Data, Sign, sequelize, Sequelize } = require('../models');
const validator = require('validator');
const { prettyDateToDate, formatDate } = require('../lib/helpers');
const emailSender = require('../lib/email-sender');
const Op = Sequelize.Op;

const pdfTemplates = require('../lib/pdf-templates');

module.exports.count = async (req, res, next) => {
  try {
    const { inspector_id } = req.query;
    const inspector = await Inspector.findOne({ where: { id: inspector_id } });
    let count = null;
    if (inspector) {
      count = await act_01.count({ where: { inspector: inspector.name } });
    }
    else {
      count = await act_01.count();
    }
    return res.json({ count });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    //return next(createError(503, 'Not implemented'));
    const { inspector_id, limit, offset } = req.query;
    const lim = Number(limit);
    const off = Number(offset);

    const inspector = await Inspector.findOne({ where: { id: inspector_id } });

    let acts = null;
    const withPages = !isNaN(lim) && !isNaN(off) && off >= 0 && lim > 0;
    if (inspector && withPages) {
      acts = await act_01
        .findAll({
          where: { inspector: inspector.name },
          offset: off,
          limit: lim,
          order: [['id', 'DESC']],
        });
    }
    else if (inspector && !withPages) {
      acts = await act_01
        .findAll({
          where: { InspectorId: inspector_id },
          order: [['id', 'DESC']],
        });
    }
    else if (!inspector && withPages) {
      act = await act_01
        .findAll({
          offset: off,
          limit: lim,
          order: [['id', 'DESC']],
        });
    }
    else {
      act = await act_01
        .findAll({
          order: [['id', 'DESC']],
        });
    };
    if (!acts) {
      return next(createError(404, 'Acts not found'));
    }
    return res.json(acts);
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { date, inspector, consumer, place, meter, value, sign_id } = req.body;

    console.log(req.body);

    if (!date || !inspector || !consumer || !place || (meter === null || meter === undefined) || !value) {
      return next(createError(400, 'Incorrect input value'));
    }

    const tmp_date = new Date(date);
    if (tmp_date.valueOf() >= Date.now()) {
      return next(createError(400, 'Incorrect date'));
    }

    const tmp_inspector = await Inspector.findOne({ where: { name: inspector } });
    if (!tmp_inspector) {
      return next(createError(404, 'Inspector not found'));
    }

    const tmp_place = await Place.findOne({ where: { name: place } });
    if (!tmp_place) {
      return next(createError(404, 'Place not found'));
    }

    const tmp_consumer = await Consumer.findOne({ where: { name: consumer } });
    if (!tmp_consumer) {
      return next(createError(404, 'Consumer not found'));
    }

    const tmp_meter = await Meter.findOne({ where: { number: meter } });
    if (!tmp_meter) {
      return next(createError(404, 'Meter not found'));
    }

    if (!tmp_place.ConsumerId || !tmp_place.MeterId ||
      tmp_place.ConsumerId !== tmp_consumer.id ||
      tmp_place.MeterId !== tmp_meter.id) {
      return next(createError(404, 'Place not contain current consumer or meter'));
    }

    const tmp_data = await Data.findOne({ where: { MeterId: tmp_meter.id, date: date } });
    if (tmp_data) {
      return next(createError(400, 'Already exists meter data at current date'));
    }

    const [nextData, ...nextRest] = await Data.findAll({
      where: {
        MeterId: tmp_meter.id,
        date: {
          [Op.gt]: date
        }
      },
      limit: 1,
      order: [['date', 'ASC']]
    });

    if (nextData) {
      return next(createError(500, 'Cant create a new act when current date is not least in meter datas'));
    }

    const [lastData, ...lastRest] = await Data.findAll({
      where: {
        MeterId: tmp_meter.id,
        date: {
          [Op.lt]: date
        }
      },
      limit: 1,
      order: [['date', 'DESC']]
    });

    let last_date = null;
    let last_value = null;
    if (lastData) {
      last_date = lastData.date;
      last_value = lastData.value;
      if ((new Date(last_date)).valueOf() >= tmp_date.valueOf()) {
        return next(createError(500, 'Incorrect last date'));
      }
      if (last_value > value) {
        return next(createError(500, 'Value must be greater then last value'));
      }
    }

    try {
      const result = await sequelize.transaction(async (t) => {

        const data = await Data.create({MeterId: tmp_meter.id, date, value}, {transaction: t});

        const new_act_01 = await act_01.create({
          date,
          inspector,
          consumer,
          place,
          meter,
          last_date: lastData && last_date ? last_date : null,
          last_value: lastData ? last_value : null,
          current_date: date,
          current_value: value,
          ConsumerSignId: sign_id
        }, {transaction: t});
    
        if (!new_act_01) {
          return next(createError(500, 'Failed to create an act'));
        }

        return res.json({ done: true });
      });
    } catch (err) {
      throw err;
    }

  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    //return next(createError(503, 'Not implemented'));
    const { id } = req.params;
    if (!id) {
      return next(createError(400, 'Incorrect act id'));
    }
    const act = await act_01.findOne({ where: { id: id } });
    if (!act) {
      return next(createError(404, 'Act not found'));
    }
    return res.json(act);
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    //return next(createError(503, 'Not implemented'));
    const { id } = req.params;
    const { value } = req.body;

    if (!id) {
      return next(createError(400, 'Incorrect act id'));
    }

    if (value === null || value === undefined) {
      return next(createError(400, 'Incorrect value'));
    }

    const act = await act_01.findOne({ where: { id: id } });
    if (!act) {
      return next(createError(404, 'Act not found'));
    }

    //console.log('=== ', formatDate(act.date) );

    const meter = await Meter.findOne({ where: { number: act.meter } });
    if (!meter) {
      return next(createError(404, 'Meter not found'));
    }

    const data = await Data.findOne({
      where: {
        MeterId: meter.id,
        date: formatDate(act.date)
      }
    });
    if (!data) {
      return next(createError(404, 'Data not found'));
    }

    const [nextAct, ...restNextActs] = await act_01.findAll({
      where: {
        meter: meter.number,
        date: {
          [Op.gt]: formatDate(act.date)
        }
      },
      limit: 1,
      order: [['date', 'ASC']]
    });

    if (nextAct) {
      if (value > nextAct.current_value) {
        return next(createError(500, 'Value cant be greater then current value in next act'));
      }
    }

    try {
      const result = await sequelize.transaction(async (t) => {
        const [dataCount, ...restDataUpdate] = await Data.update({value}, {
          where: {
            MeterId: meter.id,
            date: formatDate(act.date)
          },
          transaction: t
        });
        const [actCount, ...restActUpdate] = await act_01.update({ current_value: value }, {
          where: {id: id},
          transaction: t
        });
        if (nextAct) {
          const [nextActCount, ...restNextActUpdate] = await act_01.update({ last_value: value }, {
            where: {id: nextAct.id},
            transaction: t
          });
        }
        res.json({done: true});
      });
    } catch (err) {
      throw err;
    }

  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, 'Incorrect act id'));
    }
    const count = await act_01.destroy({ where: { id: id } });
    if (!count) {
      return next(createError(500, 'Failed to delete an act'));
    }
    return res.json({ done: true });
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.getPdfById = async (req, res, next) => {
  try {
    //return next(createError(503, 'Not implemented'));
    const { id } = req.params;

    if (!id) {
      return next(createError(400, 'Incorrect act id'));
    }

    const act = await act_01.findOne({
      where: { id: id },
      include: [
        { model: Sign, as: 'ConsumerSign' },
      ]
    });

    if (!act) {
      return next(createError(404, 'Act not found'));
    }

    //const doc = pdfTemplates.report(report);
    const doc = pdfTemplates.act_01(act);

    res.set('Content-disposition', `attachment; filename=acts-${Date.now()}.pdf`);
    res.set('Content-Type', 'application/pdf');

    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.sendEmailById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(createError(400, 'Incorrect act id'));
    }

    const act = await act_01.findOne({
      where: { id: id },
      include: [
        { model: Sign, as: 'ConsumerSign' },
      ]
    });

    if (!act) {
      return next(createError(404, 'Act not found'));
    }

    const { email } = await Consumer.findOne({ where: { name: act.consumer } });

    //const doc = pdfTemplates.report(report);
    const doc = pdfTemplates.act_01(act);
    emailSender.sendEmailAct01(email, doc)
      .then(result => {
        console.log(result);
        return res.json({ done: true });
      })
      .catch(err => {
        return next(createError(500, err.message));
      });

    doc.end();
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};