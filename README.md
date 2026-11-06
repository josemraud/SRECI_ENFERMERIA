# SRECI Enfermería

Libro diario de enfermería. Permite registrar consultas, consultar el historial y dar mantenimiento a usuarios y departamentos.

## Estructura

| Carpeta | Qué es |
| --- | --- |
| `frontend/` | Interfaz en React y PrimeReact. Se abre en el puerto 3000. |
| `backend/backend/` | API en Express. Escucha en el puerto 3001. |
| `dbenfermeria/` | Volcado de MongoDB con `tbl_usuarios`, `tbl_departamentos` y `tbl_consultas`. |

La interfaz llama a la API en `http://localhost:3001/api` (`frontend/src/helpers/callapi.jsx`).

## Requisitos

- [Node.js 14](https://nodejs.org/). El frontend usa React Scripts 4 y `node-sass` 4, que no instalan en Node 17 o superior.
- npm
- MongoDB en ejecución

## Base de datos

Crear `backend/backend/.env`. Ese archivo no se versiona.

```
MONGOURI=mongodb://127.0.0.1:27017
MONGODB=dbenfermeria
NODE_ENV=development
```

`PORT` es opcional. Si no está definido, la API usa el puerto 3001.

Para cargar el volcado incluido en el repositorio:

```
mongorestore --db dbenfermeria ./dbenfermeria
```

## Cómo ejecutarlo

En una terminal, la API:

```
cd backend/backend
npm install
npm start
```

En otra terminal, la interfaz:

```
cd frontend
npm install
npm start
```

Abrir [http://localhost:3000](http://localhost:3000). Las rutas usan hash.

| Ruta | Pantalla |
| --- | --- |
| `/#/calendar` | Nueva consulta |
| `/#/historial` | Historial de consultas |
| `/#/crud` | Departamentos |
| `/#/empty` | Usuarios |

## API

Base: `http://localhost:3001/api`

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/consultas` | Listar consultas |
| POST | `/consultas` | Registrar una consulta |
| PUT | `/consultas/:id` | Editar una consulta |
| PUT | `/consultas/estado/:id` | Activar o desactivar una consulta |
| GET | `/departamento` | Listar departamentos |
| GET | `/departamento/activos` | Listar departamentos activos |
| POST | `/departamento` | Crear un departamento |
| PUT | `/departamento/:id` | Editar un departamento |
| PUT | `/departamento/estado/:id` | Activar o desactivar un departamento |
| GET | `/usuarios` | Listar usuarios |
| POST | `/usuarios/login` | Iniciar sesión |
| POST | `/usuarios` | Crear un usuario |
| PUT | `/usuarios/:id` | Editar un usuario |
| PUT | `/usuarios/estado/:id` | Activar o desactivar un usuario |

Las contraseñas se guardan con bcrypt.
