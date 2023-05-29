const axios = require("axios");
class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];
  constructor() {
    //Todo: consulta a base de datos
  }
  get paramMapbox() {
    return {
      access_token:
        "MY_TOKEN",
      proximity: "ip",
      language: "es",
    };
  }
  async ciudad(lugar = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramMapbox,
      });

      const resp = await intance.get();
      console.log(resp.data);
      return []; //Retornar los lugares que coincidadn
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
