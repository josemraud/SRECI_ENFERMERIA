import { callAPISinToken } from "../helpers/callapi";

export class UsuarioService {
    // Obtener los Usuarios

   async getallUsers() {
      return callAPISinToken("usuarios/", "", "GET");
    }
    async addOneUser(data) {
      return await callAPISinToken("usuarios/", data, "POST");
    }
    async updateOneUser(data, _id) {
      return callAPISinToken(`usuarios/${_id}`, data, "PUT");
    }
    async updateStateUser(data, _id) {
      return await callAPISinToken(`usuarios/estado/${_id}`, data, "PUT");
    } // FIN | PUT Departamento editar Callback ******
  }