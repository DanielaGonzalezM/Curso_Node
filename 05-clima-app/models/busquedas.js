const axios = require("axios");
class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];
  constructor() {
    //Todo: consulta a base de datos
  }

  async ciudad(lugar = "") {
    try {
      console.log("ciudad", lugar);
      const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/valparaiso.json?proximity=ip&language=es&access_token=MY_TOKEN");
      console.log(resp.data);
      return []; //Retornar los lugares que coincidadn
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
