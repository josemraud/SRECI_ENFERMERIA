/**
 Ruta de Usuario
 @Author Jose Mario Raudales
 */
const express = require("express");
let router = express.Router();                                      

let userController = require('../../controllers/UsuarioController');
const user = new userController();

//TRAER TODOS LOS USUARIOS
router.get('/', async (req, res)=>{
    try {
        const resultado = await user.getAll();
        res.status(200).json({'resultado':resultado,'code':200});
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ "message": "No Funciono",'code':400 });
    }
});
//Login
router.post('/login', async (req, res)=>{
    try {
        const {username, password} = req.body;
        const resultado = await user.loginUser({username, password});
        if(resultado.code==404){
            res.status(404).json({'resultado':resultado,'code':404});
        }
        else
        {
         res.status(200).json({'resultado':resultado,'code':200});
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({"message":"Error al inciar sesion",'code':400});
    }
});
//Insertar nueva user
router.post('/', async (req, res)=>{
    try {

        const {username, newpassword} = req.body;
        const activo=true;
        const password= await user.encriptar(newpassword);
        const resultado = await user.addOne({username, password, activo});
        if(resultado.code==500){
            res.status(500).json({'resultado':resultado,'code':500});
        }
        else
        {
         res.status(201).json({'resultado':resultado,'code':201});
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({"message":"Error al registrar",'code':400});
    }
}); 
//Modificar general de la user
router.put('/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {username, password}=req.body;
        const resultado = await user.updateOne(id, username, password);
        res.status(200).json({'resultado':resultado,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});
//Desactivar una user
router.put('/estado/:id/',async(req,res) => {
    try {
        const {id} = req.params;
        const {activo}=req.body;
        const resultado = await user.disableOne(id,activo);
        res.status(200).json({'resultado':resultado,'code':200});
        
    } catch (ex) {
        res.status(304).json({"message":"Error al actualizar",'code':304});
    }

});

module.exports = router;
