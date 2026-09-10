# 01 - Hola Mundo

Primeros pasos con Node.js: ejecución de scripts sueltos desde consola para
practicar sintaxis básica de JavaScript.

## Archivos

- `app.js` — "Hola Mundo" clásico con `console.log`.
- `app2.js` — función flecha `saludar(nombre)` que retorna un string con
  template string.
- `app3.js` — ejemplo del *event loop*: varios `setTimeout` con distintos
  delays (`3000`, `0`, `0`) para observar el orden real de ejecución frente
  al código síncrono.

## Uso

Cada archivo se ejecuta de forma independiente:

```bash
node app.js
node app2.js
node app3.js
```
