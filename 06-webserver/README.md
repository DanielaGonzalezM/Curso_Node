# 06 - Webserver

Servidor web con Express que sirve una plantilla de página estática
(Handlebars) y archivos estáticos (CSS, JS, imágenes). Incluye también un
ejemplo previo con el módulo nativo `http`.

## Archivos principales

- `app.js` — servidor Express actual: configura `hbs` como *view engine*,
  registra los partials (`views/partials`), sirve la carpeta `public` como
  contenido estático y define las rutas `/`, `/generic`, `/elements` (cada
  una renderiza una vista `.hbs` pasando `nombre` y `titulo`) más una ruta
  comodín (`*`) que devuelve `public/404.html`.
- `app-old.js` — ejemplo inicial con el módulo nativo `http` (sin Express),
  usado para ilustrar la respuesta manual de un servidor HTTP antes de
  introducir Express. No forma parte del flujo actual de la app.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto (puedes basarte en
`example.env`) con la siguiente variable:

```
PORT=8080
```

## Uso

```bash
npm start
```

El servidor imprime `Corriendo en puerto:<PORT>` y sirve:

- `/` — vista `home.hbs`
- `/generic` — vista `generic.hbs`
- `/elements` — vista `elements.hbs`
- cualquier otra ruta — `public/404.html`

## Estructura

```
app.js                Servidor Express (punto de entrada actual)
app-old.js            Ejemplo previo con http nativo (no usado por npm start)
views/                Plantillas Handlebars (home, generic, elements, partials)
public/               Archivos estáticos (CSS, JS, imágenes, plantilla original en /old)
```
