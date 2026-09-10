# 05 - Clima App

Aplicación de consola interactiva que busca una ciudad (geocodificación con
Mapbox) y consulta su clima actual (OpenWeatherMap), guardando un historial
de búsquedas en un archivo JSON.

## Conceptos usados

- Menús y prompts interactivos con [`inquirer`](https://www.npmjs.com/package/inquirer)
  (`helpers/inquirer.js`).
- Peticiones HTTP a APIs externas con [`axios`](https://www.npmjs.com/package/axios)
  (`models/busquedas.js`): geocodificación con la API de Mapbox y clima con
  la API de OpenWeatherMap.
- Variables de entorno con [`dotenv`](https://www.npmjs.com/package/dotenv)
  para las API keys.
- Persistencia simple del historial de búsquedas en `db/database.json`
  (módulo nativo `fs`).
- Salida coloreada en consola con [`colors`](https://www.npmjs.com/package/colors).
- Getters de clase para transformar datos (`historialCapitalizado`,
  parámetros de las peticiones).

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto (puedes basarte en
`example.env`) con las siguientes variables:

| Variable          | Descripción                                             |
| ------------------ | -------------------------------------------------------- |
| `MAPBOX_KEY`       | Access token de [Mapbox](https://www.mapbox.com/) usado para geocodificar la ciudad |
| `OPENWEATHER_KEY`  | API key de [OpenWeatherMap](https://openweathermap.org/) usada para consultar el clima |

## Uso

```bash
npm start
```

Muestra un menú con las siguientes opciones:

```
1. Buscar ciudad
2. Historial
0. Salir
```

Al buscar una ciudad, la app pide el nombre, lista las coincidencias
devueltas por Mapbox, permite seleccionar una y muestra su temperatura
actual, mínima, máxima y descripción del clima. La ciudad seleccionada se
guarda en el historial (`db/database.json`, máximo 5 entradas, sin
duplicados).

## Estructura

```
index.js                Punto de entrada y lógica del menú principal
helpers/inquirer.js      Preguntas y prompts interactivos
models/busquedas.js      Clase Busquedas: geocodificación, clima e historial
```
