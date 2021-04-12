import Restaurant from "./Restaurant"
import CardDeck from "react-bootstrap/CardDeck"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup"
import { useState, useEffect } from "react"
import FormLabel from "react-bootstrap/FormLabel"
import FormControl from "react-bootstrap/FormControl"

const renderFullRestaurantDetails = (
  restaurants,
  restaurantTypes,
  restaurantNationalities,
  restaurantPriceRanges,
  restaurantTypeFilter,
  restaurantNationalityFilter,
  restaurantPriceRangeFilter
) => {
  restaurants.forEach((restaurant) => {
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

  return restaurants.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}></Restaurant>)
}

const RestaurantDetails = ({
  restaurants,
  restaurantTypes,
  restaurantNationalities,
  restaurantPriceRanges,
  addRestaurantFunc,
  deleteRestaurantFunc,
}) => {
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
  const [restaurantTypeFilter, setRestaurantTypeFilter] = useState({})
  const [restaurantNationalityFilter, setRestaurantNationalityFilter] = useState({})
  const [restaurantPriceRangeFilter, setRestaurantPriceRangeFilter] = useState({})

  // Show restaurant list
  const [showRestaurant, setShowRestaurant] = useState(false)

  const toggleOpenComponents = (controlName) => {
    let toggleFlagList = [
      { name: "showAddRestaurant", toggleFlagFunc: setShowAddRestaurant },
      { name: "showDeleteRestaurant", toggleFlagFunc: setShowDeleteRestaurant },
      { name: "showRandomizeRestaurant", toggleFlagFunc: setShowRandomizeRestaurant },
      { name: "showSearchRestaurant", toggleFlagFunc: setShowSearchRestaurant },
      { name: "showRestaurant", toggleFlagFunc: setShowRestaurant },
    ]

    toggleFlagList.forEach((control) => {
      control.name === controlName ? control.toggleFlagFunc(true) : control.toggleFlagFunc(false)
    })
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
    if (event.target.searchRestaurantType.value !== "None") {
      setRestaurantTypeFilter({ name: event.target.searchRestaurantType.value })
    }
    if (event.target.searchRestaurantNationality.value !== "None") {
      setRestaurantNationalityFilter({ name: event.target.searchRestaurantNationality.value })
    }
    if (event.target.searchRestaurantPriceRange.value !== "None") {
      setRestaurantPriceRangeFilter({ name: event.target.searchRestaurantPriceRange.value })
    }
    event.preventDefault()
    setShowRestaurant(true)
  }

  const onSubmitSearchRestaurant = (event) => {
    setRestaurantTypeFilter({ name: event.target.searchRestaurantType.value })
    setRestaurantNationalityFilter({ name: event.target.searchRestaurantNationality.value })
    setRestaurantPriceRangeFilter({ name: event.target.searchRestaurantPriceRange.value })
    event.preventDefault()
    setShowRestaurant(true)
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

              {/* <CardDeck style={{ display: "contents" }}>{()}</CardDeck> */}
              <Button size="lg" as="input" type="submit" variant="info" name="Randomize" value="Randomize" />
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
                  <FormControl as="select">{renderRestaurantTypeOptions(restaurantTypeOptions)}</FormControl>
                </FormGroup>

                <FormGroup controlId="searchRestaurantNationality">
                  <FormLabel>Restaurant Nationality</FormLabel>
                  <FormControl as="select">
                    {renderRestaurantNationalityOptions(restaurantNationalityOptions)}
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="searchRestaurantPriceRange">
                  <FormLabel>Restaurant Price Range</FormLabel>
                  <FormControl as="select">
                    {renderRestaurantPriceRangeOptions(restaurantPriceRangeOptions)}
                  </FormControl>
                </FormGroup>

                <Button size="lg" as="input" type="submit" variant="primary" value="Search" />
              </Form>
            </Container>

            {showRestaurant && (
              <Container style={{ border: "1px solid #cecece" }}>
                <CardDeck style={{ display: "contents" }}>
                  {renderFullRestaurantDetails(
                    restaurants,
                    restaurantTypes,
                    restaurantNationalities,
                    restaurantPriceRanges,
                    restaurantTypeFilter,
                    restaurantNationalityFilter,
                    restaurantPriceRangeFilter
                  )}
                </CardDeck>
              </Container>
            )}
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default RestaurantDetails
