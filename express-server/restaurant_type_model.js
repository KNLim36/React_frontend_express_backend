const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant",
  password: "root",
  port: 5432,
})

const getRestaurantTypes = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.restaurant_type ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const getSingleRestaurantType = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`"SELECT * FROM public.restaurant_type WHERE id = ${id}"`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createRestaurantType = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, description } = body
    pool.query(
      "INSERT INTO public.restaurant_type (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant type has been added added: ${results.rows[0]}`)
      }
    )
  })
}
const deleteRestaurantType = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM public.restaurant_type WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Restaurant type deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRestaurantTypes,
  createRestaurantType,
  deleteRestaurantType,
}
