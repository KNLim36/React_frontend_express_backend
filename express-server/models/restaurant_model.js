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
    const { name, address, type_id, nationality_id, image_id, price_range_id } = body
    let typeId = parseInt(type_id)
    let nationalityId = parseInt(nationality_id)
    let priceRangeId = parseInt(price_range_id)
    pool.query(
      "INSERT INTO public.restaurant (name, address, type_id, nationality_id, image_id, price_range_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, address, typeId, nationalityId, null, priceRangeId],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new restaurant has been added  : ${results.rows[0]}`)
      }
    )
  })
}

const deleteRestaurant = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("DELETE FROM public.restaurant WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Restaurant deleted with Id: ${id}`)
    })
  })
}

module.exports = {
  getRestaurants,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
}
