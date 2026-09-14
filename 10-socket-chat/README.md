# 10 - Socket Chat

API REST construida con Node.js, Express y MongoDB (Mongoose). Incluye autenticación con JWT y Google Sign-In, control de roles, CRUD de usuarios/categorías/productos, búsqueda genérica por colección, carga de imágenes (almacenamiento local o Cloudinary) y un **chat en tiempo real con Socket.IO** (mensajes globales y privados).

## Tecnologías principales

- **Express** — servidor y enrutamiento HTTP
- **Socket.IO** — comunicación en tiempo real (chat global y mensajes privados)
- **Mongoose** — conexión y modelado de datos en MongoDB
- **jsonwebtoken** — generación y validación de JWT
- **bcryptjs** — hash de contraseñas
- **google-auth-library** — validación de tokens de Google Sign-In
- **express-validator** — validación de campos de entrada
- **express-fileupload** — carga de archivos (imágenes)
- **cloudinary** — almacenamiento de imágenes en la nube
- **cors**, **dotenv**, **uuid**

## Requisitos previos

- Node.js
- Una base de datos MongoDB (local o en Atlas)
- Una cuenta de [Cloudinary](https://cloudinary.com/) (para la carga de imágenes)
- Credenciales OAuth de Google (para el login con Google)

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto (puedes tomar como base `example.env`) con las siguientes variables:

| Variable             | Descripción                                                   |
| -------------------- | -------------------------------------------------------------- |
| `PORT`                | Puerto en el que corre el servidor (por defecto `3000`)       |
| `MONGODB_CNN`         | Cadena de conexión a MongoDB                                   |
| `SECRETORPRIVATEKEY`  | Clave secreta usada para firmar/verificar los JWT              |
| `GOOGLE_CLIENT_ID`    | Client ID de Google usado para verificar el login con Google   |
| `GOOGLE_SECRET_ID`    | Client Secret de Google                                        |
| `CLOUDINARY_URL`      | URL de configuración de Cloudinary (`cloudinary://<api_key>:<api_secret>@<cloud_name>`) |

## Ejecutar el proyecto

Modo desarrollo (con recarga automática vía `nodemon`):

```bash
nodemon app
```

Modo producción:

```bash
npm start
```

El servidor imprimirá en consola `Corriendo en puerto <PORT>` y se conectará a la base de datos configurada en `MONGODB_CNN`.

## Estructura del proyecto

```
10-socket-chat/
├── app.js                  # Punto de entrada
├── database/config.js      # Conexión a MongoDB
├── models/                 # Modelos de Mongoose + clase Server
│   ├── server.js           # Configuración de Express + Socket.IO (middlewares, rutas y sockets)
│   ├── usuario.js
│   ├── categoria.js
│   ├── productos.js
│   ├── role.js
│   └── chat-mensajes.js    # Clase en memoria: usuarios conectados y últimos mensajes
├── sockets/
│   └── socketControllers.js # Lógica de conexión/desconexión y eventos de chat
├── routes/                 # Definición de endpoints por recurso
├── controllers/             # Lógica de cada endpoint
├── middlewares/             # validar-jws, validar-roles, validar-campos, validar-archivo
├── helpers/                 # generar-jwt, google-verify, subir-archivo, db-validators
├── uploads/                 # Imágenes subidas localmente (usuarios/productos)
├── assets/                  # Imagen por defecto (no-image.jpg)
└── public/                  # Archivos estáticos servidos por Express
    ├── index.html           # Login (correo/password o Google Sign-In)
    ├── chat.html             # Interfaz del chat
    └── js/
        ├── auth.js           # Lógica de login/logout
        └── chat.js            # Conexión al socket, chat global y mensajes privados
```

## Autenticación y autorización

- La mayoría de rutas de escritura requieren el header `x-token` con un JWT válido (middleware `validarJWT`).
- El JWT se genera con `generarJWT` (helper) y se firma con `SECRETORPRIVATEKEY`.
- El rol del usuario (`ADMIN_ROLE` / `USER_ROLE`) se valida con los middlewares `esAdminRole` y `tieneRole(...roles)`.
- El login con Google verifica el `id_token` contra `GOOGLE_CLIENT_ID` mediante `google-auth-library`; si el usuario no existe, se crea automáticamente.

## Endpoints

Todas las rutas tienen como base `http://localhost:<PORT>/api`.

### Auth — `/api/auth`

| Método | Ruta      | Descripción                          | Body                          |
| ------ | --------- | ------------------------------------- | ------------------------------ |
| POST   | `/login`  | Login con correo y password           | `{ correo, password }`         |
| POST   | `/google` | Login/registro con Google Sign-In     | `{ id_token }`                 |

### Usuarios — `/api/usuarios`

| Método | Ruta  | Auth requerida        | Descripción                                    |
| ------ | ----- | ---------------------- | ------------------------------------------------ |
| GET    | `/`   | No                      | Lista paginada de usuarios activos (`?limite&desde`) |
| POST   | `/`   | No                      | Crea un usuario (`nombre`, `correo`, `password`, `rol`) |
| PUT    | `/:id`| No                      | Actualiza un usuario (permite cambiar `password`) |
| DELETE | `/:id`| Sí (Admin/Ventas)       | Borrado lógico (`estado: false`)                 |
| PATCH  | `/`   | No                      | Endpoint de ejemplo (no implementado)            |

### Categorías — `/api/categorias`

| Método | Ruta   | Auth requerida | Descripción                                  |
| ------ | ------ | ---------------- | ---------------------------------------------- |
| GET    | `/`    | No                | Lista paginada de categorías activas (`?limite&desde`) |
| GET    | `/:id` | No                | Obtiene una categoría por id                   |
| POST   | `/`    | Sí                | Crea una categoría                             |
| PUT    | `/:id` | Sí                | Actualiza una categoría                        |
| DELETE | `/:id` | Sí (Admin)        | Borrado lógico (`estado: false`)               |

### Productos — `/api/productos`

| Método | Ruta   | Auth requerida | Descripción                                  |
| ------ | ------ | ---------------- | ---------------------------------------------- |
| GET    | `/`    | No                | Lista paginada de productos activos (`?limit&desde`) |
| GET    | `/:id` | No                | Obtiene un producto por id                     |
| POST   | `/`    | Sí                | Crea un producto (requiere `nombre`, `categoria`) |
| PUT    | `/:id` | Sí                | Actualiza un producto                          |
| DELETE | `/:id` | Sí (Admin)        | Borrado lógico (`estado: false`)               |

### Búsqueda — `/api/buscar`

| Método | Ruta                    | Descripción                                                                 |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| GET    | `/:coleccion/:termino`  | Busca en `usuarios`, `categorias`, `productos` o `roles`. Si `termino` es un ObjectId válido, busca por id; en caso contrario, hace una búsqueda por texto (regex) |

### Carga de archivos — `/api/uploads`

| Método | Ruta               | Descripción                                                                 |
| ------ | ------------------- | ----------------------------------------------------------------------------- |
| POST   | `/`                  | Sube un archivo suelto a la carpeta `uploads/imgs` (campo `archivo`, multipart/form-data) |
| PUT    | `/:coleccion/:id`   | Sube/actualiza la imagen de un usuario o producto y la guarda en **Cloudinary** (`coleccion`: `usuarios` o `productos`) |
| GET    | `/:coleccion/:id`   | Redirige a la imagen del usuario/producto en Cloudinary, o a la imagen por defecto si no tiene |

> Nota: `actualizarImagen` y `mostrarImagen` (almacenamiento local en `uploads/`) siguen disponibles en el controlador `uploads.js` como implementación previa a la migración a Cloudinary, pero las rutas activas usan las versiones `*Cloudinary`.

## Chat en tiempo real (Socket.IO)

La conexión de sockets se autentica con el mismo JWT que el REST API, enviado en el header `x-token` durante el handshake (`extraHeaders` en el cliente). Si el token no es válido, el socket se desconecta de inmediato (`sockets/socketControllers.js`).

Al conectarse, cada usuario se une a una sala propia (`socket.join(usuario.id)`), lo que permite enviarle mensajes privados sin que el resto del chat los vea.

### Eventos emitidos por el servidor

| Evento              | Payload                              | Cuándo se emite                                                   |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| `usuarios-activos`   | Array de usuarios conectados (`uid`, `nombre`, ...) | Al conectarse o desconectarse un usuario (broadcast a todos)      |
| `recibir-mensajes`   | Últimos 10 mensajes del chat global    | Al conectarse un usuario (solo a él) y tras cada mensaje global (broadcast) |
| `mensajes-privado`   | `{ de, mensaje }`                       | Cuando alguien envía un mensaje privado (solo al destinatario)     |

### Eventos escuchados por el servidor

| Evento             | Payload            | Descripción                                                                 |
| -------------------- | -------------------- | ------------------------------------------------------------------------------ |
| `enviar-mensaje`    | `{ uid, mensaje }`   | Si `uid` viene informado, se envía como mensaje privado a esa sala; si no, se difunde al chat global |
| `disconnect`        | —                    | Elimina al usuario de la lista de conectados y actualiza `usuarios-activos`  |

### Front-end del chat (`public/js/chat.js`)

- Valida el JWT contra `/api/auth` antes de abrir el socket; si no es válido, redirige a `index.html`.
- Pinta la lista de usuarios conectados (excluyéndose a sí mismo) en un panel independiente; **hacer clic en un usuario** lo selecciona como destinatario de mensajes privados (un segundo clic vuelve al chat global).
- Los mensajes privados se muestran resaltados (fondo amarillo + etiqueta "privado"), tanto los recibidos como los enviados.
- El mensaje se envía con Enter o con el botón "Enviar"; el chat global se actualiza para todos, el privado solo es visible entre emisor y destinatario.

> Nota: `chat-mensajes.js` guarda usuarios y mensajes **en memoria** (no en base de datos), por lo que el historial se pierde al reiniciar el servidor.

## Modelos de datos

- **Usuario**: `nombre`, `correo` (único), `password`, `img`, `rol` (`ADMIN_ROLE` | `USER_ROLE`), `google`, `estado`.
- **Categoria**: `nombre`, `estado`, `usuario` (referencia a quien la creó).
- **Producto**: `nombre`, `estado`, `usuario`, `precio`, `categoria` (referencia), `descripcion`, `disponible`, `img`.
- **Role**: `rol` (catálogo de roles válidos, usado por las validaciones de usuario).

## Notas adicionales

- Las respuestas de `Usuario` omiten `password` y `__v`, y exponen el `_id` como `uid`.
- Las respuestas de `Categoria` y `Producto` omiten `__v` y `estado`.
- Los borrados son lógicos (se marca `estado: false`), no se elimina el documento de la base de datos.
