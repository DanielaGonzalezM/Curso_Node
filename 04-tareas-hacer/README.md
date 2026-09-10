# 04 - Tareas por hacer (To-Do List CLI)

Aplicación de consola interactiva para gestionar una lista de tareas
(to-do list), con menú de opciones, persistencia en un archivo JSON y
salida coloreada.

## Conceptos usados

- Menús interactivos por consola con [`inquirer`](https://www.npmjs.com/package/inquirer)
  (`helpers/inquirer.js`): listas, checkbox, confirmaciones e inputs con
  validación.
- Programación orientada a objetos: clases `Tarea` y `Tareas`
  (`models/tarea.js`, `models/tareas.js`) con getters, y manejo del listado
  como diccionario indexado por `id`.
- Identificadores únicos con [`uuid`](https://www.npmjs.com/package/uuid).
- Persistencia simple en disco con el módulo nativo `fs`, leyendo/escribiendo
  un archivo `db/data.json` (`helpers/guardarArchivo.js`).
- Salida coloreada en consola con [`colors`](https://www.npmjs.com/package/colors).
- Bucle principal `do...while` que mantiene el menú activo hasta elegir salir.

## Instalación

```
npm install
```

## Uso

```
node app.js
```

Al iniciar, la app carga las tareas guardadas en `db/data.json` (si existe) y
muestra un menú con las siguientes opciones:

```
1. Crear tarea
2. Listar tareas
3. Listar tareas completadas
4. Listar tareas pendientes
5. Completar tareas
6. Borrar tarea
0. Salir
```

Cada tarea tiene un `id` (uuid), una descripción (`desc`) y una fecha de
completado (`completadoEn`, `null` si está pendiente). Después de cada acción
el listado se guarda automáticamente en `db/data.json`.

## Estructura

```
app.js                    Punto de entrada y lógica del menú principal
helpers/inquirer.js        Preguntas y prompts interactivos (menú, inputs, checklist, confirmación)
helpers/guardarArchivo.js  Lectura/escritura de la base de datos en db/data.json
models/tarea.js            Clase Tarea (id, desc, completadoEn)
models/tareas.js           Clase Tareas: alta, baja, listado y toggle de completadas
```

> Nota: `helpers/mensajes.js` es una versión previa del menú hecha con
> `readline` y ya no se usa en `app.js` (se sustituyó por `inquirer`).
