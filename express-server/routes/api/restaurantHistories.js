const express = require("express")
const router = express.Router()
const restaurant_history_model = require("../../models/restaurant_history_model")

router.get("/", (req, res) => {
  restaurant_history_model
    .getRestaurantHistories()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router
