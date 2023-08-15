import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = () => {

    const [catalogNumber, setCatalogNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('kind');
    const [formError, setFormError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = catalogNumber;
        const name = productName;
        const available = true;
        const studentID = 0;

        const data = {
            id,
            name,
            available,
            studentID
          };

        console.log(data);

        if (catalogNumber === '' || productName === '') {
            setFormError(true);
            return;
        }

        try {
          debugger;
            console.log('productType:', productType, typeof productType);
            const response = await axios.post('http://localhost:5000/${productType}', data);
            console.log(response.data);
            setIsSubmitted(true);
            // Handle the response or perform additional actions
        } catch (error) {
            console.error(error);
            // Handle the error
        }

        // Render the success page if the form is submitted
        if (isSubmitted) {
            return <h2>Form submitted successfully!</h2>;
        }
  };

  return (
    <div>
      <h2>הוספת פריט למערכת</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ textAlign: 'right' }} controlId="addProd">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="מספר קטלוגי"
                style={{ textAlign: 'right' }}
                value={catalogNumber}
                onChange={(event) => setCatalogNumber(event.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="שם המוצר"
                style={{ textAlign: 'right' }}
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
            {formError && (
                <p style={{ color: 'red' }}>Please fill in all required fields.</p>
            )}
              <button type="submit" className="btn btn-primary">הוסף</button>
            </Col>
            <Col>
              <Form.Select
                aria-label="Select option"
                style={{ textAlign: 'right' }}
                value={productType}
                onChange={(event) => setProductType(event.target.value)}
              >
                <option value="kind">סוג המוצר</option>
                <option value="camera">Camera</option>
                <option value="recording">Recording</option>
                <option value="tablets">Tablets</option>
                <option value="tripod">Tripod</option>
                <option value="projectors">Projectors</option>
                <option value="cabels">Cabels</option>
                <option value="lights">Lights</option>
                <option value="convertors">Convertors</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddProduct;
