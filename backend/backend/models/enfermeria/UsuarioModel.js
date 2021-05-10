const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    activo: {
        type: Boolean,
        require: true
    },
    });

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('tbl_usuarios', UsuarioSchema);
