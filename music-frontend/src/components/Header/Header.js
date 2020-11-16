import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.user.userInfo);

  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>Music App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {!user ? <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                :
                <>
                  <Nav.Link as={Link} to={'/track_history'} className='pr-4'>Track History</Nav.Link>
                  <Nav.Link>Hello, {user.user.username}</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;