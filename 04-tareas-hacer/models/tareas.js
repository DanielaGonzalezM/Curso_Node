const Tarea = require("./tarea");

class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log("");
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${1 + i}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }
  listarPendientesCompletadas(completadas = true) {
    let contador = 0;

    this.listadoArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      let estado = "";
      if (completadas && completadoEn) {
        contador += 1;
        estado = completadoEn.toString().green;
      }
      if (!completadas && !completadoEn) {
        contador += 1;
        estado = "Pendiente".red;
      }
      if (estado)
        console.log(`${contador.toString().green}${".".green} ${desc} :: ${estado}`);
    });
  }
}

module.exports = Tareas;
