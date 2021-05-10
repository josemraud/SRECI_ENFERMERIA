const { Schema, model } = require('mongoose');

const DeptoSchema = Schema({
    funcionario: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    },
    motivo_consulta: {
        type: String,
        require: true
    },
    diagnostico: {
        type: String,
        require: true
    },
    receta: {
        type: String,
        require: true
    },
    activo: {
        type: Boolean,
        default: true
    }});

module.exports = model('tbl_consultas', DeptoSchema);
