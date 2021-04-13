import Table from "react-bootstrap/Table"

const RestaurantMisc = (restaurant) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{restaurant.id}</td>
          <td>{restaurant.name}</td>
          <td>{restaurant.description}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default RestaurantMisc
