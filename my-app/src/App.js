import "./App.css"
import ControlPanel from "./components/ControlPanel"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"

function App() {
  //#region all useStates
  const [restaurantNationalities, setRestaurantNationalities] = useState([])
  const [restaurantTypes, setRestaurantTypes] = useState([])
  const [restaurantPriceRanges, setRestaurantPriceRanges] = useState([])
  const [restaurantHistories, setRestaurantHistories] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [showMainPanel, setShowMainPanel] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true)
  //#endregion

  //#region All fetch methods
  const fetchRestaurantNationalities = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantNationalities", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const fetchRestaurantTypes = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantTypes", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const fetchRestaurants = async () => {
    const res = await fetch("http://localhost:5000/api/restaurants", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const fetchRestaurantPriceRanges = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantPriceRanges", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const fetchRestaurantHistories = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantHistories", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  //#endregion

  useEffect(() => {
    const getRestaurantNationalities = async () => {
      const nationalitiesFromServer = await fetchRestaurantNationalities()
      setRestaurantNationalities(nationalitiesFromServer)
    }

    const getRestaurantTypes = async () => {
      const typesFromServer = await fetchRestaurantTypes()
      setRestaurantTypes(typesFromServer)
    }

    const getRestaurantPriceRanges = async () => {
      const priceRangesFromServer = await fetchRestaurantPriceRanges()
      setRestaurantPriceRanges(priceRangesFromServer)
    }

    const getRestaurants = async () => {
      const restaurantsFromServer = await fetchRestaurants()
      setRestaurants(restaurantsFromServer)
    }

    const getRestaurantHistories = async () => {
      const historiesFromServer = await fetchRestaurantHistories()
      setRestaurantHistories(historiesFromServer)
    }

    getRestaurantNationalities()
    getRestaurantTypes()
    getRestaurantPriceRanges()
    getRestaurants()
    getRestaurantHistories()
  }, [])

  // Add restaurant to PostgreSQL database
  const addRestaurant = async (restaurant) => {
    let restaurantData = {
      name: restaurant.name,
      address: restaurant.address,
      type_id: restaurant.type_id,
      nationality_id: restaurant.nationality_id,
      price_range_id: restaurant.price_range_id,
    }
    const res = await fetch("http://localhost:5000/api/restaurants", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    })
    const data = await res.json()
    console.log(data)
    return data
  }

  const addRestaurantHistory = async (id) => {
    let restaurantHistoryData = {
      restaurant_id: id,
    }
    const res = await fetch("http://localhost:5000/api/RestaurantHistories", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(restaurantHistoryData),
    })
    const data = await res.json()
    return data
  }

  // Update restaurant
  const deleteRestaurant = async (restaurantId) => {
    let restaurantIdString = restaurantId.toString()
    const res = await fetch("http://localhost:5000/api/restaurants/" + restaurantIdString, { method: "DELETE" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const start = () => {
    setShowMainPanel(true)
    setShowStartButton(false)
  }

  return (
    <div style={{ marginTop: "4px" }} className="container-fluid">
      {showStartButton && (
        <Button style={{ marginLeft: "45%" }} variant="success" onClick={start}>
          Let's begin!
        </Button>
      )}
      {showMainPanel && (
        <ControlPanel
          restaurants={restaurants}
          restaurantTypes={restaurantTypes}
          restaurantNationalities={restaurantNationalities}
          restaurantPriceRanges={restaurantPriceRanges}
          restaurantHistories={restaurantHistories}
          addRestaurantFunc={addRestaurant}
          deleteRestaurantFunc={deleteRestaurant}
          addRestaurantHistoryFunc={addRestaurantHistory}
        ></ControlPanel>
      )}
    </div>
  )
}

export default App
