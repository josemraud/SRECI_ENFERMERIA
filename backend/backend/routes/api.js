/**
 API
 @Author Jose Mario Raudales
 */
const express = require('express');
const router = express.Router();
var cors = require('cors')

const consultasRoutes = require('./enfermeria/ConsultaRoute');
const deptoRoutes = require('./enfermeria/DepartamentoRoute');
const usuarioRoute = require('./enfermeria/UsuarioRoute');

router.use(cors());
router.use('/consultas', consultasRoutes);
router.use('/departamento', deptoRoutes);
router.use('/usuarios', usuarioRoute);


module.exports = router;