import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsScreen = () => {
  return (
    <div className="about-us">
      <Container>
        <Row>
          <Col className="text-center py-1">
            <h2>About Us</h2>
            <h3>Our Team of Developers</h3>
            <p>
              Yuval, Amir Fukman, Eden, Maor Saadia, Yaron
            </p>
            <h4>Key Features</h4>
            <ul>
              <li>Efficient equipment tracking system for academic use</li>
              <li>User-friendly reservation system for seamless resource management</li>
              <li>Automated notifications and reminders for timely updates</li>
              <li>Role-based access control to ensure secure equipment management</li>
            </ul>
            <p>
              Our project is the result of the collaborative efforts of our team members. Together, we have leveraged our engineering skills and passion for creating innovative solutions to develop this system specifically tailored for educational environments.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUsScreen;
