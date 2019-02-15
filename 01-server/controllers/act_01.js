const createError = require('http-errors');
const { act_01, Inspector, Consumer, Place, Meter, Data, Sign, sequelize, Sequelize } = require('../models');
const validator = require('validator');
const { prettyDateToDate } = require('../lib/helpers');
const Op = Sequelize.Op;

module.exports.getAll = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { date, inspector, consumer, place, meter, value, sign_id } = req.body;

    if (!date || !inspector || !consumer || !place || !meter || !value) {
      return next(createError(400, 'Incorrect input value'));
    }

    const tmp_date = new Date(date);
    if (tmp_date.valueOf() >= Date.now()) {
      return next(createError(400, 'Incorrect date'));
    }

    const tmp_inspector = await Inspector.findOne({where: {name: inspector}});
    if (!tmp_inspector) {
      return next(createError(404, 'Inspector not found'));
    }

    const tmp_place = await Place.findOne({where: {name: place}});
    if (!tmp_place) {
      return next(createError(404, 'Place not found'));
    }

    const tmp_consumer = await Consumer.findOne({where: {name: consumer}});
    if (!tmp_consumer) {
      return next(createError(404, 'Consumer not found'));
    }

    const tmp_meter = await Meter.findOne({where: {number: meter}});
    if (!tmp_meter) {
      return next(createError(404, 'Meter not found'));
    }

    if (!tmp_place.ConsumerId || !tmp_place.MeterId ||
      tmp_place.ConsumerId !== tmp_consumer.id ||
      tmp_place.MeterId !== tmp_meter.id) {
      return next(createError(404, 'Place not contain current consumer or meter'));
    }

    const tmp_data = await Data.findOne({where: {MeterId: tmp_meter.id, date: date}});
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
      if ((new Date(last_date)).valueOf() >=  tmp_date.valueOf()) {
        return next(createError(500, 'Incorrect last date'));
      }
      if (last_value > value) {
        return next(createError(500, 'Value must be greater then last value'));
      }
    }

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
    });

    if (!new_act_01) {
      return next(createError(500, 'Failed to create an act'));
    }

    return res.json({done: true});

  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.getPdfById = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};

module.exports.sendEmailById = async (req, res, next) => {
  try {
    return next(createError(503, 'Not implemented'));
  } catch (err) {
    console.log(err);
    return next(createError(500, err.message));
  }
};