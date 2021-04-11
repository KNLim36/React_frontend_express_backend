import Button from "react-bootstrap/Button"
import { useState } from "react"
import RestaurantDetails from "./RestaurantDetails"
import RestaurantMiscDetails from "./RestaurantMiscDetails"

const ControlPanel = ({ restaurants, restaurantNationalities, restaurantTypes, restaurantPriceRanges }) => {
  const [showRestaurantControls, setShowRestaurantControls] = useState(false)
  const [showRestaurantTypeControls, setShowRestaurantTypeControls] = useState(false)
  const [showRestaurantNationalityControls, setShowRestaurantNationalityControls] = useState(false)
  const [showRestaurantPriceRangeControls, setShowRestaurantPriceRangeControls] = useState(false)

  const toggleOpenComponents = (controlName) => {
    let toggleFlagList = [
      { name: "showRestaurantControls", toggleFlagFunc: setShowRestaurantControls },
      { name: "showRestaurantTypeControls", toggleFlagFunc: setShowRestaurantTypeControls },
      { name: "showRestaurantNationalityControls", toggleFlagFunc: setShowRestaurantNationalityControls },
      { name: "showRestaurantPriceRangeControls", toggleFlagFunc: setShowRestaurantPriceRangeControls },
    ]

    toggleFlagList.forEach((control) => {
      control.name === controlName ? control.toggleFlagFunc(true) : control.toggleFlagFunc(false)
    })
  }

  return (
    <div>
      <div className="container-fluid">
        <Button
          variant="primary"
          onClick={() => {
            toggleOpenComponents("showRestaurantControls")
          }}
        >
          Restaurant
        </Button>
        <Button
          variant="success"
          onClick={() => {
            toggleOpenComponents("showRestaurantTypeControls")
          }}
        >
          type
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            toggleOpenComponents("showRestaurantNationalityControls")
          }}
        >
          nationality
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            toggleOpenComponents("showRestaurantPriceRangeControls")
          }}
        >
          price range
        </Button>
      </div>
      <div className="container-fluid" style={{ marginTop: "15px" }}>
        {showRestaurantControls && <RestaurantDetails restaurants={restaurants}>Restaurant</RestaurantDetails>}
        {showRestaurantTypeControls && (
          <RestaurantMiscDetails dataList={restaurantTypes}>Restaurant type</RestaurantMiscDetails>
        )}
        {showRestaurantNationalityControls && (
          <RestaurantMiscDetails dataList={restaurantNationalities}>Restaurant nationality</RestaurantMiscDetails>
        )}
        {showRestaurantPriceRangeControls && (
          <RestaurantMiscDetails dataList={restaurantPriceRanges}>Restaurant price range</RestaurantMiscDetails>
        )}
      </div>
    </div>
  )
}

export default ControlPanel
