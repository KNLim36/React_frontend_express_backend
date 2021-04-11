import "./App.css"
import ControlPanel from "./components/ControlPanel"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"

function App() {
  //#region Nationalities
  const [restaurantNationalities, setRestaurantNationalities] = useState([])

  // Fetch restaurant nationalities
  const fetchRestaurantNationalities = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantNationalities", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }
  //#endregion

  //#region Type
  const [restaurantTypes, setRestaurantTypes] = useState([])

  // Fetch restaurant types
  const fetchRestaurantTypes = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantTypes", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }
  //#endregion

  //#region Price range
  const [restaurantPriceRanges, setRestaurantPriceRanges] = useState([])

  const fetchRestaurantPriceRanges = async () => {
    const res = await fetch("http://localhost:5000/api/restaurantPriceRanges", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }
  //#endregion

  const fetchRestaurants = async () => {
    const res = await fetch("http://localhost:5000/api/restaurants", { method: "GET" })
    const data = await res.json()
    console.log(data)
    return data
  }

  const [restaurants, setRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [showAddRestaurant, setShowAddRestaurant] = useState(false)
  const [showAddRestaurantType, setShowRestaurantType] = useState(false)
  const [showAddRestaurantNationality, setShowRestaurantNationality] = useState(false)
  const [showMainPanel, setShowMainPanel] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true)

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

    getRestaurantNationalities()
    getRestaurantTypes()
    getRestaurantPriceRanges()
    getRestaurants()
  }, [])

  //#region Restaurant methods
  // Set all restaurant data into the restaurant component
  //const setRestaurants = (restaurants) => {}

  // Randomly chooses a restaurant
  const randomlyChooseRestaurant = (restaurantFilter) => {}

  // Add restaurant to PostgreSQL database
  const addRestaurant = (restaurant) => {}

  // Update restaurant
  const updateRestaurant = () => {}

  // Update restaurant
  const deleteRestaurant = () => {}
  //#endregion

  const start = () => {
    setShowMainPanel(true)
    setShowStartButton(false)
  }

  return (
    <div style={{ marginTop: "4px" }} className="container-fluid">
      {showStartButton && (
        <Button style={{ marginLeft: "50%" }} variant="success" onClick={start}>
          Let's begin!
        </Button>
      )}
      {showMainPanel && (
        <ControlPanel
          restaurants={restaurants}
          restaurantNationalities={restaurantNationalities}
          restaurantTypes={restaurantTypes}
          restaurantPriceRanges={restaurantPriceRanges}
        ></ControlPanel>
      )}
    </div>
  )
}

export default App
