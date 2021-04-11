const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant",
  password: "root",
  port: 5432,
})

const getRestaurantPriceRanges = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.restaurant_price_range ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const getSingleRestaurantPriceRange = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`"SELECT * FROM public.restaurant_price_range WHERE id = ${id}"`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createRestaurantPriceRange = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, description } = body
    pool.query(
      "INSERT INTO public.restaurant_price_range (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant price range has been added added: ${results.rows[0]}`)
      }
    )
  })
}
const deleteRestaurantPriceRange = (id) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM public.restaurant_price_range WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Restaurant price range deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRestaurantPriceRanges,
  getSingleRestaurantPriceRange,
  createRestaurantPriceRange,
  deleteRestaurantPriceRange,
}
