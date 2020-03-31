const axios = require("axios");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const response = await connection("flights").select("*");

    return res.json(response);
  },

  async store(req, res) {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.aviationstack.com/v1/flights",
        params: {
          access_key: "74761a2594d89fba48dc137b76ae10df"
        }
      });

      await connection("airports").insert({ ...response.data.data });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
    }
  }
};
