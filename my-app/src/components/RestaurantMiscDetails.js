import Table from "react-bootstrap/Table"

const RestaurantMiscDetails = ({ dataList }) => {
  console.log("KN: dataList are: ", dataList)
  return (
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
  )
}

export default RestaurantMiscDetails
