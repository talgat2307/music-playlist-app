import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/actions/userActions';

const Login = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const error = useSelector(state => state.user.loginError);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(user, props));
  };

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='text-center pb-4'>Login</h2>
            {error && <Alert variant='danger'>{error.response.data.error}</Alert> }
            <Form onSubmit={formSubmitHandler}>
              <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  required={true}
                  placeholder='Enter username'
                  name='username'
                  value={user.username}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  required={true}
                  placeholder='Enter password'
                  name='password'
                  value={user.password}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Login
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                <Link to={'/register'}> Not yet registered? Sign Up</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;