const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant",
  password: "root",
  port: 5432,
})

const getRestaurants = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.restaurant ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const getSingleRestaurant = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`"SELECT * FROM public.restaurant WHERE id = ${id}"`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createRestaurant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, description } = body
    pool.query(
      "INSERT INTO public.restaurant (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant has been added added: ${results.rows[0]}`)
      }
    )
  })
}

const deleteRestaurant = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM public.restaurant WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Restaurant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRestaurants,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
}
