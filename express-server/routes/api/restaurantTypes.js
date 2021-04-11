const express = require("express")
const router = express.Router()
const restaurant_type_model = require("../../restaurant_type_model")

router.get("/", (req, res) => {
  restaurant_type_model
    .getRestaurantTypes()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router
