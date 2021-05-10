/**
 * Auth Controller
 * @Author Jose Mario Raudales
 */
 const { response } = require("express");
 var ObjectID = require('mongodb').ObjectID;
 var MongoDB = require('../models/dbm');
 const bcrypt = require('bcryptjs');
 const Usuario = require('../models/enfermeria/UsuarioModel');

 class AuthController{
    constructor(){
        this.collection = null
        MongoDB.getDb()
         .then (
           (db)=>{
             this.collection = db.collection("tbl_usuarios");
           }
        )
         .catch((ex)=>{
          throw(ex);
        });
    }
    async loginUser (req, res = response) {
        const { username, password } = req.body;
        try {
        // Usuario Exist
            const usuarioDB = await Usuario.findOne({ username });

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no encontrado'
                });
            } else {
            // Validar Password
                const validPassword = bcrypt.compareSync(password, usuarioDB.password);

                if (!validPassword) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Password no es correcto'
                    });
                };
            };
        } catch (error) {
            res.status(500).json({
                ok: false,
                error,
                msg: "Contacte al Administrador"
            });
        }
    }
}
    module.exports = AuthController;