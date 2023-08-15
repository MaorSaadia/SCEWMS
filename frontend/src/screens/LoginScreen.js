import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validators';
import Card from '../components/Card';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/login',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      auth.login(
        responseData.userId,
        responseData.token,
        responseData.name,
        responseData.isAdmin,
        responseData.email,
        responseData.role
      );
      navigate('/');
    } catch (err) {}
  };
  return (
    <>
      <h1> </h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>התחברות</h1>
        <hr className="hr-line-left"></hr>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא'ל מכללה תקנית."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="סיסמה:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="אנא הכנס סיסמה."
            onInput={inputHandler}
          />
          <Row className="py-0.1">
            <Col className="text-center">
              <strong style={{ fontSize: '1rem' }}> .שכחת סיסמה? לחץ </strong>
              <Link to={'/sendsmailscreen'}>
                {' '}
                <strong style={{ fontSize: '1rem' }}>כאן</strong>
              </Link>{' '}
              <strong style={{ fontSize: '1rem' }}>כדי לאפס אותה </strong>
            </Col>
          </Row>
          <h2> </h2>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              {isLoading ? <Loader variant="light" /> : <string>התחבר</string>}
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col className="text-center">
            <strong> עדיין לא רשום למערכת?</strong>{' '}
            <Link to={'/register'}>
              <strong>הירשם </strong>
            </Link>
          </Col>
        </Row>
      </Card>
      <h2> </h2>
    </>
  );
};

export default LoginScreen;
