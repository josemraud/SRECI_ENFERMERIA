import { callAPISinToken } from "../helpers/callapi";

export class ConsultaService {
  // Obtener los Departamentos
    
  getAllConsultas() {
    return callAPISinToken("consultas/", "", "GET");
  }
  async addOneConsulta(data) {
    return await callAPISinToken("consultas/", data, "POST");
  }
}