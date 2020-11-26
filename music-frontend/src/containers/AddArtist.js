import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addArtist } from '../store/actions/artistActions';

const AddArtist = (props) => {
  const [artist, setArtist] = useState({
    name: '',
    image: '',
    information: '',
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setArtist(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setArtist(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(artist).forEach(key => {
      formData.append(key, artist[key]);
    });

    dispatch(addArtist(formData));
  };

  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new artist</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>

              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={artist.name}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='information'>
                <Form.Label>Information</Form.Label>
                <Form.Control
                  rows='6'
                  name='information'
                  value={artist.information}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>


              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.File
                  name='image'
                  onChange={fileChangeHandler}
                />
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddArtist;