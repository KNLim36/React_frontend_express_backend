import Restaurant from "./Restaurant"
import CardDeck from "react-bootstrap/CardDeck"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup"
import { useState, useEffect } from "react"
import FormLabel from "react-bootstrap/FormLabel"
import FormControl from "react-bootstrap/FormControl"
import { v4 } from "uuid"

const RestaurantDetails = ({
  restaurants,
  restaurantTypes,
  restaurantNationalities,
  restaurantPriceRanges,
  addRestaurantFunc,
  deleteRestaurantFunc,
  addRestaurantHistoryFunc,
  selectedRestaurantObj,
}) => {
  console.log("In Restaurant Details: ", selectedRestaurantObj)
  // Show each modules of restaurant
  const [showAddRestaurant, setShowAddRestaurant] = useState(false)
  const [showDeleteRestaurant, setShowDeleteRestaurant] = useState(false)
  const [showRandomizeRestaurant, setShowRandomizeRestaurant] = useState(false)
  const [showSearchRestaurant, setShowSearchRestaurant] = useState(false)

  // Options used in drop-down list
  const [restaurantOptions, setRestaurantOptions] = useState([])
  const [restaurantTypeOptions, setRestaurantTypeOptions] = useState([])
  const [restaurantNationalityOptions, setRestaurantNationalityOptions] = useState([])
  const [restaurantPriceRangeOptions, setRestaurantPriceRangeOptions] = useState([])

  // Filters used to search or randomize
  const [restaurantTypeFilter, setRestaurantTypeFilter] = useState({ name: "None" })
  const [restaurantNationalityFilter, setRestaurantNationalityFilter] = useState({ name: "None" })
  const [restaurantPriceRangeFilter, setRestaurantPriceRangeFilter] = useState({ name: "None" })

  // Show restaurant list
  const [showAllRestaurant, setShowAllRestaurant] = useState(false)
  const [showRandomizedRestaurant, setShowRandomizedRestaurant] = useState(false)

  // Show 1 selected restaurant, and selectedRestaurantInfo
  const [showGoToRestaurant, setShowGoToRestaurant] = useState(false)

  const toggleOpenComponents = (controlName) => {
    let toggleFlagList = [
      { name: "showAddRestaurant", toggleFlagFunc: setShowAddRestaurant },
      { name: "showDeleteRestaurant", toggleFlagFunc: setShowDeleteRestaurant },
      { name: "showRandomizeRestaurant", toggleFlagFunc: setShowRandomizeRestaurant },
      { name: "showSearchRestaurant", toggleFlagFunc: setShowSearchRestaurant },
      { name: "showAllRestaurant", toggleFlagFunc: setShowAllRestaurant },
      { name: "showRandomizedRestaurant", toggleFlagFunc: setShowRandomizedRestaurant },
      { name: "showGoToRestaurant", toggleFlagFunc: setShowGoToRestaurant },
    ]

    toggleFlagList.forEach((control) => {
      control.name === controlName ? control.toggleFlagFunc(true) : control.toggleFlagFunc(false)
    })
  }

  const renderFullRestaurantDetails = (
    currRestaurants,
    restaurantTypeFilter,
    restaurantNationalityFilter,
    restaurantPriceRangeFilter
  ) => {
    currRestaurants.forEach((restaurant) => {
      restaurantTypes.forEach((type) => {
        if (parseInt(restaurant.type_id) === parseInt(type.id)) {
          restaurant.type = type.description
        }
      })
      restaurantNationalities.forEach((nationality) => {
        if (parseInt(restaurant.nationality_id) === parseInt(nationality.id)) {
          restaurant.nationality = nationality.description
        }
      })
      restaurantPriceRanges.forEach((priceRange) => {
        if (parseInt(restaurant.price_range_id) === parseInt(priceRange.id)) {
          restaurant.priceRange = priceRange.description
        }
      })
    })

    let filteredRestaurants = currRestaurants.filter((restaurant) => {
      // If any of the filter is provided, use those to filter the current displayed
      let checkRestaurantType = restaurantTypeFilter.name === "None" ? false : true
      let restaurantTypeId
      restaurantTypes.forEach((type) => {
        if (type.name === restaurantTypeFilter.name) {
          restaurantTypeId = type.id
        }
      })

      let checkRestaurantNationality = restaurantNationalityFilter.name === "None" ? false : true
      let restaurantNationalityId
      restaurantNationalities.forEach((nationality) => {
        if (nationality.name === restaurantNationalityFilter.name) {
          restaurantNationalityId = nationality.id
        }
      })

      let checkRestaurantPriceRange = restaurantPriceRangeFilter.name === "None" ? false : true
      let restaurantPriceRangeId
      restaurantPriceRanges.forEach((priceRange) => {
        if (priceRange.name === restaurantPriceRangeFilter.name) {
          restaurantPriceRangeId = priceRange.id
        }
      })

      // Only type
      if (checkRestaurantType === true && checkRestaurantNationality === false && checkRestaurantPriceRange === false) {
        if (parseInt(restaurant.type_id) === restaurantTypeId) {
          return true
        }
      }
      // Only Nationality
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === false
      ) {
        if (parseInt(restaurant.nationality_id) === restaurantNationalityId) {
          return true
        }
      }
      // Only Price Range
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === false &&
        checkRestaurantPriceRange === true
      ) {
        if (parseInt(restaurant.price_range_id) === restaurantPriceRangeId) {
          return true
        }
      }
      // Type and Nationality
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === false
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.nationality_id) === restaurantNationalityId
        ) {
          return true
        }
      }
      // Type and Price Range
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === false &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      }
      // Nationality and Price Range
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.nationality_id) === restaurantNationalityId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      }
      // Type, Nationality and Price Range
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.nationality_id) === restaurantNationalityId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      } else {
        return true
      }
    })

    // console.log(filteredRestaurants)
    return filteredRestaurants.map((restaurant, index) => (
      <Restaurant key={restaurant.id} id={restaurant.id} restaurant={restaurant}></Restaurant>
    ))
  }

  const renderRandomizedRestaurantDetails = (
    currRestaurants,
    restaurantTypeFilter,
    restaurantNationalityFilter,
    restaurantPriceRangeFilter
  ) => {
    currRestaurants.forEach((restaurant) => {
      restaurantTypes.forEach((type) => {
        if (parseInt(restaurant.type_id) === parseInt(type.id)) {
          restaurant.type = type.description
        }
      })
      restaurantNationalities.forEach((nationality) => {
        if (parseInt(restaurant.nationality_id) === parseInt(nationality.id)) {
          restaurant.nationality = nationality.description
        }
      })
      restaurantPriceRanges.forEach((priceRange) => {
        if (parseInt(restaurant.price_range_id) === parseInt(priceRange.id)) {
          restaurant.priceRange = priceRange.description
        }
      })
    })

    let filteredRestaurants = currRestaurants.filter((restaurant) => {
      // If any of the filter is provided, use those to filter the current displayed
      let checkRestaurantType = restaurantTypeFilter.name === "None" ? false : true
      let restaurantTypeId
      restaurantTypes.forEach((type) => {
        if (type.name === restaurantTypeFilter.name) {
          restaurantTypeId = type.id
        }
      })

      let checkRestaurantNationality = restaurantNationalityFilter.name === "None" ? false : true
      let restaurantNationalityId
      restaurantNationalities.forEach((nationality) => {
        if (nationality.name === restaurantNationalityFilter.name) {
          restaurantNationalityId = nationality.id
        }
      })

      let checkRestaurantPriceRange = restaurantPriceRangeFilter.name === "None" ? false : true
      let restaurantPriceRangeId
      restaurantPriceRanges.forEach((priceRange) => {
        if (priceRange.name === restaurantPriceRangeFilter.name) {
          restaurantPriceRangeId = priceRange.id
        }
      })

      // Only type
      if (checkRestaurantType === true && checkRestaurantNationality === false && checkRestaurantPriceRange === false) {
        if (parseInt(restaurant.type_id) === restaurantTypeId) {
          return true
        }
      }
      // Only Nationality
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === false
      ) {
        if (parseInt(restaurant.nationality_id) === restaurantNationalityId) {
          return true
        }
      }
      // Only Price Range
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === false &&
        checkRestaurantPriceRange === true
      ) {
        if (parseInt(restaurant.price_range_id) === restaurantPriceRangeId) {
          return true
        }
      }
      // Type and Nationality
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === false
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.nationality_id) === restaurantNationalityId
        ) {
          return true
        }
      }
      // Type and Price Range
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === false &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      }
      // Nationality and Price Range
      else if (
        checkRestaurantType === false &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.nationality_id) === restaurantNationalityId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      }
      // Type, Nationality and Price Range
      else if (
        checkRestaurantType === true &&
        checkRestaurantNationality === true &&
        checkRestaurantPriceRange === true
      ) {
        if (
          parseInt(restaurant.type_id) === restaurantTypeId &&
          parseInt(restaurant.nationality_id) === restaurantNationalityId &&
          parseInt(restaurant.price_range_id) === restaurantPriceRangeId
        ) {
          return true
        }
      } else {
        return true
      }
    })

    let allFilteredRestaurantIds = filteredRestaurants.map((restaurant) => restaurant.id)
    let randomRestaurantId = Math.floor(Math.random() * allFilteredRestaurantIds.length) + 0
    console.log("selectedRestaurantObj in method: ", selectedRestaurantObj)
    if (filteredRestaurants.length === 0) {
      return
    }
    selectedRestaurantObj.id = parseInt(filteredRestaurants[randomRestaurantId].id)

    return (
      <Restaurant
        key={"Random" + filteredRestaurants[randomRestaurantId].id}
        id={"Random" + filteredRestaurants[randomRestaurantId].id}
        restaurant={{
          name: filteredRestaurants[randomRestaurantId].name,
          id: filteredRestaurants[randomRestaurantId].id,
          address: filteredRestaurants[randomRestaurantId].address,
          priceRange: filteredRestaurants[randomRestaurantId].priceRange,
          type: filteredRestaurants[randomRestaurantId].type,
          nationality: filteredRestaurants[randomRestaurantId].nationality,
        }}
        idObj={selectedRestaurantObj}
      ></Restaurant>
    )
  }

  const renderRestaurantOptions = (restaurantOptions) => {
    let fullOptionList = []
    restaurantOptions.forEach((restaurant) => {
      fullOptionList.push(<option key={restaurant.id}>{restaurant.name}</option>)
    })
    return fullOptionList
  }

  const renderRestaurantTypeOptions = (restaurantTypeOptions, defaultOption) => {
    let fullOptionList = []
    if (defaultOption) {
      fullOptionList.push(defaultOption)
    }

    restaurantTypeOptions.forEach((type) => {
      fullOptionList.push(<option key={type.id}>{type.name}</option>)
    })
    return fullOptionList
  }

  const renderRestaurantNationalityOptions = (restaurantNationalityOptions, defaultOption) => {
    let fullOptionList = []
    if (defaultOption) {
      fullOptionList.push(defaultOption)
    }

    restaurantNationalityOptions.forEach((nationality) => {
      fullOptionList.push(<option key={nationality.id}>{nationality.name}</option>)
    })
    return fullOptionList
  }

  const renderRestaurantPriceRangeOptions = (restaurantPriceRangeOptions, defaultOption) => {
    let fullOptionList = []
    if (defaultOption) {
      fullOptionList.push(defaultOption)
    }

    restaurantPriceRangeOptions.forEach((priceRange) => {
      fullOptionList.push(<option key={priceRange.id}>{priceRange.name}</option>)
    })
    return fullOptionList
  }

  const onSubmitAddRestaurant = (event, addRestaurantFunc) => {
    event.preventDefault()
    let typeId
    let nationalityId
    let priceRangeId
    restaurantTypeOptions.forEach((type) => {
      if (type.name === event.target.addRestaurantType.value) {
        typeId = type.id
      }
    })
    restaurantNationalityOptions.forEach((nationality) => {
      if (nationality.name === event.target.addRestaurantNationality.value) {
        nationalityId = nationality.id
      }
    })
    restaurantPriceRangeOptions.forEach((priceRange) => {
      if (priceRange.name === event.target.addRestaurantPriceRange.value) {
        priceRangeId = priceRange.id
      }
    })
    if (
      Number.isNaN(typeId) ||
      Number.isNaN(nationalityId) ||
      Number.isNaN(priceRangeId) ||
      event.target.addRestaurantName.value.length === 0 ||
      event.target.addRestaurantAddress.value.length === 0
    ) {
      console.warn("Unable to add new restaurant! Restaurant information is not filled!")
    } else {
      addRestaurantFunc({
        name: event.target.addRestaurantName.value,
        address: event.target.addRestaurantAddress.value,
        type_id: typeId,
        nationality_id: nationalityId,
        price_range_id: priceRangeId,
      })
    }
  }

  const onSubmitDeleteRestaurant = (event, deleteRestaurantFunc) => {
    event.preventDefault()
    let restaurantName = event.target.deleteRestaurantName.value
    let restaurantId
    restaurantOptions.forEach((restaurantOption) => {
      if (restaurantOption.name === restaurantName) {
        restaurantId = restaurantOption.id
      }
    })
    console.log("Restaurant id to delete is: ", restaurantId)

    deleteRestaurantFunc(parseInt(restaurantId))
  }

  const onSubmitRandomizeRestaurant = (event) => {
    event.preventDefault()
    setRestaurantTypeFilter({ name: event.target.randomRestaurantType.value })
    setRestaurantNationalityFilter({ name: event.target.randomRestaurantNationality.value })
    setRestaurantPriceRangeFilter({ name: event.target.randomRestaurantPriceRange.value })

    setShowRandomizedRestaurant(true)
  }

  const onSubmitSearchRestaurant = (event) => {
    event.preventDefault()
    setRestaurantTypeFilter({ name: event.target.searchRestaurantType.value })
    setRestaurantNationalityFilter({ name: event.target.searchRestaurantNationality.value })
    setRestaurantPriceRangeFilter({ name: event.target.searchRestaurantPriceRange.value })

    setShowAllRestaurant(true)
  }

  const onGoToRestaurantClick = () => {
    if (selectedRestaurantObj.id === 0) {
      console.log("No restaurant selected for option!")
      return
    }
    addRestaurantHistoryFunc(selectedRestaurantObj.id)
  }

  useEffect(() => {
    setRestaurantOptions(restaurants)
    setRestaurantTypeOptions(restaurantTypes)
    setRestaurantNationalityOptions(restaurantNationalities)
    setRestaurantPriceRangeOptions(restaurantPriceRanges)
  }, [])

  return (
    <Container>
      <Container>
        <Button
          variant="primary"
          onClick={() => {
            toggleOpenComponents("showSearchRestaurant")
          }}
        >
          Open search restaurant tab
        </Button>
        <Button
          variant="success"
          onClick={() => {
            toggleOpenComponents("showAddRestaurant")
          }}
        >
          Open add new restaurant tab
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            toggleOpenComponents("showRandomizeRestaurant")
          }}
        >
          Open randomize restaurant tab
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            toggleOpenComponents("showDeleteRestaurant")
          }}
        >
          Open delete restaurant tab
        </Button>
      </Container>

      <Container>
        {showAddRestaurant && (
          <Container style={{ border: "1px solid #cecece" }}>
            <Form
              onSubmit={(e) => {
                onSubmitAddRestaurant(e, addRestaurantFunc)
              }}
            >
              <FormGroup controlId="addRestaurantName">
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl type="text" placeholder="The name of the restaurant"></FormControl>
              </FormGroup>

              <FormGroup controlId="addRestaurantAddress">
                <FormLabel>Restaurant Address</FormLabel>
                <FormControl type="text" placeholder="The address of the restaurant"></FormControl>
              </FormGroup>

              <FormGroup controlId="addRestaurantType">
                <FormLabel>Restaurant Type</FormLabel>
                <FormControl as="select">{renderRestaurantTypeOptions(restaurantTypeOptions)}</FormControl>
              </FormGroup>

              <FormGroup controlId="addRestaurantNationality">
                <FormLabel>Restaurant Nationality</FormLabel>
                <FormControl as="select">
                  {renderRestaurantNationalityOptions(restaurantNationalityOptions)}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="addRestaurantPriceRange">
                <FormLabel>Restaurant Price Range</FormLabel>
                <FormControl as="select">{renderRestaurantPriceRangeOptions(restaurantPriceRangeOptions)}</FormControl>
              </FormGroup>

              <Button size="lg" as="input" type="submit" variant="success" value="Submit" />
            </Form>
          </Container>
        )}

        {showDeleteRestaurant && (
          <Container style={{ border: "1px solid #cecece" }}>
            <Form
              onSubmit={(e) => {
                onSubmitDeleteRestaurant(e, deleteRestaurantFunc)
              }}
            >
              <FormGroup controlId="deleteRestaurantName">
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl as="select">{renderRestaurantOptions(restaurantOptions)}</FormControl>
              </FormGroup>

              <Button size="lg" as="input" type="submit" variant="danger" value="Delete" />
            </Form>
          </Container>
        )}

        {showRandomizeRestaurant && (
          <Container style={{ border: "1px solid #cecece" }}>
            <Form
              onSubmit={(e) => {
                onSubmitRandomizeRestaurant(e)
                setShowGoToRestaurant(true)
              }}
            >
              <FormGroup controlId="randomRestaurantType">
                <FormLabel>Restaurant Type</FormLabel>
                <FormControl as="select" defaultValue="None">
                  {renderRestaurantTypeOptions(restaurantTypeOptions, <option key="0">None</option>)}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="randomRestaurantNationality">
                <FormLabel>Restaurant Nationality</FormLabel>
                <FormControl as="select" defaultValue="None">
                  {renderRestaurantNationalityOptions(restaurantNationalityOptions, <option key="0">None</option>)}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="randomRestaurantPriceRange">
                <FormLabel>Restaurant Price Range</FormLabel>
                <FormControl as="select" defaultValue="None">
                  {renderRestaurantPriceRangeOptions(restaurantPriceRangeOptions, <option key="0">None</option>)}
                </FormControl>
              </FormGroup>

              <Button size="lg" as="input" type="submit" variant="info" name="Randomize" value="Randomize" />
              {showGoToRestaurant && (
                <Button size="lg" variant="warning" onClick={onGoToRestaurantClick}>
                  Let's go to this restaurant!
                </Button>
              )}
            </Form>
          </Container>
        )}

        {showSearchRestaurant && (
          <Container>
            <Container style={{ border: "1px solid #cecece" }}>
              <Form
                onSubmit={(e) => {
                  onSubmitSearchRestaurant(e)
                }}
              >
                <FormGroup controlId="searchRestaurantType">
                  <FormLabel>Restaurant Type</FormLabel>
                  <FormControl as="select">
                    {renderRestaurantTypeOptions(restaurantTypeOptions, <option key="0">None</option>)}
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="searchRestaurantNationality">
                  <FormLabel>Restaurant Nationality</FormLabel>
                  <FormControl as="select">
                    {renderRestaurantNationalityOptions(restaurantNationalityOptions, <option key="0">None</option>)}
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="searchRestaurantPriceRange">
                  <FormLabel>Restaurant Price Range</FormLabel>
                  <FormControl as="select">
                    {renderRestaurantPriceRangeOptions(restaurantPriceRangeOptions, <option key="0">None</option>)}
                  </FormControl>
                </FormGroup>

                <Button size="lg" as="input" type="submit" variant="primary" value="Search" />
              </Form>
            </Container>
          </Container>
        )}

        {showAllRestaurant && (
          <Container style={{ border: "1px solid #cecece" }}>
            <CardDeck style={{ display: "contents" }}>
              {renderFullRestaurantDetails(
                restaurants,
                restaurantTypeFilter,
                restaurantNationalityFilter,
                restaurantPriceRangeFilter
              )}
            </CardDeck>
          </Container>
        )}

        {showRandomizedRestaurant && (
          <Container style={{ border: "1px solid #cecece" }}>
            <CardDeck style={{ display: "contents" }}>
              {renderRandomizedRestaurantDetails(
                restaurants,
                restaurantTypeFilter,
                restaurantNationalityFilter,
                restaurantPriceRangeFilter
              )}
            </CardDeck>
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default RestaurantDetails
