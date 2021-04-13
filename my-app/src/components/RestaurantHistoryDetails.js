import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const RestaurantHistoryDetails = ({ dataList, restaurants }) => {
  const renderRetaurantName = (id) => {
    let actualName
    restaurants.forEach((restaurant) => {
      if (parseInt(restaurant.id) === parseInt(id)) {
        actualName = restaurant.name
      }
    })
    return <td>{actualName}</td>
  }
  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sequence</th>
              <th>Restaurant Id</th>
              <th>Restaurant Name</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.restaurant_id}</td>
                {renderRetaurantName(data.restaurant_id)}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default RestaurantHistoryDetails
