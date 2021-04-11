const express = require("express")
const expressApp = express()
const port = process.env.Port | 5000

expressApp.get("/", (req, res) => {
  // Fetch from database
  // Load pages
  // Return Json
  // Full access to request & response
  res.status(200).send("Hello World!")
})

expressApp.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})
