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
 import { usuarioservice, UsuarioService } from "../services/UsuarioService";
 
 export const EmptyPage = () => {
   const usuarioservice = new UsuarioService();
 
   const [globalFilter, setGlobalFilter] = useState(null);
   const [Usuario, setUsuario] = useState([]);
  
 
   // States variables
   const [FormUsuario, setFormUsuario] = useState({
     username: "",
     newpassword: "",
  
   });
   const [optButton, setOptButton] = useState(1);
   const [idUsuarioSelected, setIdUsuarioSelected] = useState(0);
   const [displayResponsive, setDisplayResponsive] = useState(false);
   const [checked2, setChecked2] = useState(true);
   const [estateUsuario, setEstateUsuario] = useState(true);
 
  // Listener de cambios del Form
  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormUsuario({
      ...FormUsuario,
      [name]: value,
    });
  };

   const {
     username="",
     newpassword="",
   } = FormUsuario;
   const home = { icon: "pi pi-home", url: "/" };
   const dt = useRef(null);
 
   const actionBodyTemplate = (rowData) => {
     return (
       <div className="actions">
         {rowData.activo == true ? (
           <Button
             icon="pi pi-pencil"
             className="p-button-rounded p-button-success p-mr-2"
             onClick={() => updateOneUser(rowData)}
             tooltip="Editar el usuario"
           />
         ) : (
           ""
         )}
         {rowData.activo == true ? (
           <Button
             icon="pi pi-lock"
             className="p-button-rounded p-button-danger p-mr-2"
             onClick={() => showModal(rowData._id, false)}
             tooltip="Deshabilita el usuario"
           />
         ) : (
           <Button
             icon="pi pi-lock-open"
             className="p-button-rounded p-button-primary"
             onClick={() => showModal(rowData._id, true)}
             tooltip="Habilita el usuario"
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
     setFormUsuario({
       username: rowData.username,
       password: rowData.password,
     });
     setOptButton(2);
     setIdUsuarioSelected(rowData._id);
   };
 
   // Habilitar / Deshabilitar Usuario
   const handleHabDesUsuario = async () => {
     await usuarioservice
       .updateStateUser(
         { activo: estateUsuario },
         idUsuarioSelected
       )
       .then((res) => {
         if (res.code === 200) {
           Swal.fire(
             estateUsuario === true
               ? "Usuario Habilitado"
               : "Usuario Deshabilitado",
             res.code,
             "success"
           );
           getallUsers();
           cleanForm();
           setDisplayResponsive(false);
         } else {
           Swal.fire(
             "Error al Actualizar el usuario!",
             JSON.stringify(res.code),
             "error"
           );
           getallUsers();
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
   const getallUsers = async () => {
     return await usuarioservice
       .getallUsers()
       .then(({ resultado }) => {
         console.log(resultado);
         const usuario = resultado.map((usuario) => {
           return {
             username: usuario.username,
             newpassword: usuario.newpassword,
             activo: usuario.activo,
             _id:usuario._id,
            
           };
         });
         setUsuario(usuario);
       });
   };

   useEffect(() => {
     getallUsers();
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
       
             onClick={addOneUser}
          />
           <Button label="Limpiar Formulario"  onClick={cleanForm}
           className="p-button-rounded p-button-success" 
           icon="pi pi-refresh"
            />
       </React.Fragment>
     );
   };
   // Nuevo Usuario
   const addOneUser = async (event) => {
     event.preventDefault();
    console.log(FormUsuario)
     if (optButton === 1) {
    console.log(FormUsuario)
       await usuarioservice
         .addOneUser(FormUsuario)
         .then((res) => {
           if (res.code === 201) {
             Swal.fire("Usuario Registrado!", res.code, "success");
             getallUsers();
             cleanForm();
           } else {
             Swal.fire(
               "Error al registrar el usuario!",
               JSON.stringify(res.code),
               "error"
             );
             getallUsers();
           }
         })
         .catch((error) => {
           Swal.fire("Error", error.message, "error");
         });
     } else if (optButton === 2) {
       await usuarioservice
         .updateOneUser(FormUsuario, idUsuarioSelected)
         .then((resultado) => {
           if (resultado.code === 200) {
             Swal.fire("Usuario Actualizado!", resultado.code, "success");
             getallUsers();
             cleanForm();
           } else {
             Swal.fire(
               "Error al actualizar el usuario!",
               JSON.stringify(resultado.code),
               "error"
             );
             getallUsers();
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
     setFormUsuario({
       username: "",
       newpassword: "",
     });
     setOptButton(1);
     setIdUsuarioSelected(0);
     setEstateUsuario(true);
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
       <h1>Mantenimiento de Usuarios</h1>
       <div className="card">
       <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname6">Nombre de Usuario</label>
                            <InputText id ="username" type="text" name="username" onChange={handleInputChange}
                             required value={username} placeholder="Username"/>
                        </div>
                       
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname6">Contraseña</label>
                            <InputText id ="newpassword" type="password" name="newpassword" onChange={handleInputChange}
                             required value={newpassword} placeholder="Contraseña"/>
                        </div>
                    </div>
                  
                  </div>
       <Toolbar
         className="p-mb-4"
         left={leftToolbarTemplate}
         right={rightToolbarTemplate}
       ></Toolbar>

       <hr />
 
       {/* Tabla CRUD de Usuario | INI */}
       <div className="datatable-filter-demo">
         <DataTable
           ref={dt}
           value={Usuario}
           paginator
           rows={5}
           header={header}
           globalFilter={globalFilter}
           className="p-datatable-customers"
           emptyMessage="No se ha encontrado usuarios con ese criterio de busqueda."
           rowsPerPageOptions={[5, 10, 25, 50]}
         
         >
           <Column
             field="username"
             header="Nombre de Usuario"
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
       {/* Tabla de Usuario| FIN */}
 
       {/* Confirmacion de Habilitar/Deshabilitar Usuario */}
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