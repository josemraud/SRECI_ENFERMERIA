/**
 Ruta de Departamentos
 @Author Jose Mario Raudales
 */
const express = require("express");
let router = express.Router();                                      

let deptoController = require('../../controllers/DepartamentoController');
const depto = new deptoController();

//TRAER TODOS LOS DEPARTAMENTOS
router.get('/', async (req, res)=>{
    try {
        const rsltset = await depto.getAll();
        res.status(200).json({'resultado':rsltset,'code':200});
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ "message": "No Funciono",'code':400 });
    }
});

router.get('/activos', async (req, res)=>{
    try {
        const rsltset = await depto.getActive();
        res.status(200).json({'resultado':rsltset,'code':200});
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ "message": "No Funciono",'code':400 });
    }
}); 


//Insertar nueva depto
router.post('/', async (req, res)=>{
    try {
        const {departamento} = req.body;
        const activo=true;
        const rsltset = await depto.addOne({departamento, activo});
        if(rsltset.code==500){
            res.status(500).json({'resultado':rsltset,'code':500});
        }
        else
        {
         res.status(201).json({'resultado':rsltset,'code':201});
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({"message":"Error al registrar",'code':400});
    }
}); 
//Modificar general de la depto
router.put('/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {departamento}=req.body;
        const rsltset = await depto.updateOne(id, departamento);
        res.status(200).json({'resultado':rsltset,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});
//Desactivar una depto
router.put('/estado/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {activo}=req.body;
        const rsltset = await depto.disableOne(id,activo);
        res.status(200).json({'resultado':rsltset,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});

module.exports = router;
