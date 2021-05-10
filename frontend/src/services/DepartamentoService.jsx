import { callAPISinToken } from "../helpers/callapi";

export class DepartamentoService {
  // Obtener los Departamentos
    
  getAllDepartamentos() {
    return callAPISinToken("departamento/", "", "GET");
  }
  getAllDepartamentosActive() {
    return callAPISinToken("departamento/activos", "", "GET");
  }
  async addOneDepartamento(data) {
    return await callAPISinToken("departamento/", data, "POST");
  }
  async updateOneDepartamento(data, _id) {
    return callAPISinToken(`departamento/${_id}`, data, "PUT");
  }
  async updateStateDepartamento(data, _id) {
    return await callAPISinToken(`departamento/estado/${_id}`, data, "PUT");
  } // FIN | PUT Departamento editar Callback ******
}