import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"

const Restaurant = ({ restaurant }) => {
  let currRestaurant = {}
  console.log("KN: restaurant is: ", { restaurant })
  return (
    <Card>
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        {/* <Card.Text>{restaurant.address}</Card.Text> */}
        <ListGroup>
          <ListGroupItem>{restaurant.address}</ListGroupItem>
          {/* <ListGroupItem>{restaurant.price_range_id}</ListGroupItem>
          <ListGroupItem>{restaurant.type_id}</ListGroupItem>
          <ListGroupItem>{restaurant.nationality_id}</ListGroupItem> */}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Restaurant
