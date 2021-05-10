/**
 Controller de Consulta
 @Author Jose Mario Raudales
 */
 const Consulta = require('../models/enfermeria/ConsultaModel');
 var ObjectID = require('mongodb').ObjectID;
 var MongoDB = require('../models/dbm');
class ConsultasController{
    constructor(){
        this.collection = null
        MongoDB.getDb()
         .then (
           (db)=>{
             this.collection = db.collection("tbl_consultas");
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
    //Añadir una nueva Consulta
    async addOne(document){
        const funcionario = document.funcionario;
        const departamento = document.departamento;
        const fecha = document.fecha;
        const motivo_consulta = document.motivo_consulta;
        const diagnostico = document.diagnostico;
        const receta = document.receta;
        const result = await this.collection.insertOne(document);
    }
    //Actualizar general la Consulta
    async updateOne(id,funcionario, departamento, motivo_consulta, diagnostico, receta){
        try {
            const _id = new ObjectID(id);
            const updOps = {"$set": {"funcionario": funcionario, "departamento" : departamento, "motivo_consulta": motivo_consulta, "diagnostico":diagnostico, "receta":receta}};
            const updDoc = await this.collection.findOneAndUpdate({_id}, updOps, {returnOriginal:true});
            return updDoc;
        } catch (ex) {
            throw(ex);
        }

    }
    //Inactivar una Consulta
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
module.exports = ConsultasController;