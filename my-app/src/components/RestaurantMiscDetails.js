import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const RestaurantMiscDetails = ({ dataList }) => {
  return (
    <div>
      <Container>
        <Button variant="success">Add New</Button>
        <Button variant="danger">Delete</Button>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default RestaurantMiscDetails
