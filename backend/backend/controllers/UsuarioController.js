/**
 Controller de Usuario
 @Author Jose Mario Raudales
 */
 const Usuario = require('../models/enfermeria/UsuarioModel');
 var ObjectID = require('mongodb').ObjectID;
 var MongoDB = require('../models/dbm');
 const bcrypt = require('bcryptjs');
class UsuarioController{
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
    //Traer todas las Usuarios
    async getAll(){
        try {
            const rslt = await this.collection.find({}).toArray();
            return rslt;

        } catch (ex) {
            throw(ex);
        }
    }
    //Login
    async loginUser (document) {
        
        try {
            const username=document.username;
            const password=document.password;
        // Usuario Exist
            const usuarioDB = await this.collection.findOne({ username });
            if (!usuarioDB) {
                return({"message":"Usuario o Contraseña incorrectos","code":404});
            } else {
            // Validar Password
                const validPassword = bcrypt.compareSync(password, usuarioDB.password);
                if (!validPassword) {
                    
                    return({"message":"Usuario o Contraseña incorrectos","code":404});
                }
                else {
                    if(usuarioDB.activo === false){
                        return({"message":"Usuario inactivo","code":404})
                    }
                    else{
                        if(usuarioDB && validPassword && usuarioDB.activo === true){
                            return({"message":"Inicio de sesion completo","code":200})
                        }
                    }
                } 
            };
        } catch (error) {
            return({"message":"Contacte al administrador","code":500});
        }
    }
    //Añadir una nueva Usuario
    async addOne(document){
        try {
            const username = document.departamento;
            const password = document.password;
            const valid2 = await this.collection.find({username:username}).toArray();
            if (valid2.length > 0){
                return({"message":"Nombre de usuario ya existe","code":500});
            }
            else{
                const result = await this.collection.insertOne(document);
                return result;
            }
        } catch (ex) {
            throw(ex);
        }
    }

    async encriptar(password){
        try {
            const salt = bcrypt.genSaltSync();
            const newpassword = bcrypt.hashSync(password, salt);    
            return newpassword;
        } catch (ex) {
            throw(ex);
            
        }

    }

    //Actualizar general la Usuario
    async updateOne(id, username, password){
        try {
            const _id = new ObjectID(id);
            const updOps = {"$set": {"username" : username, "password" : password}};
            const updDoc = await this.collection.findOneAndUpdate({_id}, updOps, {returnOriginal:true});
            return updDoc;
        } catch (ex) {
            throw(ex);
        }

    }
    //Inactivar una Usuario
    async disableOne(id,activo){
        try {
            const _id = new ObjectID(id);
            const updOps = {"$set": {"activo" : activo}};
            const updDoc = await this.collection.findOneAndUpdate({_id}, updOps, {returnOriginal:true});
            return updDoc;
        } catch (ex) {
            throw(ex);
        }
    }
}
module.exports = UsuarioController;