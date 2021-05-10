/**
 Controller de Departamento
 @Author Jose Mario Raudales
 */
 const Departamento = require('../models/enfermeria/DepartamentoModel');
 var ObjectID = require('mongodb').ObjectID;
 var MongoDB = require('../models/dbm');
class DepartamentoController{
    constructor(){
        this.collection = null
        MongoDB.getDb()
         .then (
           (db)=>{
             this.collection = db.collection("tbl_departamentos");
           }
        )
         .catch((ex)=>{
          throw(ex);
        });
    }
    //Traer todas las Areas
    async getAll(){
        try {
            const rslt = await this.collection.find({}).toArray();
            return rslt;

        } catch (ex) {
            throw(ex);
        }
    }
    //traer activos
    async getActive(){
        try {
            const rslt = await this.collection.find({activo:true}).toArray();
            return rslt;
        } catch (ex) {
            throw(ex);
        }
    }
    //Añadir una nueva Departamento
    async addOne(document){
        try {
            const departamento = document.departamento;
            const valid2 = await this.collection.find({departamento:departamento}).toArray();
            if (valid2.length > 0){
                return({"message":"Error al registrar","code":500});
            }
            else{
                const result = await this.collection.insertOne(document);
                return result;
            }
        } catch (ex) {
            throw(ex);
        }
    }
    //Actualizar general la Departamento
    async updateOne(id, departamento){
        try {
            const _id = new ObjectID(id);
            const updOps = {"$set": {"departamento" : departamento}};
            const updDoc = await this.collection.findOneAndUpdate({_id}, updOps, {returnOriginal:true});
            return updDoc;
        } catch (ex) {
            throw(ex);
        }

    }
    //Inactivar una Departamento
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
module.exports = DepartamentoController;