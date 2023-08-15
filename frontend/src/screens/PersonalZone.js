import React, { useEffect, useContext, useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
} from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { useHttpClient } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Table, Row, Col } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const PersonalZone = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const [name, setName] = useState(auth.userName);
  const [password, setPassword] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState('home');
  const [loadedBorrows, setLoadedBorrows] = useState();
  const [returnDates, setReturnDates] = useState({});

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/borrow');
        setLoadedBorrows(responseData.borrows);
      } catch (err) {}
    };
    fetchBorrows();
  }, [sendRequest]);

  const [sortState, setSortState] = useState('none');
  const sortMethods = {
    none: { method: (a, b) => null },
    CreatedAt: { method: (a, b) => (a.createdAt < b.createdAt ? -1 : 1) },
    BorrowDate: { method: (a, b) => (a.borrowDate < b.borrowDate ? -1 : 1) },
    ReturnDate: { method: (a, b) => (a.returnDate < b.returnDate ? -1 : 1) },
    EquipmentID: { method: (a, b) => (a.equipmentID < b.equipmentID ? -1 : 1) },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, auth.userId, password);
    try {
      await sendRequest(
        'http://localhost:5000/api/users/personalZone/',
        'PUT',
        JSON.stringify({
          name: name,
          _id: auth.userId,
          password: password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const updateReturnDate = async (borrow) => {
    const formattedReturnDate = getFormattedDate(returnDates[borrow._id]);

    try {
      await sendRequest(
        'http://localhost:5000/borrow/updateReturnBorrow',
        'PUT',
        JSON.stringify({
          returnDate: formattedReturnDate,
          _id: borrow._id,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      console.log(err);
    }
    alert('שינוי תאריך השאלה בוצע בהצלחה');
  };

  const getFormattedDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  };

  const reportABug = async (borrow) => {
    try {
      await sendRequest(
        'http://localhost:5000/api/users/reportABug',
        'POST',
        JSON.stringify({
          email: auth.email,
          equipmentID: borrow.equipmentID,
          name: borrow.name,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      throw err;
    }
    alert('ההודעה הועברה למנהל המחסן');
  };

  const renderSelectedNavItemContent = () => {
    console.log(auth.role);

    switch (selectedNavItem) {
      case 'current':
        return (
          <>
            <Col>
              <ListGroup variant="flush">
                <ListGroupItem
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <select
                    style={{
                      direction: 'rtl',
                      padding: '0.5rem',
                      border: '1px solid #678773',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      color: '#333',
                      fontSize: '1rem',
                      minwidth: '100px',
                    }}
                    onChange={(e) => setSortState(e.target.value)}
                  >
                    <option value="CreatedAt">מיין לפי</option>
                    <option value="BorrowDate">תאריך השאלה</option>
                    <option value="ReturnDate">תאריך החזרה</option>
                    <option value="EquipmentID">מספר מק"ט</option>
                  </select>
                </ListGroupItem>
              </ListGroup>
            </Col>

            {isLoading ? (
              <Loader />
            ) : (
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm table-custom"
              >
                <thead>
                  <tr>
                    <th>מייל</th>
                    <th>מק"ט</th>
                    <th>תאריך השאלה</th>
                    <th>תאריך להחזרה</th>
                    {auth.role !== 'student' && <th>שינוי תאריך החזרה</th>}
                    {auth.role !== 'student' && <th>שינוי תאריך החזרה</th>}
                    <th>דיווח על תקלה</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedBorrows
                    ?.sort(sortMethods[sortState].method)
                    ?.filter((borrow) => !borrow.isAvailable)
                    ?.filter((borrow) => borrow.userID === auth.userId)
                    ?.map((borrow) => (
                      <tr key={borrow._id}>
                        <td>
                          <a href={`mailto:${borrow.email}`}>{borrow.email}</a>
                        </td>
                        <td>{borrow.equipmentID}</td>
                        <td>{borrow.borrowDate}</td>
                        <td>{borrow.returnDate}</td>
                        {auth.role !== 'student' && (
                          <td>
                            <DatePicker
                              selected={returnDates[borrow._id]}
                              onChange={(date) =>
                                setReturnDates((prevState) => ({
                                  ...prevState,
                                  [borrow._id]: date,
                                }))
                              }
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                            />
                          </td>
                        )}
                        {auth.role !== 'student' && (
                          <td>
                            <Button
                              variant="primary"
                              className="btn-sm confirm-return-button"
                              onClick={() => updateReturnDate(borrow)}
                              disabled={!returnDates[borrow._id]} // Disable button if return date is not selected
                            >
                              שנה תאריך החזרה
                            </Button>
                          </td>
                        )}
                        <td>
                          <Button
                            variant="primary"
                            className="btn-sm confirm-return-button"
                            onClick={() => reportABug(borrow)}
                          >
                            דווח על בעיה במוצר
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </>
        );
      case 'history':
        return (
          <>
            <Col>
              <ListGroup variant="flush">
                <ListGroupItem
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <select
                    style={{
                      direction: 'rtl',
                      padding: '0.5rem',
                      border: '1px solid #678773',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      color: '#333',
                      fontSize: '1rem',
                      minwidth: '100px',
                    }}
                    onChange={(e) => setSortState(e.target.value)}
                  >
                    <option value="CreatedAt">מיין לפי</option>
                    <option value="BorrowDate">תאריך השאלה</option>
                    <option value="ReturnDate">תאריך החזרה</option>
                    <option value="EquipmentID">מספר מק"ט</option>
                  </select>
                </ListGroupItem>
              </ListGroup>
            </Col>

            {isLoading ? (
              <Loader />
            ) : (
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm table-custom"
              >
                <thead>
                  <tr>
                    <th>מייל</th>
                    <th>מק"ט</th>
                    <th>תאריך השאלה</th>
                    <th>תאריך להחזרה</th>
                    <th>דיווח על תקלה</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedBorrows
                    ?.sort(sortMethods[sortState].method)
                    ?.filter((borrow) => borrow.isAvailable)
                    ?.filter((borrow) => borrow.userID === auth.userId)
                    ?.map((borrow) => (
                      <tr key={borrow._id}>
                        <td>
                          <a href={`mailto:${borrow.email}`}>{borrow.email}</a>
                        </td>
                        <td>{borrow.equipmentID}</td>
                        <td>{borrow.borrowDate}</td>
                        <td>{borrow.returnDate}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="btn-sm confirm-return-button"
                            onClick={() => reportABug(borrow)}
                          >
                            דווח על בעיה במוצר
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <hr className="hr-line-right"></hr>
      <h1>אזור אישי</h1>
      <hr className="hr-line-left"></hr>

      <Table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top', width: '20%' }}>
              <Form
                onSubmit={submitHandler}
                className="text-end"
                style={{ direction: 'rtl' }}
              >
                <FormGroup controlId="name">
                  <FormLabel>
                    <strong>שם מלא:</strong>
                  </FormLabel>
                  <FormControl
                    style={{ direction: 'rtl' }}
                    type="name"
                    placeholder={name}
                    value={name}
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  ></FormControl>
                </FormGroup>
                <h5> </h5>
                <FormGroup>
                  <FormLabel>
                    <strong>סיסמה:</strong>
                  </FormLabel>
                  <FormControl
                    style={{ direction: 'rtl' }}
                    type="password"
                    placeholder="הזן סיסמה"
                    value={password}
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></FormControl>
                </FormGroup>
                <h5> </h5>
                <div className="d-grid gap-3">
                  <Button type="submit" variant="primary">
                    {isLoading ? (
                      <Loader variant="light" />
                    ) : (
                      <string>עדכן</string>
                    )}
                  </Button>
                </div>
              </Form>
            </td>
            <td style={{ verticalAlign: 'top', width: '80%' }}>
              <div style={{ paddingLeft: '50px' }}>
                <Row>
                  <Navbar bg="primary" variant="dark">
                    <Container>
                      <Nav style={{ marginLeft: 'auto' }}>
                        <Nav.Link onClick={() => setSelectedNavItem('history')}>
                          היסטוריה
                        </Nav.Link>
                        <Nav.Link onClick={() => setSelectedNavItem('current')}>
                          השאלות פעילות
                        </Nav.Link>
                      </Nav>
                    </Container>
                  </Navbar>
                </Row>
                <Row>{renderSelectedNavItemContent()}</Row>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalZone;
