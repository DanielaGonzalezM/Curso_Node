# 09 - Socket Colas

Sistema de turnos/tickets en tiempo real (tipo "tomar un turno") usando
Node, Express y Socket.io. Temas cubiertos en el curso de Node de cero a
experto.

> Proyecto en desarrollo inicial: la estructura de pantallas y el servidor
> ya están montados, pero la lógica de la cola de turnos en
> `sockets/controller.js` todavía es un placeholder (solo retransmite
> mensajes de prueba).

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto (puedes basarte en
`example.env`) con la siguiente variable:

```
PORT=3000
```

## Uso

```bash
npm start
```

## Pantallas (`public/`)

- `publico.html` — pantalla pública que muestra el turno en curso (audio de
  aviso incluido en `public/audio/new-ticket.mp3`).
- `nuevo-ticket.html` — pantalla para generar un nuevo ticket/turno.
- `escritorio.html` — pantalla de escritorio/operador para llamar turnos.

## Estructura

```
app.js                    Punto de entrada
models/server.js          Clase Server: middlewares, rutas y configuración de sockets
sockets/controller.js     Manejo de eventos de socket (en desarrollo)
public/                   Pantallas HTML (público, nuevo ticket, escritorio) y sus scripts JS
```
