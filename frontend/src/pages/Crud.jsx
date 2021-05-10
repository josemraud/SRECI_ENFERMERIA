import { BreadCrumb } from "primereact/breadcrumb";
 import { Button } from "primereact/button";
 import { Column } from "primereact/column";
 import { DataTable } from "primereact/datatable";
 import { Dropdown } from "primereact/dropdown";
 import { Dialog } from "primereact/dialog";
 import { FileUpload } from "primereact/fileupload";
 import { InputText } from "primereact/inputtext";
 import { Toolbar } from "primereact/toolbar";
 import React, { useEffect, useRef, useState } from "react";
 import Swal from "sweetalert2";
 import { Tooltip } from "primereact/tooltip";
 import { departamentoService, DepartamentoService } from "../services/DepartamentoService";
 
 export const Crud = () => {
   const departamentosservice = new DepartamentoService();
 
   const [globalFilter, setGlobalFilter] = useState(null);
   const [Departamentos, setDepartamentos] = useState([]);
  
 
   // States variables
   const [FormDepartamento, setFormDepartamento] = useState({
     departamento: "",
  
   });
   const [optButton, setOptButton] = useState(1);
   const [idDepartamentoSelected, setIdDepartamentoSelected] = useState(0);
   const [displayResponsive, setDisplayResponsive] = useState(false);
   const [checked2, setChecked2] = useState(true);
   const [estateDepartamento, setEstateDepartamento] = useState(true);
 
 


  // Listener de cambios del Form
  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormDepartamento({
      ...FormDepartamento,
      [name]: value,
    });
  };

   const {
     departamento="",
   } = FormDepartamento;
   const home = { icon: "pi pi-home", url: "/" };
   const dt = useRef(null);
 
   const actionBodyTemplate = (rowData) => {
     return (
       <div className="actions">
         {rowData.activo == true ? (
           <Button
             icon="pi pi-pencil"
             className="p-button-rounded p-button-success p-mr-2"
             onClick={() => updateOneDepartamento(rowData)}
             tooltip="Editar el departamento"
           />
         ) : (
           ""
         )}
         {rowData.activo == true ? (
           <Button
             icon="pi pi-lock"
             className="p-button-rounded p-button-danger p-mr-2"
             onClick={() => showModal(rowData._id, false)}
             tooltip="Deshabilita el departamento"
           />
         ) : (
           <Button
             icon="pi pi-lock-open"
             className="p-button-rounded p-button-primary"
             onClick={() => showModal(rowData._id, true)}
             tooltip="Habilita el departamento"
           />
         )}
         {/* <InputSwitch checked={checked2} onChange={(e) => setChecked2(e.value)} /> */}
       </div>
     );
   };
 
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
           onClick={handleHabDesDepartamento}
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
   const updateOneDepartamento = (rowData) => {
     setFormDepartamento({
       departamento: rowData.departamento,
     });
     setOptButton(2);
     setIdDepartamentoSelected(rowData._id);
   };
 
   // Habilitar / Deshabilitar Departamento
   const handleHabDesDepartamento = async () => {
     await departamentosservice
       .updateStateDepartamento(
         { activo: estateDepartamento },
         idDepartamentoSelected
       )
       .then((res) => {
         if (res.code === 200) {
           Swal.fire(
             estateDepartamento === true
               ? "Departamento Habilitado"
               : "Departamento Deshabilitado",
             res.code,
             "success"
           );
           getAllDepartamentos();
           cleanForm();
           setDisplayResponsive(false);
         } else {
           Swal.fire(
             "Error al Actualizar el departamento!",
             JSON.stringify(res.code),
             "error"
           );
           getAllDepartamentos();
           setDisplayResponsive(false);
         }
       })
       .catch((error) => {
         Swal.fire("Error", error.message, "error");
       });
   };
 
   const showModal = (_id, estateDepartamento = true) => {
     setDisplayResponsive(true);
     setIdDepartamentoSelected(_id);
     setEstateDepartamento(estateDepartamento);
   };
 
   // Obtener el listado de todos los departamentos
   const getAllDepartamentos = async () => {
     return await departamentosservice
       .getAllDepartamentos()
       .then(({ resultado }) => {
         console.log(resultado);
         const departamento = resultado.map((departamento) => {
           return {
             departamento: departamento.departamento,
             activo: departamento.activo,
             _id:departamento._id,
            
           };
         });
         setDepartamentos(departamento);
       });
   };

   useEffect(() => {
     getAllDepartamentos();
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
          <Button label="Guardar" 
          className="p-button-rounded p-button-info"
          icon="pi pi-plus"
       
             onClick={addOneDepartamento}
          />
           <Button label="Limpiar Formulario"  onClick={cleanForm}
           className="p-button-rounded p-button-success" 
           icon="pi pi-refresh"
            />
       </React.Fragment>
     );
   };
   // Nuevo Departamento
   const addOneDepartamento = async (event) => {
     event.preventDefault();
    console.log(FormDepartamento)
     if (optButton === 1) {
    console.log(FormDepartamento)
       await departamentosservice
         .addOneDepartamento(FormDepartamento)
         .then((res) => {
           if (res.code === 201) {
             Swal.fire("Departamento Registrado!", res.code, "success");
             getAllDepartamentos();
             cleanForm();
           } else {
             Swal.fire(
               "Error al registrar el departamento!",
               JSON.stringify(res.code),
               "error"
             );
             getAllDepartamentos();
           }
         })
         .catch((error) => {
           Swal.fire("Error", error.message, "error");
         });
     } else if (optButton === 2) {
       await departamentosservice
         .updateOneDepartamento(FormDepartamento, idDepartamentoSelected)
         .then((resultado) => {
           if (resultado.code === 200) {
             Swal.fire("Departamento Actualizado!", resultado.code, "success");
             getAllDepartamentos();
             cleanForm();
           } else {
             Swal.fire(
               "Error al actualizar el departamento!",
               JSON.stringify(resultado.code),
               "error"
             );
             getAllDepartamentos();
             cleanForm();
           }
         })
         .catch((error) => {
           Swal.fire("Error", error, "error");
         });
     }
   };
   
   // Limpiar formulario
   const cleanForm = () => {
     setFormDepartamento({
       departamento: "",
     });
     setOptButton(1);
     setIdDepartamentoSelected(0);
     setEstateDepartamento(true);
   };
 
   const header = (
     <div className="table-header">
       Listado de departamentos
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
       <h1>Mantenimiento de Departamentos</h1>
       <div className="card">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <InputText id ="departamento" type="text" name="departamento" onChange={handleInputChange}
                             value={departamento} placeholder="Departamento"/>
                    
                        </div>
                    </div>
                  
                  </div>
       <Toolbar
         className="p-mb-4"
         left={leftToolbarTemplate}
         right={rightToolbarTemplate}
       ></Toolbar>
 
 
                 

 
       <hr />
 
       {/* Tabla CRUD de Departamentos | INI */}
       <div className="datatable-filter-demo">
         <DataTable
           ref={dt}
           value={Departamentos}
           paginator
           rows={5}
           header={header}
           globalFilter={globalFilter}
           className="p-datatable-customers"
           emptyMessage="No se ha encontrado dependencias con ese criterio de busqueda."
           rowsPerPageOptions={[5, 10, 25, 50]}
         
         >
           <Column
             field="departamento"
             header="Departamento"
             style={{ width: "10%" }}
             // body={nombre1}
           ></Column>
           <Column
             body={actionBodyTemplate}
             header="Accion"
             style={{ width: "10%" }}
           ></Column>
         </DataTable>
       </div>
       {/* Tabla de Departamentos| FIN */}
 
       {/* Confirmacion de Habilitar/Deshabilitar Departamento */}
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
 };