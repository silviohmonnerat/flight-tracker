const axios = require("axios");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const response = await connection("airports").select("*");

    return res.json(response);
  },

  async store(req, res) {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.aviationstack.com/v1/airports",
        params: {
          access_key: "74761a2594d89fba48dc137b76ae10df"
        }
      });

      const {
        airport_name,
        iata_code,
        icao_code,
        latitude,
        longitude,
        timezone,
        gmt,
        phone_number,
        country_name,
        country_iso2,
        city_iata_code
      } = response.data.data;

      await connection("airports").insert({
        airport_name,
        iata_code,
        icao_code,
        latitude,
        longitude,
        timezone,
        gmt,
        phone_number,
        country_name,
        country_iso2,
        city_iata_code
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
    }
  }
};
