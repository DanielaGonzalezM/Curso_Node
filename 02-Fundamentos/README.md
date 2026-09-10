# 02 - Fundamentos de JavaScript

Colección de scripts sueltos que practican fundamentos de JavaScript moderno
usados a lo largo del curso de Node.

## Archivos

- `const-var-let.js` — diferencia de *scope* entre `const`/`let` (bloque) y
  cómo una redeclaración dentro de un `if` no sobreescribe la variable
  externa.
- `flecha.js` — funciones flecha (`arrow functions`) básicas.
- `template-string.js` — template strings vs. concatenación tradicional,
  incluyendo bloques multilínea con HTML.
- `desestructuracion.js` — desestructuración de objetos, valores por
  defecto y parámetros desestructurados en funciones.
- `callbacks.js` — función asíncrona simulada con `setTimeout` que recibe un
  callback.
- `callback-hell.js` — encadenamiento de callbacks anidados (`getEmpleado` →
  `getSalario`) para ilustrar el problema del "callback hell".
- `promesas.js` — la misma lógica de `callback-hell.js` reescrita con
  `Promise`, `resolve`/`reject` y encadenamiento con `.then()`.
- `asyn-await.js` — la misma lógica resuelta con `async/await` sobre las
  promesas anteriores.

## Uso

Cada archivo se ejecuta de forma independiente:

```bash
node <archivo>.js
```

Por ejemplo:

```bash
node promesas.js
```
