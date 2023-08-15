import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import { VALIDATOR_EMAIL } from '../util/validators';
import Card from '../components/Card';
import { useHttpClient } from '../hooks/httpHook';
import Message from '../components/Message';
import Loader from '../components/Loader';

const SendEmailScreen = () => {
  const { isLoading, error, sendRequest } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/users/forgot-password',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      throw err;
    }
    alert('שלחנו לך לינק למייל לאיפוס הסיסמה');
  };
  return (
    <>
      <h1 style={{ padding: '2rem' }}> </h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>איפוס סיסמה</h1>
        <hr className="hr-line-left"></hr>
        <h1 style={{ fontSize: '1.2rem', padding: '0.5rem' }}>
          אנא הזן מייל לקבלת לינק לאיפוס סיסמה
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={sendEmail}>
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא''ל מכללה תקנית."
            onInput={inputHandler}
          />
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              {isLoading ? <Loader variant="light" /> : <string>שלח</string>}
            </Button>
          </div>
          <Row className="py-1">
            <Col>
              <Link to={'/login'}>
                <strong
                  style={{
                    fontSize: '1.2rem',
                    float: 'right',
                    borderBottom: '1px solid green',
                  }}
                >
                  חזור
                </strong>
              </Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default SendEmailScreen;
