import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import AddProduct from '../AddProduct';

const UpdateLst = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [deletedCamera, setDeletedCamera] = useState(null);
  // Success message from server.
  const deleteCamera = async (id) => {
    try {
      const res = await axios.delete(`/camera/${id}`);
      console.log(res.data);
      setDeletedCamera(id);
    } catch (err) {
      console.error(err.message); // Error message from server.
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result1 = await axios('http://localhost:5000/camera');
      setData1(result1.data);

      const result2 = await axios('http://localhost:5000/recording');
      setData2(result2.data);
    };

    fetchData();
  }, [deletedCamera]);

  // const func = (deleted) => {
  //   console.log(deleted);
  // };

  return (
    <div>
      <h1>Update List</h1>
      <AddProduct />
      <div style={{ marginBottom: '80px' }} />
      <h2>מחיקת פריט מהמערכת</h2>
      {data1.map((item, index) => (
        //<li key={item.id}>{item.name}</li>
        <ListGroup as="ol" key={item._id} style={{ marginTop: '5px' }}>
          <ListGroup.Item
            as="li"
            //className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.id}
              <br />
              {item.available === true ? (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    פנוי
                  </Badge>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteCamera(item.id)}
                  >
                    מחק
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    תפוס
                  </Badge>
                  <div>student id: {item.studentID}</div>
                </div>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      ))}

      {data2.map((item) => (
        //<li key={item.id}>{item.name}</li>
        <ListGroup as="ol" key={item._id} style={{ marginTop: '5px' }}>
          <ListGroup.Item
            as="li"
            //className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.id}
              <br />
              {item.available === true ? (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    פנוי
                  </Badge>
                  <button type="button" className="btn btn-primary">
                    מחק
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    תפוס
                  </Badge>
                  <div>student id: {item.studentID}</div>
                </div>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
};

export default UpdateLst;
