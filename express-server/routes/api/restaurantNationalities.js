const express = require("express")
const router = express.Router()
const restaurant_nationality_model = require("../../models/restaurant_nationality_model")

router.get("/", (req, res) => {
  restaurant_nationality_model
    .getRestaurantNationalities()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router
