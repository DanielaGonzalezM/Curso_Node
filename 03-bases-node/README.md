# 03 - Bases de Node

Primer programa en Node.js: una aplicación de línea de comandos (CLI) que genera
la tabla de multiplicar de un número, la muestra por consola (opcionalmente) y
la guarda en un archivo `.txt` dentro de la carpeta `salida/`.

## Conceptos usados

- Lectura de argumentos de consola con [`yargs`](https://www.npmjs.com/package/yargs)
  (`config/yargs.js`), incluyendo alias, valores por defecto, opciones requeridas
  (`demandOption`) y validación personalizada con `.check()`.
- Escritura de archivos con el módulo nativo `fs` (`helpers/multiplicar.js`).
- Funciones asíncronas (`async/await`) y manejo de promesas.
- Salida coloreada en consola con [`colors`](https://www.npmjs.com/package/colors).

## Instalación

```
npm install
```

## Uso

```
node app.js --base=<numero> --hasta=<numero> --listar
```

### Options

```
-b, --base    Base para multiplicar (requerido)
-h, --hasta   Hasta que número se multiplicará (por defecto: 10)
-l, --listar  Muestra el resultado por consola (por defecto: false)
```

### Ejemplo

```
node app.js -b=5 -h=10 -l=true
```

Esto genera el archivo `./salida/tabla-5.txt` con la tabla del 5 e imprime el
resultado en consola.
