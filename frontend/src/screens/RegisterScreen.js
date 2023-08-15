import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import Card from '../components/Card';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PasswordStrengthBar from 'react-password-strength-bar';

const RegisterScreen = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const word = ['חלש', 'חלש', 'בסדר', 'טוב', 'חזק'];

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
        'http://localhost:5000/api/users/register',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          role: formState.inputs.role.value,
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
        <h1>הרשמה</h1>
        <hr className="hr-line-left"></hr>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Input
            element="textarea"
            id="name"
            type="name"
            label="שם מלא:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="נא להזין שם."
            onInput={inputHandler}
          />
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל מכללה:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא''ל מכללה תקנית."
            onInput={inputHandler}
          />
          <Input
            element="radio"
            id="role"
            label="בחר תפקיד:"
            options={[
              { label: 'מרצה', value: 'lecturer' },
              { label: 'סטודנט', value: 'student' },
            ]}
            validators={[VALIDATOR_REQUIRE(6)]}
            errorText="נא לבחור תפקיד."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="סיסמה:"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="נא להזין סיסמה חוקית, לפחות 6 תווים."
            onInput={inputHandler}
          />
          {formState.inputs.password.value.length >= 1 && (
            <PasswordStrengthBar
              shortScoreWord="קצר מדי"
              scoreWords={word}
              password={formState.inputs.password.value}
            />
          )}
          <h2> </h2>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              {isLoading ? <Loader variant="light" /> : <string>הירשם</string>}
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col className="text-center">
            <strong>רשום למערכת?</strong>{' '}
            <Link to={'/login'}>
              <strong>התחבר </strong>
            </Link>
          </Col>
        </Row>
      </Card>
      <h1> </h1>
    </>
  );
};

export default RegisterScreen;
