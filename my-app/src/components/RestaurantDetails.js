import Restaurant from "./Restaurant"
import CardDeck from "react-bootstrap/CardDeck"
import Container from "react-bootstrap/Container"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import Button from "react-bootstrap/Button"

const RestaurantDetails = ({ restaurants }) => {
  return (
    <div>
      <Container>
        <Button>Add New</Button>
        <Button>Delete</Button>
        <Button>Update</Button>
      </Container>
      <CardDeck style={{ display: "contents" }}>
        {restaurants.map((restaurant, index) => (
          <Restaurant key={index} restaurant={restaurant}></Restaurant>
        ))}
      </CardDeck>
    </div>
  )
}

export default RestaurantDetails
