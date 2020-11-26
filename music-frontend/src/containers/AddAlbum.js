import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistList } from '../store/actions/artistActions';
import { addAlbum } from '../store/actions/albumActions';

const AddAlbum = () => {
  const [album, setAlbum] = useState({
    name: '',
    released_date: '',
    image: '',
    artist: ''
  });

  const dispatch = useDispatch();
  const artists = useSelector(state => state.artist.artistList);

  useEffect(() => {
    dispatch(fetchArtistList());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAlbum(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setAlbum(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(album).forEach(key => {
      formData.append(key, album[key]);
    });

    dispatch(addAlbum(formData));
  };


  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new album</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={album.name}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='released_date'>
                <Form.Label>Released date</Form.Label>
                <Form.Control
                  name='released_date'
                  value={album.released_date}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  name='artist'
                  value={album.artist}
                  onChange={(e) => inputChangeHandler(e)}
                  as="select"
                >
                  <option hidden>Select artist</option>
                  {artists && artists.map(artist => {
                    return (
                      <option key={artist._id} value={artist._id}>{artist.name}</option>
                    );
                  })}
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

export default AddAlbum;