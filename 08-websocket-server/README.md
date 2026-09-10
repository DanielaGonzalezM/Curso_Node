# 08 - WebSocket Server

Servidor Express con [Socket.io](https://socket.io/) para comunicación en tiempo real (WebSockets) entre el servidor y múltiples clientes conectados.

## Instalación

```bash
npm i
```

```bash
npm i express cors dotenv
npm i socket.io
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto (puedes basarte en `example.env`) con la siguiente variable:

```
PORT=3000
```

## Ejecución

```bash
npm start
```

El servidor arrancará en el puerto definido en `.env` (por defecto `3000`) y servirá el cliente estático ubicado en `public/`. Abre [http://localhost:3000](http://localhost:3000) en el navegador para probarlo.

## Estructura del proyecto

```
├── app.js                     # Punto de entrada de la aplicación
├── models/
│   └── server.js              # Clase Server: middlewares, rutas y configuración de sockets
├── sockets/
│   └── controller.js          # Manejo de eventos de conexión/desconexión y mensajes
└── public/
    ├── index.html              # Cliente de prueba (Bootstrap)
    └── js/
        └── socket-client.js    # Lógica del cliente Socket.io
```

## Funcionamiento

- `models/server.js` crea el servidor HTTP, instancia Socket.io sobre él y expone el directorio `public` como contenido estático.
- `sockets/controller.js` registra los listeners de cada socket conectado:
  - `connection` / `disconnect`: registran en consola cuándo un cliente se conecta o desconecta.
  - `enviar-mensaje`: recibe un mensaje del cliente, responde con un `callback` (acknowledgement) y retransmite el mensaje al resto de clientes conectados mediante `socket.broadcast.emit`.
- El cliente (`public/js/socket-client.js`) se conecta al servidor con `io()`, actualiza el estado de conexión en pantalla (Online/Offline) y permite enviar mensajes desde un input, mostrando en consola la respuesta del callback y los mensajes recibidos de otros clientes.

## Dependencias principales

- [express](https://expressjs.com/) - Servidor HTTP y archivos estáticos.
- [socket.io](https://socket.io/) - Comunicación en tiempo real vía WebSockets.
- [cors](https://www.npmjs.com/package/cors) - Habilita CORS en las peticiones.
- [dotenv](https://www.npmjs.com/package/dotenv) - Carga de variables de entorno desde `.env`.
