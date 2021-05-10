const { Schema, model } = require('mongoose');

const DeptoSchema = Schema({
    codigo: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        require: true
    },
    activo: {
        type: Boolean,
        default: true
    }});

module.exports = model('tbl_departamento', DeptoSchema);
