const express = require("express")
const router = express.Router()
const restaurant_price_range_model = require("../../models/restaurant_price_range_model")

router.get("/", (req, res) => {
  restaurant_price_range_model
    .getRestaurantPriceRanges()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router
