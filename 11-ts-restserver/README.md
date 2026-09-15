# 11 - TS RestServer

API REST construida con Express, TypeScript y Sequelize (PostgreSQL).

## Instalación

```bash
npm install
```

Comandos usados para armar el proyecto desde cero:

```bash
npm init -y
tsc --init
npm i tslint --save-dev
npm i typescript --save-dev
./node_modules/.bin/tslint --init
npm i express cors dotenv
npm i --save-dev @types/express
npm i --save-dev @types/cors
npm i --save sequelize
npm install --save pg pg-hstore
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=3001
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
```

## Ejecución

```bash
tsc --watch
```

Compila el proyecto en modo watch. El servidor se levanta en el puerto definido por `PORT` (por defecto `3001`).

## Endpoints

Base path: `/api/usuarios`

| Método | Ruta            | Descripción                              |
| ------ | --------------- | ----------------------------------------- |
| GET    | `/api/usuarios`     | Lista todos los usuarios                |
| GET    | `/api/usuarios/:id` | Obtiene un usuario por id               |
| POST   | `/api/usuarios`     | Crea un usuario                         |
| PUT    | `/api/usuarios/:id` | Actualiza los datos de un usuario       |
| DELETE | `/api/usuarios/:id` | Borrado lógico (marca `estado: false`)  |

## Estructura del proyecto

```
├── app.ts                    # Punto de entrada
├── db/
│   └── connection.ts         # Conexión Sequelize (PostgreSQL)
├── models/
│   ├── server.ts             # Clase Server (Express)
│   └── usuario.ts            # Modelo Usuario
├── controllers/
│   └── usuarios.ts           # Lógica de cada endpoint
└── routes/
    └── usuario.ts            # Definición de rutas
```
