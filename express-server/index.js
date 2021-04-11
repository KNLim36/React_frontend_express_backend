const express = require("express")
const fileUpload = require("express-fileupload")
const expressApp = express()
const port = process.env.Port | 5000

const path = require("path")

expressApp.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of middleware
  next()
})

expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))

expressApp.use("/api/restaurants", require("./routes/api/restaurants"))
expressApp.use("/api/restaurantTypes", require("./routes/api/restaurantNationalities"))
expressApp.use("/api/restaurantNationalities", require("./routes/api/restaurantTypes"))
expressApp.use("/api/restaurantPriceRanges", require("./routes/api/restaurantPriceRanges"))

expressApp.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})
