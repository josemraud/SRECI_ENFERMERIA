/**
 Ruta de Login
 @Author Jose Mario Raudales
 */
 const express = require("express");
 let router = express.Router();                                      
 
 const Usuario = require('../../models/enfermeria/UsuarioModel');
 let authController = require('../../controllers/AuthController');
 const auth = new authController();

// Login User
router.post('/', async (req, res)=>{ 
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
});
module.exports = router