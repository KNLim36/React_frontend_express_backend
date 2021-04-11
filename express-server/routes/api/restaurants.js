const express = require("express")
const router = express.Router()
const restaurant_model = require("../../models/restaurant_model")
const fileUpload = require("express-fileupload")

// Create new restaurant
router.post("/", (req, res) => {
  const newRestaurant = {
    name: req.body.name,
    address: req.body.address,
    nationality_id: req.body.nationality_id,
    image_id: req.body.image_id,
    price_range_id: req.body.price_range_id,
  }
  restaurant_model
    .createRestaurant(newRestaurant)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// Get all restaurants
router.get("/", (req, res) => {
  restaurant_model
    .getRestaurants()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// Get 1 restaurant based on id
router.get("/:id", (req, res) => {
  restaurant_model
    .getRestaurants(parseInt(req.params.id))
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// Update restaurant
router.put("/:id", (req, res) => {})

// Delete restaurant
router.delete("/:id", (req, res) => {})

// Upload restaurant logo image
router.post("/upload", (req, res) => {
  console.log(req.files.logo)
  // If <input type="file" id="myFile" name="filename"> then is req.files.filename.name
  // req.files.foo.name: "car.jpg"
  // req.files.foo.data: A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true.
})

// Get all restaurant images
router.get("/image", (req, res) => {})

// Get 1 single restaurant image
router.get("/:id/image", (req, res) => {})

module.exports = router
