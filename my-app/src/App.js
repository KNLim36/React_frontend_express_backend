import "./App.css"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/Button"
import { Table } from "../components/Table"
import { useState, useEffect } from "react"

function App() {
  const [restaurants, setRestaurants] = useState([
    {
      /* Has all restaurant info:
    */
    },
  ])
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [showAddRestaurant, setShowAddRestaurant] = useState(false)
  const [showAddRestaurantType, setShowRestaurantType] = useState(false)
  const [showAddRestaurantNationality, setShowRestaurantNationality] = useState(
    false
  )

  useEffect(() => {
    const fetchRestaurants
  })

  //#region Restaurant methods
  // Set all restaurant data into the restaurant component
  const setRestaurants = (restaurants) => {}

  // Randomly chooses a restaurant
  const randomlyChooseRestaurant = (restaurantFilter) => {}

  // Add restaurant to PostgreSQL database
  const addRestaurant = (restaurant) => {}

  // Update restaurant
  const updateRestaurant = () => {}

  // Update restaurant
  const deleteRestaurant = () => {}
  //#endregion

  //#region Server and database methods
   // Fetch Tasks
   const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  const connectToDatabase = () => {}
  const retrieveFromDatabase = () => {}
  const updateFromDatabase = () => {}
  const deleteFromDatabase = () => {}
  //#endregion
  
  return (
    <div className="App">
      <Header className="Operation Header"></Header>
      <Footer className="Information Holder"></Footer>
    </div>
  )
}

export default App
