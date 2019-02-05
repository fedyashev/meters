const table_prefix = 'meters';

const model_name = Object.freeze({
    Consumer: 'Consumer'
});

const table_name = Object.freeze({
    Consumer: `${table_prefix}_${model_name.Consumer}`
});

module.exports.table_prefix = table_prefix;
module.exports.model_name = model_name;
module.exports.table_name = table_name;