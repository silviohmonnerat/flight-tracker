const { Router } = require("express");

const FlightController = require("../controllers/FlightController");
const AirportController = require("../controllers/AirportController");

const router = Router();

router.get("/flights", FlightController.index);
router.post("/", FlightController.store);

router.get("/airports", AirportController.index);
router.post("/", AirportController.store);

router.use((req, res, next) => {
  return res.redirect("/");
});

router.use((err, req, res, next) => {
  console.error(err);
  switch (err.code) {
    default:
      return res.status(404).send({ error: "Route not found!" });
  }
});

module.exports = router;
