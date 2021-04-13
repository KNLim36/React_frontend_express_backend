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

const createRestaurantHistories = (body) => {
  return new Promise(function (resolve, reject) {
    const { restaurant_id } = body
    let safe_Restaurant_id = parseInt(restaurant_id)
    pool.query(
      "INSERT INTO public.restaurant_history (restaurant_id) VALUES ($1) RETURNING *",
      [safe_Restaurant_id],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant history has been added  : ${results.rows[0]}`)
      }
    )
  })
}

module.exports = {
  getRestaurantHistories,
  createRestaurantHistories,
}
