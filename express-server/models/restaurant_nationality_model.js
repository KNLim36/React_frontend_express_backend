const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant",
  password: "root",
  port: 5432,
})

const getRestaurantNationalities = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.restaurant_nationality ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results)
      resolve(results.rows)
    })
  })
}

const getSingleRestaurantNationality = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`"SELECT * FROM public.restaurant_nationality WHERE id = ${id}"`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createRestaurantNationality = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, description } = body
    pool.query(
      "INSERT INTO public.restaurant_nationality (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant nationality has been added added: ${results.rows[0]}`)
      }
    )
  })
}
const deleteRestaurantNationality = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM public.restaurant_nationality WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Restaurant nationality deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRestaurantNationalities,
  createRestaurantNationality,
  deleteRestaurantNationality,
}
