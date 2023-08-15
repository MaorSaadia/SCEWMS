import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-1">
            <h3>SCEVC - WMS</h3>
            <p>
              <Link to="/">Home</Link> | 
              <Link to="/contact">Contact</Link> | 
              <Link to="/ProductsScreen">Products</Link> | 
              <Link to="/about">About Us</Link>
            </p>
            Copyright Team 12 &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
