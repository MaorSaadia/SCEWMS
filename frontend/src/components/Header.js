import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="/SCE.png"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/Contact">
                <Nav.Link>
                  צור קשר <i className="fas fa-phone"></i>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/ProductsScreen">
                <Nav.Link>
                  מחסן <i className="fas fa-warehouse"></i>
                </Nav.Link>
              </LinkContainer>

              {auth.isLoggedIn && auth.isAdmin && (
                <NavDropdown title="נהל">
                  <LinkContainer to="/admin/userslist">
                    <NavDropdown.Item>משתמשים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/tracking">
                    <NavDropdown.Item>מעקב ציוד</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/updatesproducts">
                    <NavDropdown.Item>מחסן</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    התנתק
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {auth.isLoggedIn && !auth.isAdmin && (
                <NavDropdown title={auth.userName.split(' ')[0]} id="username">
                  <LinkContainer to="/PersonalZone">
                    <NavDropdown.Item>אזור אישי</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    התנתק
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {!auth.isLoggedIn && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    התחברות <i className="fas fa-user"></i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
