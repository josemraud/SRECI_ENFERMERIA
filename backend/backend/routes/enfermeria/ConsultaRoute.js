/**
 Ruta de Consultas
 @Author Jose Mario Raudales
 */
const express = require("express");
let router = express.Router();                                      

let consultaController = require('../../controllers/ConsultasController');
const consulta = new consultaController();

//TRAER TODOS LOS CONSULTAS
router.get('/', async (req, res)=>{
    try {
        const rsltset = await consulta.getAll();
        res.status(200).json({'resultado':rsltset,'code':200});
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ "message": "No Funciono",'code':400 });
    }
});

//Insertar nueva consulta
router.post('/', async (req, res)=>{
    try {
        const {funcionario, departamento, motivo_consulta, diagnostico, receta} = req.body;
        const activo=true;
        var datetime = new Date();
        const fecha = datetime.toISOString().slice(0,10);
        const rsltset = await consulta.addOne({funcionario, departamento, fecha, motivo_consulta, diagnostico, receta, activo});
         res.status(201).json({'resultado':rsltset,'code':201});
    } catch (ex) {
        console.log(ex);
        res.status(400).json({"message":"Error al registrar",'code':400});
    }
}); 
//Modificar general de la consulta
router.put('/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {funcionario, departamento, motivo_consulta, diagnostico, receta}=req.body;
        const rsltset = await consulta.updateOne(id, funcionario, departamento, motivo_consulta, diagnostico, receta);
        res.status(200).json({'resultado':rsltset,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});
//Desactivar una consulta
router.put('/estado/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {activo}=req.body;
        const rsltset = await consulta.disableOne(id,activo);
        res.status(200).json({'resultado':rsltset,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});

module.exports = router;
