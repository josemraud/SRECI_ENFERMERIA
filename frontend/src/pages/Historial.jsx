import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { DepartamentoService } from '../services/DepartamentoService'
import { ConsultaService } from '../services/ConsultaService'
import { Card } from 'primereact/card';
export const Historial = () => {
  const consultaService = new ConsultaService();
  const departamentoservice = new DepartamentoService();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [Consulta, setConsulta] = useState([]);
  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  // States variables
  const [FormConsulta, setFormConsulta] = useState({
    _id: "",
    funcionario: "",
    departamento: "",
    motivo_consulta: "",
    diagnostico: "",
    receta: "",
    fecha: "",
    activo: "",
 
  });
  //TRAER COSAS DE COMBOBOX
const [selectedDepartamento, setSelectedDepartamento] = useState([null]);
const [Departamento, setDepartamento] = useState([]);


const onDepartamentoChange =(e)=> {
  setSelectedDepartamento(e.value);
  setFormConsulta({
    ...FormConsulta,
    departamento: e.value.departamento,
 })}

 const getAllDepartamentosActive = async () => {
  departamentoservice.getAllDepartamentosActive().then(({ resultado }) => {
    console.log(resultado)
    
      const depto = resultado.map((depto) => {
        return {
          _id:depto._id,
          departamento:depto.departamento,
          activo:depto.activo,
        };
      });
      setDepartamento(depto);
  });
};
  const [optButton, setOptButton] = useState(1);
  const [idUsuarioSelected, setIdUsuarioSelected] = useState(0);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [estateUsuario, setEstateUsuario] = useState(true);

 // Listener de cambios del Form
 const handleInputChange = ({ target }) => {
   const { name, value } = target;

   setFormConsulta({
     ...FormConsulta,
     [name]: value,
   });
 };

  const {
    funcionario="",
    departamento="",
    motivo_consulta="",
    diagnostico="",
    receta="",
    fecha="",
  } = FormConsulta;
  const home = { icon: "pi pi-home", url: "/" };
  const dt = useRef(null);

  

  // Modal buttons actions
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Limpiar"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-danger p-button-text"
          
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          autoFocus
          onClick={handleHabDesUsuario}
        />
        
      </div>
    );
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  // Acciones de botones de Tabla
  const updateOneUser = (rowData) => {
    setFormConsulta({
      username: rowData.username,
      correo: rowData.correo,
      password: rowData.password,
    });
    setOptButton(2);
    setIdUsuarioSelected(rowData._id);
  };

  // Habilitar / Deshabilitar Consulta
  const handleHabDesUsuario = async () => {
    await consultaService
      .updateStateUser(
        { activo: estateUsuario },
        idUsuarioSelected
      )
      .then((res) => {
        if (res.code === 200) {
          Swal.fire(
            estateUsuario === true
              ? "Consulta Habilitado"
              : "Consulta Deshabilitado",
            res.code,
            "success"
          );
          getAllConsultas();
          cleanForm();
          setDisplayResponsive(false);
        } else {
          Swal.fire(
            "Error al Actualizar el usuario!",
            JSON.stringify(res.code),
            "error"
          );
          getAllConsultas();
          setDisplayResponsive(false);
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const showModal = (_id, estateUsuario = true) => {
    setDisplayResponsive(true);
    setIdUsuarioSelected(_id);
    setEstateUsuario(estateUsuario);
  };

  // Obtener el listado de todos los departamentos
  const getAllConsultas = async () => {
    return await consultaService
      .getAllConsultas()
      .then(({ resultado }) => {
        console.log(resultado);
        const consul = resultado.map((consul) => {
          return {
            funcionario: consul.funcionario,
            departamento: consul.departamento,
            fecha: consul.fecha,
            activo: consul.activo,
            _id:consul._id,
            motivo_consulta: consul.motivo_consulta,
            diagnostico: consul.diagnostico,
            receta: consul.receta,

          };
        });
        setConsulta(consul);
      });
  };

  useEffect(() => {
    getAllConsultas();
    getAllDepartamentosActive();
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  // Barra horizontal
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Exportar"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        
      </React.Fragment>
    );
  };
  // Nuevo Consulta
  const addOneConsulta = async (event) => {
    event.preventDefault();
   console.log(FormConsulta)
    if (optButton === 1) {
   console.log(FormConsulta)
      await consultaService
        .addOneConsulta(FormConsulta)
        .then((res) => {
          if (res.code === 201) {
            Swal.fire("Consulta Registrado!", res.code, "success");
            getAllConsultas();
            cleanForm();
          } else {
            Swal.fire(
              "Error al registrar el consulta!",
              JSON.stringify(res.code),
              "error"
            );
            getAllConsultas();
          }
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    }
  };
  
  // Limpiar formulario
  const cleanForm = () => {
    setFormConsulta({
      funcionario: "",
      departamento: "",
      motivo_consulta: "",
      receta: "",
      diagnostico: "",
    });
    setOptButton(1);
    setIdUsuarioSelected(0);
    setEstateUsuario(true);
  };

  const header = (
    <div className="table-header">
      Listado de consultas
      <div className="p-button-info p-ml-auto">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Busqueda Global"
        />
      </span>
      </div>
    </div>
  );

  return (
    <>
      <h1>Libro Diario de Consultas</h1>
      
          

      {/* Tabla CRUD de Consulta | INI */}
      <div className="datatable-filter-demo">
      <Toolbar
        className="p-mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
        <DataTable
          ref={dt}
          value={Consulta}
          paginator
          rows={5}
          header={header}
          globalFilter={globalFilter}
          className="p-datatable-customers"
          emptyMessage="No se ha encontrado consultas con ese criterio de busqueda."
          rowsPerPageOptions={[5, 10, 25, 50]}
        
        >
          <Column
            field="funcionario"
            header="Nombre de Empleado"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
          <Column
            field="departamento"
            header="Departamento"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
          <Column
            field="fecha"
            header="Fecha"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
          <Column
            field="motivo_consulta"
            header="Motivo de Consulta"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
          <Column
            field="diagnostico"
            header="Diagnostico"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
          <Column
            field="receta"
            header="Receta"
            style={{ width: "10%" }}
            // body={nombre1}
          ></Column>
        </DataTable>
      </div>
      {/* Tabla de Consulta| FIN */}

      {/* Confirmacion de Habilitar/Deshabilitar Consulta */}
      <Dialog
        header="Confirmation"
        visible={displayResponsive}
        modal
        style={{ width: "350px" }}
        footer={renderFooter("displayResponsive")}
        onHide={() => onHide("displayResponsive")}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Estas seguro de seguir con tu solicitud?</span>
        </div>
      </Dialog>
    </>
  );
}
