import { useState } from "react"
import Button from "react-bootstrap/Button"
import RestaurantDetails from "./RestaurantDetails"
import RestaurantHistoryDetails from "./RestaurantHistoryDetails"
import RestaurantMiscDetails from "./RestaurantMiscDetails"

const ControlPanel = ({
  restaurants,
  restaurantTypes,
  restaurantNationalities,
  restaurantPriceRanges,
  restaurantHistories,
  addRestaurantFunc,
  deleteRestaurantFunc,
}) => {
  const [showRestaurantControls, setShowRestaurantControls] = useState(false)
  const [showRestaurantTypeControls, setShowRestaurantTypeControls] = useState(false)
  const [showRestaurantNationalityControls, setShowRestaurantNationalityControls] = useState(false)
  const [showRestaurantPriceRangeControls, setShowRestaurantPriceRangeControls] = useState(false)
  const [showRestaurantHistoryControls, setShowRestaurantHistoryControls] = useState(false)

  const toggleOpenComponents = (controlName) => {
    let toggleFlagList = [
      { name: "showRestaurantControls", toggleFlagFunc: setShowRestaurantControls },
      { name: "showRestaurantTypeControls", toggleFlagFunc: setShowRestaurantTypeControls },
      { name: "showRestaurantNationalityControls", toggleFlagFunc: setShowRestaurantNationalityControls },
      { name: "showRestaurantPriceRangeControls", toggleFlagFunc: setShowRestaurantPriceRangeControls },
      { name: "showRestaurantHistoryControls", toggleFlagFunc: setShowRestaurantHistoryControls },
    ]

    toggleFlagList.forEach((control) => {
      control.name === controlName ? control.toggleFlagFunc(true) : control.toggleFlagFunc(false)
    })
  }

  return (
    <div>
      <div className="container-fluid" style={{ border: "1px solid #cecece" }}>
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
        <Button
          variant="secondary"
          onClick={() => {
            toggleOpenComponents("showRestaurantHistoryControls")
          }}
        >
          history
        </Button>
      </div>
      <div className="container-fluid" style={{ marginTop: "15px", border: "1px solid #cecece" }}>
        {showRestaurantControls && (
          <RestaurantDetails
            restaurants={restaurants}
            restaurantTypes={restaurantTypes}
            restaurantNationalities={restaurantNationalities}
            restaurantPriceRanges={restaurantPriceRanges}
            addRestaurantFunc={addRestaurantFunc}
            deleteRestaurantFunc={deleteRestaurantFunc}
          >
            Restaurant
          </RestaurantDetails>
        )}
        {showRestaurantTypeControls && (
          <RestaurantMiscDetails dataList={restaurantTypes}>Restaurant type</RestaurantMiscDetails>
        )}
        {showRestaurantNationalityControls && (
          <RestaurantMiscDetails dataList={restaurantNationalities}>Restaurant nationality</RestaurantMiscDetails>
        )}
        {showRestaurantPriceRangeControls && (
          <RestaurantMiscDetails dataList={restaurantPriceRanges}>Restaurant price range</RestaurantMiscDetails>
        )}
        {showRestaurantHistoryControls && (
          <RestaurantHistoryDetails dataList={restaurantHistories} restaurants={restaurants}>
            Restaurant history
          </RestaurantHistoryDetails>
        )}
      </div>
    </div>
  )
}

export default ControlPanel
