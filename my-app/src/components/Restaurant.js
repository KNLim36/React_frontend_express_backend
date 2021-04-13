import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"

const Restaurant = ({ restaurant, idObj }) => {
  // console.log("Inside restaurant value: ", restaurant)
  idObj.id = restaurant.id

  return (
    <Card>
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <ListGroup>
          <ListGroupItem>{restaurant.address}</ListGroupItem>
          <ListGroupItem>{restaurant.priceRange}</ListGroupItem>
          <ListGroupItem>{restaurant.type}</ListGroupItem>
          <ListGroupItem>{restaurant.nationality}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Restaurant
