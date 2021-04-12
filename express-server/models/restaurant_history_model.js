const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant",
  password: "root",
  port: 5432,
})

const getRestaurantHistories = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.restaurant_history ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results)
      resolve(results.rows)
    })
  })
}

module.exports = {
  getRestaurantHistories,
}
