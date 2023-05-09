class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];
  constructor() {
    //Todo: consulta a base de datos
  }

  async ciudad(lugar = "") {
    console.log(lugar);
    return []; //Retornar los lugares que coincidadn
  }
}

module.exports = Busquedas;
