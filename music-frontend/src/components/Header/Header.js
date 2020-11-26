import React from 'react';
import {Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);

  const logoutHandler = () => {
    dispatch(logout());
  };

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
                  <Nav.Link as={Link} to={'/add-artist'} className='pr-4'>Add new artist</Nav.Link>
                  <Nav.Link as={Link} to={'/add-album'} className='pr-4'>Add new album</Nav.Link>
                  <Nav.Link as={Link} to={'/add-track'} className='pr-4'>Add new track</Nav.Link>
                  <Nav.Link as={Link} to={'/track_history'} className='pr-4'>Track History</Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Hello, {user.user.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/my-profile">My Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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